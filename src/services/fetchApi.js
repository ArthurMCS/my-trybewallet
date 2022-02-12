const fetchCurrentPrice = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  if (response.ok) {
    return Promise.resolve(data);
  }
  return Promise.reject(data);
};

export default fetchCurrentPrice;
