import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Text ,Image, View, StyleSheet} from 'react-native'
import { collection,doc, addDoc, query, where, getCountFromServer, deleteDoc, getDoc, getDocs } from "firebase/firestore"; 
import { db } from '../firebaseConfig';
import { userContext } from '../../App';

const MovieDetails = ({route,navigation}) => {
  const [isInWatchlist,setIsInWatchlist]=useState(false); 
  const baseRef=useRef(null);

  const context = useContext(userContext);
  const {movie,onAdd,onDelete}= route.params;

  useEffect(()=>{
    checkMovie();
  },[])


  // check the movie and return reference to current movie
    const checkMovie=async()=>{
      const docRef = doc(db, "user",context.user.uid);
      const colRef = collection(docRef,'watchlist');

      // check that movie exist in a watchlist
      const q = await query(colRef,where("imdbID","==",movie.imdbID));
      const snapshot = await getDocs(q);

      if(snapshot.docs.length > 0){
        baseRef.current = snapshot.docs[0].id;
        setIsInWatchlist(true);
      } 
      else{
        setIsInWatchlist(false);
      }

    }

    const  addToFirebase=async()=>{
      try {
        //get subcolection
        const docRef = doc(db, "user",context.user.uid);
        const colRef = collection(docRef,'watchlist');

        //add to subcolection
        const currentMovieDoc= await addDoc(colRef,{
          imdbID:movie.imdbID,
          Poster:movie.Poster,
          Title:movie.Title,
          Type:movie.Type,
          Year:movie.Year
        })

        onAdd(movie);
        setIsInWatchlist(true);
        baseRef.current=currentMovieDoc;

      } catch (e) {
        console.log(e);
      }
    }

    const removeFirebase= async()=>{
      const docRef = doc(db, "user",context.user.uid);
      const colRef = collection(docRef,'watchlist');

      console.log(baseRef.current);
      console.log(colRef);

      try{
      deleteDoc(doc(colRef,baseRef.current));
      onDelete(movie.imdbID);

      setIsInWatchlist(false);
      }
      catch(e){
        console.log(e);
      }
    }

  const style =StyleSheet.create({
    image:{
      width:300,
      height:450,
      alignSelf:'center',
    }
  })

  return (
    <View style={{marginTop:20}}>
        <Image alt='Movie photo' source={{uri:movie.Poster}} style={style.image}/>

        <View>
          <Text style={{fontSize:20,padding:20}}>
            {movie.Title}
          </Text>
          <Text style={{fontSize:15,paddingHorizontal:20,paddingBottom:20}}>{movie.Year}</Text>
        </View>

        {!isInWatchlist ? (<Button 
        title='add to watchlist' 
        onPress={addToFirebase}
        /> ):(<Button
          title="remove from watchlist" 
          onPress={removeFirebase}
          color='red'
/>) }
        
    </View>
  )
}

export default MovieDetails