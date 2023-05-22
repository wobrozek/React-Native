import React, { useEffect, useState } from 'react'
import { FlatList,ToastAndroid,Text,View } from 'react-native';
import Input from '../components/Input';
import {API_KEY} from '@env'
import MoviesTile from '../components/MoviesTile';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebaseConfig';

const MoviesScreen = ({navigation}) => {
  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(false);
  const [watchlist,setWatchlist]=useState([]);

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

  const getFirebase =async()=>{
    const querySnapshot = await getDocs(collection(db, "watchlist"));

    let apiData = querySnapshot.docs.map((doc) => doc.data());

    console.log(apiData);
    setWatchlist(apiData);
  }

  const addToWatchlist=(movie)=>{
    setWatchlist([...watchlist, movie])
  }

useEffect(()=>{
  if(watchlist?.length===0){
    getFirebase();
  }
},[])

  return (
    <View>
    <Input placeholder="Search Movie" icon="search" onSubmit={(movie)=>{fetchData(movie)}} />
    {loading && <Text>Loading...</Text>}
      
      {(data?.length != 0 || undefined ) && data?.map((element)=>(
      <MoviesTile key={element?.imdbID} movie={element} navigation={navigation} onSubmit={addToWatchlist} />
      ))}

      <View>
        <Text>Moje filmy</Text>
        <FlatList
        data={watchlist}
        renderItem={({item})=><MoviesTile movie={item} navigation={navigation} onSubmit={addToWatchlist} />}
        keyExtractor={item => item.imdbID}
      />
      </View>
    </View>
  )
}

export default MoviesScreen