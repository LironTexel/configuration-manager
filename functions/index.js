const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require('express');
const agora = require("agora-access-token");
admin.initializeApp(functions.config().firebase);
let NtpTimeSync = require("ntp-time-sync");
const timeSync = NtpTimeSync.NtpTimeSync.getInstance();
timeSync.getTime(); // get first ntp time

const app = express();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

app.get('/accountIds', async (req, res) => {
    const accountsSnapshot = await admin.firestore().collection('accounts').get();
    let accounts = [];

    accountsSnapshot.forEach(doc => {
        accounts.push({ id: doc.id });
    })

    res.setHeader('Content-Type', 'application/json');
    res.set('Access-Control-Allow-Origin', '*'); // allow CORS
    res.status(200).send(JSON.stringify({ accounts }));
})

// handle time sync requests
app.get('/timesync', async (req, res) => {
    console.log('start time sync ---------------------------------------------------------------------------');
    console.log('local date ISO - ' + new Date().toISOString());
    console.log('local date - ' + new Date());
    let ntpTime = await timeSync.getTime();
    console.log('NTP receive object - ', ntpTime);
    console.log('NTP receive now - ' + ntpTime.now);
    console.log('NTP receive now ISO - ' + new Date(ntpTime.now).toISOString());
    let data = {
        receiveTimestamp: ntpTime.now
    };
    // data.receiveTimestamp.setSeconds(data.receiveTimestamp.getSeconds() + 5);
    ntpTime = await timeSync.getTime();
    console.log('NTP transmit now - ' + ntpTime.now);
    console.log('NTP transmit now ISO - ' + new Date(ntpTime.now).toISOString());
    data.transmitTimestamp = ntpTime.now;
    // data.transmitTimestamp.setSeconds(data.transmitTimestamp.getSeconds() + 5);
    res.status(200).send(JSON.stringify(data));
});


exports.accounts = functions.https.onRequest(app);

app.get('/', async (req, res) => {
    const accountsSnapshot = await admin.firestore().collection('accounts').get();

    const selectQuery = (req.query && req.query.select) || '';
    const fields = selectQuery.split(',');
    let accounts = [];

    accountsSnapshot.forEach(doc => {
        const docData = doc.data();
        let account = {};
        if (!selectQuery) account = docData;
        else fields.forEach((field) => {
            switch (field) {
                case 'id':
                    account.id = doc.id;
                    break;
                case 'name':
                case 'logoUrl':
                case 'categories':
                case 'featuredContent':
                    account[field] = docData[field];
                    break;
                default:
                    break;
            }
        });

        accounts.push(account);
    })

    res.setHeader('Content-Type', 'application/json');
    res.set('Access-Control-Allow-Origin', '*'); // allow CORS
    res.status(200).send(JSON.stringify({accounts}));
})

app.get('/:accountId', async (req, res) => {
    const accountSnapshot = await admin.firestore().collection('accounts').doc(req.params.accountId).get();

    const accountData = accountSnapshot.data();
    const selectQuery = (req.query && req.query.select) || '';
    const fields = selectQuery.split(',');
    let result = {}

    if (!selectQuery) result = accountData;
    else fields.forEach((field) => {
        switch (field) {
            case 'id':
                result.id = accountSnapshot.id;
                break;
            case 'name':
            case 'logoUrl':
            case 'categories':
            case 'featuredContent':
                result[field] = accountData[field];
                break;
            default:
                break;
        }
    });
    res.setHeader('Content-Type', 'application/json');
    res.set('Access-Control-Allow-Origin', '*'); // allow CORS
    res.status(200).send(JSON.stringify(result));

})

// Created by Assaf Tayouri 29/06/2021
// For generating token of agora authentication
app.post("/agora/token", (req, res) => {
    const appId = req.body.appId;
    const appCertificate = req.body.cert;
    const channelId = req.body.channelId;
    const userId = req.body.userId;
    const role = req.body.isPublisher ? agora.RtcRole.PUBLISHER : agora.RtcRole.SUBSCRIBER;

    const expirationTimeInSeconds = 86400; // 24 hours in seconds
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expirationTimestamp = currentTimestamp + expirationTimeInSeconds;

    const token = agora.RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelId, userId, role, expirationTimestamp);
    res.send({ token });
});


const createNotification = (notification => {
  return admin.firestore().collection('notifications')
      .add(notification)
      .then(doc => console.log('notification added', doc));
})

exports.accountCreated = functions.firestore
    .document('accounts/{accountId}')
    .onCreate((doc) => {
      const account = doc.data();
      const notification = {
        content: 'new account added',
        user: `${account.createdBy}`,
        time: admin.firestore.FieldValue.serverTimestamp()
      }

      return createNotification(notification)
    })

exports.userSignedUp = functions.auth.user()
    .onCreate(user => {
        return admin.firestore().collection('users')
            .doc(user.uid).get().then(doc => {
                const newUser = doc.data();
                const notification = {
                    content: 'new user signed up',
                    user: `${newUser.username}`,
                    time: admin.firestore.FieldValue.serverTimestamp()
                }

                return createNotification(notification);
            })
            .catch(err => {
                const notification = {
                    content: 'new error',
                    error: `${err.message}`,
                }
                return createNotification(notification);
            })
    })