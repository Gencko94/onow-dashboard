const extractError = (error: any) => {
  let responseError = undefined;
  let unknownError = undefined;

  if (error.response) {
    try {
      responseError = JSON.parse(error.response.data.error);
    } catch (e) {
      responseError = error.response.data.error;
    }
  } else {
    unknownError = error;
  }
  return {
    responseError,
    unknownError,
  };
};

export default extractError;
