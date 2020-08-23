import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Product from '../screens/Product';
import Auction from '../screens/Auction';
import { colors } from '../styles/variables';

const Stack = createStackNavigator();

const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTitleStyle: {
    color: colors.white,
  },
  cardStyle: {
    backgroundColor: 'white',
  },
  headerTitleAlign: 'left',
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultScreenOptions}>
        <Stack.Screen
          name="Product"
          component={Product}
          options={{ title: 'Bids on your car' }}
        />
        <Stack.Screen
          name="Auction"
          component={Auction}
          options={{ title: 'Auction Completed', headerTitleAlign: 'right' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
