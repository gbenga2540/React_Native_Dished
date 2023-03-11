import React, { FunctionComponent, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthStack from '../Auth_Stack/Auth_Stack';
import OnboardingStack from '../Onboarding_Stack/Onboarding_Stack';
import HomeStack from '../Home_Stack/Home_Stack';
import ErrorPage from '../../Screens/Error_Page/Error_Page';

type RootStackParamList = {
    Home: undefined;
    AuthStack: {};
    OnboardingStack: {};
    HomeStack: {};
    ErrorPage: {
        error_mssg: string;
        svr_error_mssg: string;
    };
};

const Main_Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack: FunctionComponent = () => {
    const [isInitializing, setIsInitializing] = useState<boolean>(true);
    const [showOnboarding, setShowOnboarding] = useState<boolean>(true);

    useEffect(() => {
        const check_onboarding = async () => {
            const has_shown_onboarding = await AsyncStorage.getItem(
                'show_onboarding',
            );
            if (
                has_shown_onboarding === null ||
                has_shown_onboarding === undefined
            ) {
                setShowOnboarding(true);
                setIsInitializing(false);
            } else {
                setShowOnboarding(false);
                setIsInitializing(false);
            }
        };
        check_onboarding();
    }, []);

    if (isInitializing) {
        return null;
    } else {
        return (
            <Main_Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
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
                <Main_Stack.Screen
                    name="HomeStack"
                    component={HomeStack}
                    options={{
                        headerShown: false,
                    }}
                />
                <Main_Stack.Screen
                    name="ErrorPage"
                    component={ErrorPage}
                    options={{
                        headerShown: false,
                    }}
                />
            </Main_Stack.Navigator>
        );
    }
};

export default MainStack;
