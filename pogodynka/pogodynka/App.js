import { StyleSheet, Text, View,SafeAreaView,StatusBar } from 'react-native';
import React,{useEffect, useState} from 'react'; 
import Tolbar from './components/Tolbar';

export default function App() {
  
  const [helpMode, setHelpMode] = useState(false);
  const [city, setCity]=useState('Gliwice')

  useEffect(()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=02ced0c2dfafb71d25704cd7f4434ee7`)
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


