import React, { useContext, useEffect, useState } from 'react'
import { FlatList,ToastAndroid,Text,View,StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import Input from '../components/Input';
import {API_KEY} from '@env'
import MoviesTile from '../components/MoviesTile';
import { collection, doc,getDocs } from "firebase/firestore";
import { db } from '../firebaseConfig';
import { ScrollView } from 'react-native-gesture-handler';
import { userContext } from '../../App';
import Icon from 'react-native-vector-icons/FontAwesome';

const MoviesScreen = ({navigation}) => {
  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(false);
  const [watchlist,setWatchlist]=useState([]);
  const [inputText,setInputText]=useState("");

  const context = useContext(userContext);

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
    const docRef = doc(db, "user",context.user.uid);
    const colRef = collection(docRef,'watchlist');

    const querySnapshot = await getDocs(colRef);

    let apiData = querySnapshot.docs.map((doc) => doc.data());

    setWatchlist(apiData);
  }

  const addToWatchlist=(movie)=>{
    setWatchlist([...watchlist, movie])
  }

  const removeFromWatchlist=(id)=>{

    setWatchlist((oldWatchlist) =>{
      return oldWatchlist.filter((movie)=>{return movie.imdbID !== id});
    }
    )

  }

useEffect(()=>{
  if(watchlist?.length===0){
    getFirebase();
  }
  setInputText("");
},[])

const style = StyleSheet.create({
  close:{
    justifyContent:'center',
    paddingLeft:5
  },
  closeWraper:{
    backgroundColor:"#fff",
    opacity:0.8
  }
})

const handleClose= ()=>{
  setInputText("");
  setData([]);
}

  return (
    <View style={{flex:1}} >
        <Input placeholder="Search Movie" icon="search" onSubmitEditing={()=>{fetchData(inputText)}} value={inputText} onChange={(value)=>{setInputText(value.nativeEvent.text)}} />
        
        { data.length !==0 && <View>
          {loading && <Text style={{color:"#fff"}}>Loading...</Text>}
          <View style={style.closeWraper}>
            <Pressable  style={style.close} onPress={handleClose} >
              <Icon name='close' style={{fontSize:30}}/>
            </Pressable >
          </View>
            {(data?.length != 0 || undefined ) && data?.map((element)=>(
            <MoviesTile key={element?.imdbID} movie={element} navigation={navigation} onAdd={addToWatchlist} onDelete={removeFromWatchlist} /> 
            ))}
        </View>}

        <View style={{flex:1}} >
          <Text style={{color:"#fff",fontSize:25,paddingLeft:20, marginVertical:20}}>My Movies</Text>
          <FlatList 
          style={{flex:1}}
          data={watchlist}
          renderItem={({item})=><MoviesTile movie={item} navigation={navigation} onAdd={addToWatchlist} onDelete={removeFromWatchlist} />}
          keyExtractor={item => item.imdbID}
          concontentContainerStyle={{
          flexGrow: 1,
          }}
        />
        </View>
    </View>
  )
}

export default MoviesScreen