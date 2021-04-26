const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

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