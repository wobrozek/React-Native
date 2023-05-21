import React, { useEffect, useState } from 'react'
import { FlatList,ToastAndroid,Text,View } from 'react-native';
import Input from '../components/Input';
import {API_KEY} from '@env'
import MoviesTile from '../components/MoviesTile';

const MoviesScreen = ({navigation}) => {
  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(false);

  const fetchData = async (movie) => {
    setLoading(true);
    try{
      const resp = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${movie}`);
      const data_json = await resp.json();

    setData(data_json.Search);
    setLoading(false);
    }
    catch(error){
      ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
    }
  };

  const movies=[
    {
    imdbID:"tt6247936",
Poster:"https://m.media-amazon.com/images/M/MV5BN2U4YjAxNWUtNDg3Yy00ZmZiLThkMGItODk0MDM3Y2RhYzNlXkEyXkFqcGdeQXVyMjQ3NzUxOTM@._V1_SX300.jpg",
Title:"Django",
Type:"movie",
Year:"2017"
    },
    {
      imdbID:"tt6247936",
  Poster:"https://m.media-amazon.com/images/M/MV5BN2U4YjAxNWUtNDg3Yy00ZmZiLThkMGItODk0MDM3Y2RhYzNlXkEyXkFqcGdeQXVyMjQ3NzUxOTM@._V1_SX300.jpg",
  Title:"Django v2",
  Type:"movie",
  Year:"2224"
      }
  ]

  return (
    <View>
    <Input placeholder="Search Movie" icon="search" onSubmit={(movie)=>{fetchData(movie)}} />
    {loading && <Text>Loading...</Text>}
      
      {(data?.length != 0 || undefined ) && data?.map((element)=>(
      <MoviesTile key={element?.imdbID} movie={element} navigation={navigation}  />
      ))}

      <View>
        <Text>Moje filmy</Text>
        <FlatList
        data={movies}
        renderItem={({item})=><MoviesTile movie={item} navigation={navigation}/>}
        keyExtractor={item => item.imdbID}
      />
      </View>
    </View>
  )
}

export default MoviesScreen