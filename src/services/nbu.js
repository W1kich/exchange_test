const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    let data = await response.json();
    const dataWithUAH = [{ r030: 980, txt: 'Українська Гривня', rate: 1, cc: 'UAH' }, ...data];
    return dataWithUAH;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default fetchData;
