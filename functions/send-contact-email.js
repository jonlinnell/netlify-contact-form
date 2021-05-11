exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: {
      message: "Hit the endpoint!",
      event,
    },
  };
}
