import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/lib/i18n'; 

import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Home from './src/pages/Home';
import Detail from './src/pages/Detail';
import LanguagesSelect from './src/components/LanguagesSelect';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import ThemeToggle from './src/components/ThemeToggle';

const RootStack = createNativeStackNavigator();

function AppNavigator() {
  const { isLoggedIn } = useAuth();
  const { theme } = useTheme();
  return (
    <NavigationContainer theme={theme === 'light' ? DefaultTheme : DarkTheme}>
      <RootStack.Navigator>
        <RootStack.Group>
          {isLoggedIn ? (
            <>
              <RootStack.Screen          
                name="Home"
                component={Home}
                options={({navigation}) => ({
                  headerRight: () =>  (
                    <View style={styles.headerRightContainer}>
                      <ThemeToggle />
                      <LanguagesSelect />
                    </View>
                  ),
                  // headerTitle: '',
                })}
              />
              <RootStack.Screen          
                name="Detail"
                component={Detail}
                options={({navigation}) => ({
                  headerRight: () =>  (
                    <View style={styles.headerRightContainer}>
                      <ThemeToggle />
                      <LanguagesSelect />
                    </View>
                  ),
                  // headerTitle: '',
                })}
              />
            </>
          ) : (
            <>
              <RootStack.Screen          
                name="Login"
                component={Login}
                options={({navigation}) => ({
                  headerShown: false,
                })}
              />
              <RootStack.Screen          
                name="Register"
                component={Register}
                options={({navigation}) => ({
                  headerShown: false,
                })}
              />
            </>
          )}
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <AuthProvider>
          <AppNavigator/>
        </AuthProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
