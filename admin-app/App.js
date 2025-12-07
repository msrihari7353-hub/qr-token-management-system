import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import TokenDetailsScreen from './src/screens/TokenDetailsScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import QRCodeScreen from './src/screens/QRCodeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Signup" 
            component={SignupScreen}
            options={{ title: 'Create Account' }}
          />
          <Stack.Screen 
            name="Dashboard" 
            component={DashboardScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="TokenDetails" 
            component={TokenDetailsScreen}
            options={{ title: 'Token Details' }}
          />
          <Stack.Screen 
            name="Analytics" 
            component={AnalyticsScreen}
            options={{ title: 'Analytics' }}
          />
          <Stack.Screen 
            name="QRCode" 
            component={QRCodeScreen}
            options={{ title: 'Your QR Code' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}