import React, { useState } from 'react'
import { Image, View,Text,StyleSheet,TouchableHighlight  } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';

const MoviesTile = ({movie,navigation,onSubmit}) => {


  const style= StyleSheet.create({
    image:{
      width:40,
      height:60,
    },
    box:{
      borderWidth:1,
      borderColor:"#fff",
      paddinig:10,
      flexDirection:'row',
      justifyContent:'space-between',
    }
  }) 

  const handlePress =()=>{
    navigation.navigate('MovieDetails',{movie:movie,onSubmit:onSubmit});
  }

  return (
    <TouchableHighlight onPress={handlePress} underlayColor='#a4b0be'>
      <View style={style.box} >
        <View>
          <Text style={{flexGrow:1}}>
            {movie.Title}
            
          </Text>
          <Text>{movie.Year}</Text>
        </View>

          <Image alt='Movie photo' source={{uri:movie.Poster}} style={style.image}/>
        </View>
    </TouchableHighlight>
  )
}

export default MoviesTile