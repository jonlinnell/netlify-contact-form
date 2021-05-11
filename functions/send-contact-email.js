const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const { RECIPIENT, MAILER_ADDRESS } = process.env;

exports.handler = async (event) => {
  try {
    const client = new SESClient({});

    const { name, email, message } = JSON.parse(event.body);

    const sendCommand = new SendEmailCommand({
      Destination: RECIPIENT,
      Source: MAILER_ADDRESS,
      Message: `You got a message from ${name} <${email}>:\n\n${message}`,
    });

    const sendResponse = await client.send(sendCommand);

    return {
      statusCode: 200,
      body: JSON.stringify({
        response: sendResponse,
        source,
        destination,
        message,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err.toString(),
        env: process.env,
        err,
      }),
    };
  }
};
