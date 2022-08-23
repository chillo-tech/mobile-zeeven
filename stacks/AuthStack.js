import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { PhoneAuthScreen, NewUserScreen, SecretCodeScreen } from '../components/authScreen';


const Stack = createNativeStackNavigator();

function AuthStack({navigation}){

    return(
        <Stack.Navigator initialRouteName="Numero AUTH">
            <Stack.Screen 
                    name="Numero AUTH" 
                    component={ PhoneAuthScreen }
                    options={{ headerShown: false }} 
            />
            <Stack.Screen name="Secret Code" component={ SecretCodeScreen } />
            <Stack.Screen name="New User"    component={ NewUserScreen } />
        </Stack.Navigator>
    )

}

export default AuthStack;