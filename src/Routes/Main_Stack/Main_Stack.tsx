import React, { FunctionComponent, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthStack from '../Auth_Stack/Auth_Stack';
import OnboardingStack from '../Onboarding_Stack/Onboarding_Stack';
import AppStack from '../App_Stack/App_Stack';
import ErrorPage from '../../Screens/Error_Page/Error_Page';
import InfoPage from '../../Screens/Info_Page/Info_Page';

type RootStackParamList = {
    Home: undefined;
    AuthStack: {};
    OnboardingStack: {};
    AppStack: {};
    ErrorPage: {
        error_mssg: string;
        svr_error_mssg: string;
    };
    InfoPage: {
        title: string;
        message: string;
        info_type: string;
        show_retry?: boolean;
        retry_btn_text?: string;
    };
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
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
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
                    name="AppStack"
                    component={AppStack}
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
                <Main_Stack.Screen
                    name="InfoPage"
                    component={InfoPage}
                    options={{
                        headerShown: false,
                    }}
                />
            </Main_Stack.Navigator>
        );
    }
};

export default MainStack;
