const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const {
  RECIPIENT,
  MAILER_ADDRESS,
  MAILER_AWS_ACCESS_KEY_ID,
  MAILER_AWS_SECRET_ACCESS_KEY,
} = process.env;

exports.handler = async (event) => {
  try {
    const client = new SESClient({
      region: "eu-west-1",
      credentials: {
        accessKeyId: MAILER_AWS_ACCESS_KEY_ID,
        secretAccessKey: MAILER_AWS_SECRET_ACCESS_KEY,
      },
    });

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
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err.toString(),
        err,
      }),
    };
  }
};
