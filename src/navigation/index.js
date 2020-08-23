import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Product from '../screens/Product';
import Auction from '../screens/Auction';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Auction" component={Auction} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
