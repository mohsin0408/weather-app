import React, { useEffect, useState } from 'react';

const App = () => {
  const [city, setCity] = useState('mumbai');
  const [inputList, setInputList] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    const ApiKey = "da5d9ee6369049959ae112934240508";
    fetch(`https://api.weatherapi.com/v1/current.json?key=${ApiKey}&q=${city}&aqi=no`)
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
        backgroundColor: data?.current?.temp_c > 20 ? 'orange' : 'grey',
      }}
    >
      <h1 className="text-3xl mb-6">Weather App</h1>
      <div className="w-full max-w-md px-4">
        <div className="flex gap-4 mb-6 justify-center">
          <input
            type="text"
            onChange={handleInputChange}
            value={inputList}
            placeholder="Select a city"
            onKeyDown={handleKeyDown}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          />
          <button
            className="bg-gray-50 px-4 py-2 border border-gray-300 rounded-md"
            onClick={handleCityChange}
          >
            Search
          </button>
        </div>

        <div className='flex flex-col md:flex-row gap-4'>
          <div className="bg-white w-full md:w-1/3 m-2 p-4 shadow-lg rounded-lg">
            <h2 className="text-xl">{data?.location?.name}</h2>
            <img src={data?.current?.condition?.icon} alt="weather icon" />
            <h4 className="text-lg">{data?.current?.temp_c}°C</h4>
            <h4 className="text-lg">{data?.location?.region}</h4>
            <h4 className="text-lg">{data?.location?.country}</h4>
          </div>
          <div className="bg-white w-full md:w-2/3 m-2 p-4 shadow-lg rounded-lg">
            <h4 className="text-xl">Localtime: {data?.location?.localtime}</h4>
            <h4 className="text-lg">Humidity: {data?.current?.humidity}</h4>
            <h4 className="text-lg">Windchill: {data?.current?.windchill_c}</h4>
            <h4 className="text-lg">Wind Direction: {data?.current?.wind_dir}</h4>
            <h4 className="text-lg">Feels Like: {data?.current?.feelslike_c}</h4>
            <h4 className="text-lg">Last Updated: {data?.current?.last_updated}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
