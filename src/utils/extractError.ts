const extractError = (error: any) => {
  let responseError = undefined;
  let unknownError = undefined;
  console.log(error);
  if (error.response) {
    responseError = JSON.parse(error.response.data.error);
  } else {
    console.log("here");
    unknownError = error;
  }
  return {
    responseError,
    unknownError,
  };
};

export default extractError;
