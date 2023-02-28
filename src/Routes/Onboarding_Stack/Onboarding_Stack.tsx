import React, { FunctionComponent } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Onboarding1Page from '../../Screens/Onboarding_1_Page/Onboarding_1_Page';
import Onboarding2Page from '../../Screens/Onboarding_2_Page/Onboarding_2_Page';
import Onboarding3Page from '../../Screens/Onboarding_3_Page/Onboarding_3_Page';
import Onboarding4Page from '../../Screens/Onboarding_4_Page/Onboarding_4_Page';

type RootStackParamList = {
    Home: undefined;
    Onboarding1Page: {};
    Onboarding2Page: {};
    Onboarding3Page: {};
    Onboarding4Page: {};
};

const Onboarding_Stack = createNativeStackNavigator<RootStackParamList>();

const OnboardingStack: FunctionComponent = () => {
    return (
        <Onboarding_Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Onboarding_Stack.Screen
                name="Onboarding1Page"
                component={Onboarding1Page}
            />
            <Onboarding_Stack.Screen
                name="Onboarding2Page"
                component={Onboarding2Page}
            />
            <Onboarding_Stack.Screen
                name="Onboarding3Page"
                component={Onboarding3Page}
            />
            <Onboarding_Stack.Screen
                name="Onboarding4Page"
                component={Onboarding4Page}
            />
        </Onboarding_Stack.Navigator>
    );
};

export default OnboardingStack;
