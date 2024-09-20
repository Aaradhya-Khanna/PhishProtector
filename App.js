import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PrintResult from './frontend/Printresult';
import FrontScreen from './frontend/Frontpage'
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={FrontScreen} />
        <Stack.Screen name="PrintResult" component={PrintResult} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
