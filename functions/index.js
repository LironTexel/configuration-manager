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

exports.getBrand = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    functions.logger.info('request:' + JSON.stringify(request), {structuredData: true});
    response.send("Hello from Firebase!");
});

exports.brands = functions.https.onRequest(app);

app.get('/', async (req, res) => {
    const brandsSnapshot = await admin.firestore().collection('brands').get();

    let brands = [];
    brandsSnapshot.forEach(doc => {
        let id = doc.id;
        let data = doc.data();

        brands.push({ id, ...data });
    })

    res.status(200).send(JSON.stringify(brands));
})

app.get('/:brandId', async (req, res) => {
    const brandSnapshot = await admin.firestore().collection('brands').doc(req.params.brandId).get();

    res.status(200).send(JSON.stringify(brandSnapshot.data()));

})

const createNotification = (notification => {
  return admin.firestore().collection('notifications')
      .add(notification)
      .then(doc => console.log('notification added', doc));
})

exports.brandCreated = functions.firestore
    .document('brands/{brandId}')
    .onCreate((doc) => {
      const brand = doc.data();
      const notification = {
        content: 'new brand added',
        user: `${brand.createdBy}`,
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