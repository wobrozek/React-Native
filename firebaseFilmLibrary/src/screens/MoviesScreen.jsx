import React, { useEffect, useState } from 'react'
import { FlatList,ToastAndroid,Text,View } from 'react-native';
import Input from '../components/atoms/Input';
import {API_KEY} from '@env'
import MoviesTile from '../components/atoms/MoviesTile';

const MoviesScreen = () => {
  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(true);

  const fetchData = async (movie) => {
    try{
      const resp = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${movie}`);
      const data_json = await resp.json();

    setData(data_json.Search);
    ToastAndroid.show(data_json.toString(), ToastAndroid.SHORT);
    setLoading(false);
    }
    catch(error){
      ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
    }
  };

  return (
    <View>
    <Input placeholder="Search Movie" icon="search" onSubmit={(movie)=>{fetchData(movie)}} />
      {(data.length != 0 || undefined) ? data?.map((element)=>(
        <MoviesTile key={element.imdbID} movie={element} />
      )) : (<Text>empty</Text>)}
    </View>
  )
}

export default MoviesScreen