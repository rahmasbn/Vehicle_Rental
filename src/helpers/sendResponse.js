const success = (res, status, data) => {
  res.status(status).json({ result: data });
};

const error = (res, status, data) => {
  const dataError = new Error(data);
  const statuss = data.status || 500;
  res.status(statuss).json({ err: dataError.message });
};

module.exports = {
  success,
  error,
};
