import React from 'react'
import { Image, View,Text,StyleSheet,TouchableHighlight,CardItem  } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';

const MoviesTile = ({movie,navigation,onAdd,onDelete}) => {


  const style= StyleSheet.create({
    box:{
      borderWidth:1,
      borderColor:"#fff",
      paddinig:10,
    flexDirection:'row',
      justifyContent:'space-between'
    }
  }) 

  const handlePress =()=>{
    navigation.navigate('MovieDetails',{movie:movie,onAdd:onAdd,onDelete:onDelete});
  }

  return (
    <TouchableHighlight onPress={handlePress} underlayColor='#a4b0be'>
      <View style={style.box} >
        <View>
          <Text >
            {movie.Title}
            
          </Text>
          <Text>{movie.Year}</Text>
        </View>
          <Image alt='Movie photo' source={{uri:movie.Poster}}
          style={{width:40,height:60}}/>
      </View>

    </TouchableHighlight>
  )
}

export default MoviesTile