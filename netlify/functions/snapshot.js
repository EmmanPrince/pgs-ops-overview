exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      status: "OK",
      message: "Snapshot function is working"
    })
  };
};
