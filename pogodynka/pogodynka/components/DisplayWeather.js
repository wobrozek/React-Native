import { number } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Text,View,Image,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const DisplayWeather = ({data,helpMode}) => {

const [dateTimeNow,setDateTimeNow] =useState(new Date);
const [dateSunrise,setDateSunrise] =useState(new Date);
const [dateSunset,setDateSunset] =useState(new Date);

useEffect(()=>{
    setDateTimeNow(new Date());
    setDateSunrise(new Date(data?.sys?.sunrise*1000));
    setDateSunset(new Date(data?.sys?.sunset*1000));
},[data])

    const style=StyleSheet.create({
        photo:{
            width:100,
            height:100
        },
        row:{
            flexDirection:'row',
            width:'100%',
            justifyContent:'space-between',
            paddingVertical:50
        },
        main:{
            marginHorizontal:helpMode ? 5: 30,
            marginTop:-20
        },
        textBig:{
            fontSize:helpMode ? 35 : 30
        },
        textSmall:{
            fontSize:helpMode? 20:15
        },
        text:{
            fontSize:helpMode? 25:20
        },
        textBold:{
            fontWeight:'bold'
        }
    })

    if(!data?.main){
        return(
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }
        return (
            <View style={style.main}>
                <View style={style.row}>
                    <View>
                        <Text style={style.textBig}>{data.name}</Text>
                        <Text style={style.textBig}>{data.main.temp}°C</Text>
                        <Text style={style.textSmall}>{dateTimeNow.toLocaleTimeString()}    {dateTimeNow.toLocaleDateString()}</Text>
                        <Text style={style.textSmall}>{data.weather[0].description}</Text>
                    </View>
                    <Image style={style.photo} alt="loading..." source={{uri:`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}}/>
                </View>

                <Text style={style.text}>Ciśniene atmosferyczne:  
                    <Text style={style.textBold}>{data.main.pressure} hPa</Text>
                </Text>
                <Text style={style.text}>{helpMode ? "Temperatura Minimalna: ": "Min: "}
                    <Text style={style.textBold}>{data.main.temp_min}{"°C"}</Text>
                </Text>
                <Text style={style.text}>{helpMode ? "Temperatura Maksymalna: ": "Max: "}
                    <Text style={style.textBold}>{data.main.temp_max}{"°C"}</Text> 
                </Text>

                <View style={style.row}>
                    <View style={{alignItems:"center"}}>
                        {helpMode ? <Text style={style.text}>Wschód Słońca</Text> : <Icon size={80} name='sunrise'></Icon>}
                        <Text style={style.text}>{` ${dateSunrise.getHours()} : `}{(dateSunrise.getMinutes()>10 ? `${dateSunrise.getMinutes()}` : `0${dateSunrise.getMinutes()}`) }</Text>
                    </View>
                    <View style={{alignItems:"center"}}>
                        {helpMode ? <Text style={style.text}>Zachód Słońca</Text> : <Icon size={80} name='sunset'></Icon>}
                        <Text style={style.text}>{` ${dateSunset.getHours()} : `}{(dateSunset.getMinutes()>10 ? `${dateSunset.getMinutes()}` : `0${dateSunset.getMinutes()}`) }</Text>
                    </View>
                </View>
                

            </View>
        )
}

export default DisplayWeather