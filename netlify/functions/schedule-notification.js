const admin = require("firebase-admin");

exports.handler = async (event, context) => {
	try {
		// Initialize Firebase Admin
		const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

		if (!admin.apps.length) {
			admin.initializeApp({
				credential: admin.credential.cert(serviceAccount),
				databaseURL: process.env.FIREBASE_DATABASE_URL,
			});
		}

		// Get all subscribers
		const subscribers = await admin.database().ref("subscribers").once("value");
		const tokens = Object.keys(subscribers.val() || {});

		if (tokens.length === 0) {
			return { statusCode: 200, body: "No subscribers found" };
		}

		// Send notifications
		const payload = {
			notification: {
				title: "Status Reminder",
				body: "It's time to update your daily status!",
			},
		};

		const token = [
			"d1fj-5Jlr4UUgHLGxU_dJ6:APA91bEJmGgPP8nTeDStMpAiX-X3kF6u-teyog_3216_wH5wzPOXb9e17H1GVFtoNITV7Ex4bX18I6OQqpVKLn78SSzTSFH95drxsPoRqmm_0aS_qq6Z8tg",
		]; 

		try {
			const response = await admin.messaging().sendToDevice(token, payload);
			console.log("Subscribers:", response);
			if (response.failureCount > 0) {
				console.error("Some messages failed to send:", response.results);
			}
			return {
				statusCode: 200,
				body: `Notifications sent: ${response.successCount}`,
			};
		} catch (error) {
			console.error("Error sending notifications:", error);
			return {
				statusCode: 500,
				body: "Error sending notifications",
			};
		}
	} catch (error) {
		console.error("Error:", error);
		return { statusCode: 500, body: error.toString() };
	}
};
