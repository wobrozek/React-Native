import React from 'react'
import { Button, Text ,Image, View, StyleSheet} from 'react-native'
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../firebaseConfig';

const MovieDetails = ({route,navigation}) => {
    const {movie,onSubmit}= route.params;
    console.log(movie);

    const  addToFirebase=async()=>{
      try {
        const docRef = await addDoc(collection(db, "watchlist"), {
          imdbID:movie.imdbID,
          Poster:movie.Poster,
          Title:movie.Title,
          Type:movie.Type,
          Year:movie.Year
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      onSubmit(movie);
    }

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