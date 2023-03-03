import React, { FunctionComponent } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '../../Screens/Home_Page/Home_Page';

type RootStackParamList = {
    Home: undefined;
    HomePage: {};
};

const App_Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack: FunctionComponent = () => {
    return (
        <App_Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="HomePage">
            <App_Stack.Screen name="HomePage" component={HomePage} />
        </App_Stack.Navigator>
    );
};

export default AppStack;
