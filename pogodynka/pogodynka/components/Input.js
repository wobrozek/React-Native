import PropTypes from 'prop-types';
import React,{useState} from 'react';
import { TextInput ,View,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const Input = ({placeholder,icon,callback}) => {

  [text,setText]=useState(placeholder)

  const styles=StyleSheet.create({
    inputWrapper:{
      flexDirection:'row', 
      alignItems:'center',
      backgroundColor:'#a29bfe',
      padding:10,
      margin:20,
      gap:10,
      borderRadius:20
    },

    input:{
      flexGrow:1
    }
  });

  return (
    <View style={styles.inputWrapper}>
      <Icon name={icon} onPress={()=>callback(text.nativeEvent.text)} />
      <TextInput style={styles.input} onSubmitEditing={()=>callback(text.nativeEvent.text)} placeholder={placeholder} vale={text} onChange={(value)=>setText(value)}/>
    </View>
  )
}



Input.propTypes={
    city:PropTypes.string,
    icon:PropTypes.string,
    calback:PropTypes.func
}

export default Input