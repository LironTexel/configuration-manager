const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require('express');
admin.initializeApp(functions.config().firebase);
const app = express();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// exports.getAccount = functions.https.onRequest((request, response) => {
//     functions.logger.info("Hello logs!", {structuredData: true});
//     functions.logger.info('request:' + JSON.stringify(request), {structuredData: true});
//     response.send("Hello from Firebase!");
// });

exports.accounts = functions.https.onRequest(app);

app.get('/', async (req, res) => {
    const accountsSnapshot = await admin.firestore().collection('accounts').get();

    let accounts = [];
    accountsSnapshot.forEach(doc => {
        let id = doc.id;
        let data = doc.data();

        accounts.push({ id, ...data });
    })

    res.status(200).send(JSON.stringify(accounts));
})

app.get('/:accountId', async (req, res) => {
    const accountSnapshot = await admin.firestore().collection('accounts').doc(req.params.accountId).get();

    res.status(200).send(JSON.stringify(accountSnapshot.data()));

})

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