const response = async ({
  data = { message: "success" },
  status = 200,
  next,
}) => {
  next({ body: data, status });
};

const errorResponse = ({ error, next }) => {
  const { message = "Internal Server Error", code = 500 } = error;

  next({ body: { message }, status: code });
};

module.exports = { response, errorResponse };
