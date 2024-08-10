import React, { useEffect, useState } from 'react';

const App = () => {
  const [city, setCity] = useState('mumbai');
  const [inputList, setInputList] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    const ApiKey = "da5d9ee6369049959ae112934240508";
    fetch(`http://api.weatherapi.com/v1/current.json?key=${ApiKey}&q=${city}&aqi=no`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  }, [city]);

  const handleInputChange = (event) => {
    setInputList(event.target.value);
  };

  const handleCityChange = () => {
    setCity(inputList);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCityChange();
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen"
      style={{
        backgroundColor: data?.current?.temp_c > 24 ? 'orange' : 'grey',
      }}
    >
      <h1 className="text-3xl mb-6">Weather App</h1>
      <div>
        <div className="flex gap-6 mb-6">
          <input
            type="text"
            onChange={handleInputChange}
            value={inputList}
            placeholder="Select a city"
            onKeyDown={handleKeyDown}
            className="px-8 py-2"
          />
          <button
            className="bg-gray-50 px-10 py-2"
            onClick={handleCityChange}
          >
            Search
          </button>
        </div>
        <div className="mb-7 px-8">
          <h2 className="text-xl">{data?.location?.name}</h2>
          <img src={data?.current?.condition?.icon} alt="weather icon" />
          <h4 className="text-lg">{data?.current?.temp_c}°C</h4>
        </div>
      </div>
    </div>
  );
};

export default App;
