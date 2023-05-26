import React, { useContext, useState } from 'react'
import { Button,View,Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Input from '../components/Input';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { userContext } from '../../App';


const Login = ({ navigation }) => {
  const [login,setLogin]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");

  const context=useContext(userContext);

  const handleLogin = () =>{
    const auth = getAuth();
    signInWithEmailAndPassword(auth, login, password)
    .then((userCredential) => {
    // Signed in 
    const currentUser = userCredential.user;
    context.loginUser(currentUser);
    console.log(currentUser);
    console.log(context.user);
    
    navigation.navigate('Movies')
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
      <View style={{padding:20, flexDirection:"row",justifyContent:'space-between'}}>
        <Text style={{color:"red"}}>{error}</Text> 
        <Text onPress={()=>{navigation.navigate('Register')}} style={{textDecorationLine:'underline',color:"blue"}}> Register</Text> 
      </View>
    </View>
      <Button title="Login" onPress={handleLogin}/>
      
    </View>
  )
}

export default Login