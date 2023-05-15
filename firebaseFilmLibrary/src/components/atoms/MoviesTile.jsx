import React from 'react'
import { Image, View,Text } from 'react-native'

const MoviesTile = (movie) => {
  return (
    <View>
        <Text>
            {movie.Title}
            <Text>
                {movie.Year}
            </Text>
        </Text>

        <Image alt='Movie photo' source={{uri:movie.Poster}}/>
    </View>
  )
}

export default MoviesTile