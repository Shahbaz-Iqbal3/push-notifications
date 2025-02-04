const admin = require('firebase-admin');

exports.handler = async (event, context) => {
    try {
        // Initialize Firebase Admin
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: process.env.FIREBASE_DATABASE_URL
            });
        }

        // Get all subscribers
        const subscribers = await admin.database().ref('subscribers').once('value');
        const tokens = Object.keys(subscribers.val() || {});

        if (tokens.length === 0) {
            return { statusCode: 200, body: 'No subscribers found' };
        }
        
        // Send notifications
        const payload = {
            notification: {
                title: 'Status Reminder',
                body: 'It\'s time to update your daily status!'
            }
        };
        
        const response = await admin.messaging().sendToDevice(tokens, payload);
        console.log('Subscribers:', response);
        return {
            statusCode: 200,
            body: `Notifications sent: ${response.successCount}`
        };
    } catch (error) {
        console.error('Error:', error);
        return { statusCode: 500, body: error.toString() };
    }
};