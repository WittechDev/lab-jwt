const responseHandler = (err, req, res, next) => {
  const { headers, url, method, timeout, route } = req;
  const { status, body } = err;

  const statusMsg = +status === 200 ? "Success" : "Error";
  const bodyResponse = +status !== 200 ? body : null;
  const logContent = {
    message: `Request to ${url} ${statusMsg}`,
    request: {
      method,
      url,
      headers,
      timeout,
      body: req.body || {},
      route,
    },
    response: {
      body: bodyResponse,
      status,
    },
  };
  console.log(JSON.stringify(logContent));
  res.status(+status || 500).json(body);

  next();
};

module.exports = responseHandler;
