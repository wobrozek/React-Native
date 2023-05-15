import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-navigation';

const MoviesScreen = () => {
  const [data,setdata]=useState();
  const [loading,setLoading]=useState();

  const fetchData = async () => {
    const resp = await fetch(`http://www.omdbapi.com/?apikey=${Constants.expoConfig.extra.apiKey}`);
    const data = await resp.json();
    setData(data);
    setLoading(false);
  };

  useEfect(()=>{
    fetchData();
    console.log(data);
},[]
);

  return (
    <Text>hej</Text>
  )
}

export default MoviesScreen