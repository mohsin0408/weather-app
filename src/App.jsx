import React,{useEffect, useState} from 'react'

const App = () => {
  const[city,setCity] = useState('mumbai');
  const[inputList,setInputList] = useState('')
  const  [data,setData]=useState(null)
  // console.log('data',data);
  
  useEffect(() => {
    const ApiKey = "da5d9ee6369049959ae112934240508";
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=${ApiKey}&q=${city}&aqi=no`
    ).then((data)=>{return data.json();
    }).then((response)=>{setData(response)
    }).catch((error)=>{console.log(error);
    })
  }, [city]);

  const itemEvent = (event) => {
    setInputList(event.target.value);
  }

  const newCity = () => {
    setCity(inputList)
  }

  const handleCLick = (event) => {
    if(event.key === "Enter"){
      newCity();
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'
    style={{
      backgroundColor: data?.current?.temp_c > 24 ? 'yellow' : 'grey'
    }}>
      <h1 className='text-3xl mb-6 '>weather app</h1>
      <div>
        <div className='flex gap-6 mb-6'>
          <input type='text' onChange={itemEvent} value={inputList} placeholder='select a city' 
          onKeyDown={handleCLick} className=' px-8 py-2 '></input>
          <button className=' bg-gray-50 px-10 ' onClick={newCity} >Search</button>
        </div>
        <div className=' mb-7 px-8 '>
        
        <span>{data?.location?.name}</span>
          <img src={data?.current?.condition?.icon}>

          </img>
          <h4>{data?.current?.temp_c}</h4>
        </div>
      </div>
    </div>
  )
}

export default App

