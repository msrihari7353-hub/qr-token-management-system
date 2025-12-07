const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendSMS = async (to, message) => {
  try {
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    });
    console.log('SMS sent successfully:', result.sid);
    return { success: true, sid: result.sid };
  } catch (error) {
    console.error('SMS sending failed:', error);
    return { success: false, error: error.message };
  }
};

const sendTokenCreatedSMS = async (name, phone, token) => {
  const message = `Hello ${name}, your token is ${token}. Please wait for the notification.`;
  return await sendSMS(phone, message);
};

const sendTokenCalledSMS = async (phone, token) => {
  const message = `Token ${token}, it is your turn. Please come now.`;
  return await sendSMS(phone, message);
};

module.exports = {
  sendSMS,
  sendTokenCreatedSMS,
  sendTokenCalledSMS
};