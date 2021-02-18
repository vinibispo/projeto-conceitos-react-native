import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../pages/Home';
import Repo from '../pages/Repo';
import Imutabilidade from '../pages/Imutabilidade';
import Form from '../pages/Form';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Form" component={Form} />
        <Stack.Screen name="Imutabilidade" component={Imutabilidade} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Repo" component={Repo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
