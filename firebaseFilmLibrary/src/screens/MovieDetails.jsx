import React, { useContext, useState } from 'react'
import { Button, Text ,Image, View, StyleSheet} from 'react-native'
import { collection,doc, addDoc } from "firebase/firestore"; 
import { db } from '../firebaseConfig';
import { userContext } from '../../App';

const MovieDetails = ({route,navigation}) => {

  const context = useContext(userContext);
  const {movie,onSubmit}= route.params;

    const  addToFirebase=async()=>{
      try {
        //get subcolection
        const docRef = doc(db, "user",context.user.uid);
        const colRef = collection(docRef,'watchlist');

        //add to subcolection
        addDoc(colRef,{
          imdbID:movie.imdbID,
          Poster:movie.Poster,
          Title:movie.Title,
          Type:movie.Type,
          Year:movie.Year
        })

        onSubmit(movie);
      } catch (e) {
        console.log(e);
      }
      
    }

    console.log(context.user);

  const style =StyleSheet.create({
    image:{
      width:200,
      height:300,
      alignSelf:'center',
    }
  })

  return (
    <View >
        <Image alt='Movie photo' source={{uri:movie.Poster}} style={style.image}/>

        <View>
          <Text>
            {movie.Title}
          </Text>
          <Text>{movie.Year}</Text>
        </View>

          
        <Button title='add to watchlist' onPress={addToFirebase}>Add to watchlist</Button>
    </View>
  )
}

export default MovieDetails