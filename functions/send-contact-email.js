export default async function (event) {
  return {
    statusCode: 200,
    body: {
      message: "Hit the endpoint!",
      event,
    },
  };
}
