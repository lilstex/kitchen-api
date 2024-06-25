const Response = (res, { status, message, data }, code) => {
  res.status(code).send({
    status,
    message,
    data,
  });
};

module.exports = Response;
