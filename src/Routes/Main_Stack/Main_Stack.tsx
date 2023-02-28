import React, { FunctionComponent, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from '../Auth_Stack/Auth_Stack';
import OnboardingStack from '../Onboarding_Stack/Onboarding_Stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    Home: undefined;
    AuthStack: {};
    OnboardingStack: {};
};
const Main_Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack: FunctionComponent = () => {
    const [isStorageLoading, setIsStorageLoading] = useState<boolean>(true);
    const [showOnboarding, setShowOnboarding] = useState<boolean>(true);

    const check_onboarding = async () => {
        const has_shown_onboarding = await AsyncStorage.getItem(
            'show_onboarding',
        );
        if (
            has_shown_onboarding === null ||
            has_shown_onboarding === undefined
        ) {
            setShowOnboarding(true);
            setIsStorageLoading(false);
        } else {
            setShowOnboarding(false);
            setIsStorageLoading(false);
        }
    };

    useEffect(() => {
        check_onboarding();
    }, []);

    if (isStorageLoading) {
        return null;
    } else {
        return (
            <Main_Stack.Navigator
                initialRouteName={
                    showOnboarding ? 'OnboardingStack' : 'AuthStack'
                }>
                <Main_Stack.Screen
                    name="AuthStack"
                    component={AuthStack}
                    options={{
                        headerShown: false,
                    }}
                />
                <Main_Stack.Screen
                    name="OnboardingStack"
                    component={OnboardingStack}
                    options={{
                        headerShown: false,
                    }}
                />
            </Main_Stack.Navigator>
        );
    }
};

export default MainStack;
