import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MoviesScreen from './src/screens/MoviesScreen';
import MovieDetails from './src/screens/MovieDetails';
import { createContext, useState } from 'react';

const Stack = createNativeStackNavigator();
export const userContext = createContext();



export default function App() {

  const [user,setUser]= useState();
  

  const loginUser=(user)=>{
    setUser(user);
  } 
  
  return (
    <userContext.Provider value={{user, loginUser}}>
      <NavigationContainer>
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
