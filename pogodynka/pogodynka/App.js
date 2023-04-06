import { StyleSheet, Text, View,SafeAreaView,StatusBar } from 'react-native';
import React,{useEffect, useState} from 'react'; 
import Tolbar from './components/Tolbar';
import {key} from './secret'
import Input from './components/Input';

export default function App() {
  
  const [helpMode, setHelpMode] = useState(false);
  const [city, setCity]=useState('Gliwice');
  const [data, setData]=useState({});

  useEffect(()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`)
    .then(response => response.json())
    .then(json => {
      setData(json)
      console.log(data.main)
    })
    .catch(error => {
      console.log(error);

    });
  },[city])

  function changeCity(value){
    console.log(value)
  }


  return (
    <View>
      <Tolbar helpMode={helpMode} setHelpMode={setHelpMode}/>
      <Input placeholder={city} icon={"search"} callback={changeCity} ></Input>
    </View>
  );


}


