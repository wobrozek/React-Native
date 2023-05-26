import React,{ useState }  from 'react'
import { TextInput ,View,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {PropTypes} from 'prop-types';



const Input = (props) => {
    let {icon}=props;

    const styles=StyleSheet.create({
        inputWrapper:{
          flexDirection:'row', 
          alignItems:'center',
          paddingHorizontal:10,
          paddingVertical:5,
          margin:20,
          gap:10,
          borderWidth:5,
          borderColor:'#000',
        },
    
        input:{
          flexGrow:1,
          marginLeft:5
        }
      });

  return (
    <View style={styles.inputWrapper}>
      <Icon name={icon} />
      <TextInput style={styles.input} {...props}/>
    </View>
  )
}

Input.propTypes={
  placeholder:PropTypes.string,
  icon:PropTypes.string,
  value:PropTypes.String,
  onChange:PropTypes.func,
  onSubmitEditing:()=>{},
  secureTextEntry:false
  
}

export default Input