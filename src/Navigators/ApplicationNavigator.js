import React, { useState, useEffect, useRef, useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import { IndexPostCarDetailScreen, IndexPostCarScreen, IndexWelcomeContainer } from '../Containers';
import TabBottomNavigation from './TabBottonNavigation';

function ApplicationNavigator() {

    const Stack = createStackNavigator();

    return (

        <NavigationContainer>

            <Stack.Navigator
                initialRouteName="Root"
                screenOptions={{
                    headerShown: false,
                }}>

                <Stack.Screen
                    name="Root"
                    component={TabBottomNavigation}
                    options={{
                        headerShown: false,
                        animationEnabled: true,
                        gestureDirection: 'horizontal',
                        cardStyleInterpolator:
                            CardStyleInterpolators.forHorizontalIOS,
                    }}
                />


                <Stack.Screen
                    name="WelcomeScreen"
                    component={IndexWelcomeContainer}
                    options={{
                        headerShown: false,
                        animationEnabled: true,
                        gestureDirection: 'horizontal',
                        cardStyleInterpolator:
                            CardStyleInterpolators.forHorizontalIOS,
                    }}
                />

                <Stack.Screen
                    name="PostACar"
                    component={IndexPostCarScreen}
                    options={{
                        headerShown: false,
                        animationEnabled: true,
                        gestureDirection: 'horizontal',
                        cardStyleInterpolator:
                            CardStyleInterpolators.forHorizontalIOS,
                    }}
                />

                <Stack.Screen
                    name="PostACar-Details"
                    component={IndexPostCarDetailScreen}
                    options={{
                        headerShown: false,
                        animationEnabled: true,
                        gestureDirection: 'vertical',
                        cardStyleInterpolator:
                            CardStyleInterpolators.forVerticalIOS,
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>

    );

};

export default ApplicationNavigator;