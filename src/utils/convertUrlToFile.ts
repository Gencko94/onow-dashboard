const convertUrlToFile = async (url: string) => {
  let response = await fetch(url);
  let data = await response.blob();
  console.log(data);
  let metadata = {
    type: data.type,
  };
  return new File([data], "test.jpg", metadata);
  // ... do something with the file or return it
};
export default convertUrlToFile;
