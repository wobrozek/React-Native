import React, { useState } from 'react'
import { Button,View,Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Input from '../components/Input';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const Register = ({ navigation }) => {
  const [login,setLogin]=useState("");
  const [password,setPassword]=useState("");
  const [repetPassword,setRepetPassword]=useState("");
  const [error,setError]=useState("");

  const handleRegister = () =>{
    const auth = getAuth();

    if(repetPassword != password){
        setError("password and repeat password doesn't mach");
        return;
    }

    createUserWithEmailAndPassword(auth, login, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    navigation.navigate('Movies')
    // ...
  })
  .catch((error) => {
    let errprSplit = error.code.split('/')
    setError(errprSplit[1]);
  });
  }

  return (
    <View style={{justifyContent:'space-evenly', flex:1}}>
    <View>
      <Input placeholder={"Email"} icon={"user"} value={login} onChange={(value)=>{setLogin(value.nativeEvent.text)}}/>
      <Input placeholder={"Password"} icon={"key"} value={password} onChange={(value)=>{setPassword(value.nativeEvent.text)}} secureTextEntry={true}/>
      <Input placeholder={"Repeat password"} icon={"key"} value={repetPassword} onChange={(value)=>{setRepetPassword(value.nativeEvent.text)}} secureTextEntry={true}/>
      <View style={{padding:20, flexDirection:"row",justifyContent:'space-between'}}>
        <Text style={{color:"red"}}>{error}</Text> 
      </View>
    </View>
      <Button title="Register" onPress={handleRegister}/>
      
    </View>
  )
}

export default Register