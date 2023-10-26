import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Entrar from './app/screens/Login';
import Curriculo from './app/screens/Curriculo';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { AUTHENTICATION } from './FirebaseConfig';


const Stack = createNativeStackNavigator();

const AuthStack = createNativeStackNavigator();


function InsideLayout() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name = 'Auth' component = {Curriculo}/>
    </AuthStack.Navigator>
  )
}


export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(()=> {
    onAuthStateChanged(AUTHENTICATION, (user)=> {
      console.log('user', user)
      setUser(user); 
    })

  }, [] )
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName='Entrar'>
        {user ? <Stack.Screen name = 'Auth' component = {InsideLayout}/>: ( <Stack.Screen name= 'Entrar' component={Entrar} options={{ headerShown: false}}/>)}

       

      </Stack.Navigator>

    </NavigationContainer>
  );
}
