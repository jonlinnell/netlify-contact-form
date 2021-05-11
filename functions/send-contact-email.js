const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const {
  RECIPIENT,
  MAILER_ADDRESS,
  MAILER_AWS_ACCESS_KEY_ID,
  MAILER_AWS_SECRET_ACCESS_KEY,
} = process.env;

exports.handler = async (event) => {
  try {
    const ses = new SESClient({
      region: "eu-west-1",
      credentials: {
        AccessKeyId: MAILER_AWS_ACCESS_KEY_ID,
        SecretAccessKey: MAILER_AWS_SECRET_ACCESS_KEY,
      },
    });

    console.log(process.env);

    const { name, email, message } = JSON.parse(event.body);

    const params = {
      Destination: {
        ToAddresses: [RECIPIENT],
      },
      Message: {
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: `You got a message from ${name} <${email}>:\n\n${message}`,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: `New message from ${name}`,
        },
      },
      Source: MAILER_ADDRESS,
    };

    const sendResponse = await ses.send(new SendEmailCommand(params));

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
