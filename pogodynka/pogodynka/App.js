import { View,ToastAndroid,AlertIOS } from 'react-native';
import React,{useEffect, useState} from 'react'; 
import Tolbar from './components/Tolbar';
import {key} from './secret';
import Input from './components/Input';
import DisplayWeather from './components/DisplayWeather';

export default function App() {
  
  const [helpMode, setHelpMode] = useState(false);
  const [city, setCity]=useState('Gliwice');
  const [data, setData]=useState({});

  useEffect(()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=pl`)
    .then(response => response.json())
    .then(json => {
      if (json?.message === "city not found"){
        if (Platform.OS === 'android') {
          ToastAndroid.show("City doesn't exist", ToastAndroid.SHORT)
        } else {
          AlertIOS.alert("City doesn't exist");
        }
        return
      }
      console.log(data);
      setData({...json});
    })
    .catch(error => {
      console.log(error);
    });
  },[city])

  function changeCity(value){
    setCity(value)
  }


  return (
    <View>
      <Tolbar helpMode={helpMode} setHelpMode={setHelpMode}/>
      <Input placeholder={city} icon={"search"} callback={changeCity} ></Input>
      <DisplayWeather data={data} helpMode={helpMode}/>
    </View>
  );


}


