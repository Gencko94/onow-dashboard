const convertUrlToFile = async (url: string) => {
  let response = await fetch(url);
  let data = await response.blob();
  console.log(data);
  let metadata = {
    type: data.type,
  };
  // ... do something with the file or return it
  return new File([data], "test.jpg", metadata);
};
export default convertUrlToFile;
