import { StyleSheet, Text, View,SafeAreaView,StatusBar } from 'react-native';
import React,{useEffect, useState} from 'react'; 
import Tolbar from './components/Tolbar';
import key from './secret'

export default function App() {
  
  const [helpMode, setHelpMode] = useState(false);
  const [city, setCity]=useState('Gliwice')

  useEffect(()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then(response => response.json())
    .then(json => {
      console.log(json)
    })
    .catch(error => {
      console.error(error);
    });
  })


  return (
      <Tolbar helpMode={helpMode} setHelpMode={setHelpMode}/>
  );


}


