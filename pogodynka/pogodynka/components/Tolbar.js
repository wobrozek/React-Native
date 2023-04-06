import React from 'react'
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { Switch } from '@rneui/themed';


const Tolbar = ({helpMode,setHelpMode}) => {

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
        },
        tolbar:{
          width:'100%',
          height:70,
          backgroundColor:'#9F6BC8',
          justifyContent:'space-between',
          alignItems:'center',
          flexDirection:'row',
          padding:10,
          marginTop:StatusBar.currentHeight
        },
        text:{
          color:'#fff',
          fontSize:helpMode ?30:20
        }
      });

  return (
    <View style={styles.tolbar}>
        <Text style={styles.text}>Pogodynka</Text>
        <Switch value={helpMode} onValueChange={(value)=>setHelpMode(value)} /> 
      </View>
  )
}

Tolbar.propTypes ={
    helpMode: PropTypes.bool,
    setHelpMode: PropTypes.func
}

export default Tolbar