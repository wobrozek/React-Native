import React from 'react'
import { TextInput,Button,View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';

const Login = ({ navigation }) => {
  return (
    <View>
      <TextInput></TextInput>
      <TextInput></TextInput>
      <Button title="Login" onPress={() => navigation.navigate('Movies')}/>
    </View>
  )
}

export default Login