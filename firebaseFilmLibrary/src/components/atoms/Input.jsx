import React,{ useState }  from 'react'
import { TextInput ,View,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Input = ({placeholder,icon,onSubmit}) => {

    const [text,setText]=useState(placeholder)

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
      <Icon name={icon} />
      <TextInput style={styles.input} onSubmitEditing={()=>onSubmit(text.nativeEvent.text)} placeholder={placeholder} vale={text} onChange={(value)=>setText(value)}/>
    </View>
  )
}

export default Input