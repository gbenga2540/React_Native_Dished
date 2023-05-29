import React, { FunctionComponent, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthStack from '../Auth_Stack/Auth_Stack';
import OnboardingPage from '../../Screens/Onboarding_Page/Onboarding_Page';
import HomeStack from '../Home_Stack/Home_Stack';
import ErrorPage from '../../Screens/Error_Page/Error_Page';
import InfoPage from '../../Screens/Info_Page/Info_Page';

type MainStackParamList = {
        AuthStack: {};
        OnboardingPage: {};
        HomeStack: {};
        ErrorPage: {
                error_mssg: string;
                svr_error_mssg: string;
        };
        InfoPage: {
                success_mssg: string;
                svr_success_mssg: string;
        };
};

const Main_Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack: FunctionComponent = () => {
        const [isInitializing, setIsInitializing] = useState<boolean>(true);
        const [showOnboarding, setShowOnboarding] = useState<boolean>(true);

        useEffect(() => {
                const check_onboarding = async () => {
                        const has_shown_onboarding = await AsyncStorage.getItem('show_onboarding');
                        if (has_shown_onboarding === null || has_shown_onboarding === undefined) {
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
                                initialRouteName={showOnboarding ? 'OnboardingPage' : 'AuthStack'}>
                                <Main_Stack.Screen
                                        name="AuthStack"
                                        component={AuthStack}
                                        options={{
                                                headerShown: false,
                                        }}
                                />
                                <Main_Stack.Screen
                                        name="OnboardingPage"
                                        component={OnboardingPage}
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
