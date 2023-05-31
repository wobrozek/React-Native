import { StatusBar } from 'expo-status-bar';
import { StyleSheet,ImageBackground} from 'react-native';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MoviesScreen from './src/screens/MoviesScreen';
import MovieDetails from './src/screens/MovieDetails';
import { createContext, useState } from 'react';
import bacgroundImage from './assets/back.jpg';

const Stack = createNativeStackNavigator();
export const userContext = createContext();



export default function App() {

  const [user,setUser]= useState();
  const [appIsReady, setAppIsReady] = useState(false);

  const loginUser=(user)=>{
    setUser(user);
  } 

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  }

  const styles =StyleSheet.create({
    image:{
      flex: 1,
      resizeMode: 'cover',
    }
  });
  
  return (
    
      <ImageBackground source={bacgroundImage} style={styles.image}>
      <userContext.Provider value={{user, loginUser}}>
        <NavigationContainer theme={navTheme}>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
            />
            <Stack.Screen
              name="Register"
              component={Register}
            />
            <Stack.Screen name="Movies" component={MoviesScreen} />
            <Stack.Screen name="MovieDetails" component={MovieDetails} />
          </Stack.Navigator>
        </NavigationContainer>
        </userContext.Provider>
      </ImageBackground>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
