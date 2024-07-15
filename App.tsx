import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Group>
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
          <RootStack.Screen          
            name="Home"
            component={Home}
            options={({navigation}) => ({})}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
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
