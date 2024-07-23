import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Home from './src/pages/Home';
import Detail from './src/pages/Detail';
import { AuthProvider, useAuth } from './src/context/AppContext';

const RootStack = createNativeStackNavigator();


function AppNavigator() {
  const { isLoggedIn } = useAuth();

  return (
    <RootStack.Navigator>
      <RootStack.Group>
      {isLoggedIn ? (
        <>
          <RootStack.Screen          
            name="Home"
            component={Home}
            options={({navigation}) => ({})}
          />
          <RootStack.Screen          
            name="Detail"
            component={Detail}
            options={({navigation}) => ({})}
          />
        </>
      ) : (
        <>
          <RootStack.Screen          
            name="Login"
            component={Login}
            options={({navigation}) => ({
              headerShown: false
            })}
          />
          <RootStack.Screen          
            name="Register"
            component={Register}
            options={({navigation}) => ({
              headerShown: false
            })}
          />
        </>
      )}
      </RootStack.Group>
    </RootStack.Navigator>
  );
}


export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
    </AuthProvider>
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
