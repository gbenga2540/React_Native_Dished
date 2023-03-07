import React, { FunctionComponent, useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import SignUpPage from '../../Screens/Sign_Up_Page/Sign_Up_Page';
import SignInPage from '../../Screens/Sign_In_Page/Sign_In_Page ';
import VerifyOTPPage from '../../Screens/Verify_OTP_Page/Verify_OTP_Page';
import ChangePasswordPage from '../../Screens/Change_Password_Page/Change_Password_Page';
import ForgotPasswordPage from '../../Screens/Forgot_Password_Page/Forgot_Password_Page';
import VerifyRidersPage from '../../Screens/Verify_Riders_Page/Verify_Riders_Page';
import VerifyRestaurantPage from '../../Screens/Verify_Restaurant_Page/Verify_Restaurant_Page';
import VerifyConsumerPage from '../../Screens/Verify_Consumer_Page/Verify_Consumer_Page';
import FingerprintLoginPage from '../../Screens/Fingerprint_Login_Page/Fingerprint_Login_Page';
import SelectProfilePage from '../../Screens/Select_Profile_Page/Select_Profile_Page';
import VerifyMailPage from '../../Screens/Verify_Mail_Page/Verify_Mail_Page';

type RootStackParamList = {
    Home: undefined;
    SelectProfilePage: {};
    FingerprintLoginPage: {};
    SignUpPage: {};
    VerifyConsumerPage: {};
    VerifyRestaurantPage: {};
    VerifyRidersPage: {};
    ForgotPasswordPage: {};
    ChangePasswordPage: {};
    VerifyOTPPage: {};
    SignInPage: {};
    VerifyMailPage: {};
};

const Auth_Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack: FunctionComponent = () => {
    const [initializing, setInitializing] = useState<boolean>(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    const onAuthStateChanged = (res_user: FirebaseAuthTypes.User | null) => {
        setUser(res_user);
        setInitializing(false);
    };

    useEffect(() => {
        setInitializing(true);
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) {
        return null;
    } else {
        return (
            <Auth_Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                }}
                initialRouteName={
                    user
                        ? user?.emailVerified
                            ? 'FingerprintLoginPage'
                            : 'VerifyMailPage'
                        : 'SignUpPage'
                }>
                <Auth_Stack.Screen
                    name="SelectProfilePage"
                    component={SelectProfilePage}
                />
                <Auth_Stack.Screen
                    name="FingerprintLoginPage"
                    component={FingerprintLoginPage}
                />
                <Auth_Stack.Screen name="SignUpPage" component={SignUpPage} />
                <Auth_Stack.Screen
                    name="VerifyConsumerPage"
                    component={VerifyConsumerPage}
                />
                <Auth_Stack.Screen
                    name="VerifyRestaurantPage"
                    component={VerifyRestaurantPage}
                />
                <Auth_Stack.Screen
                    name="VerifyRidersPage"
                    component={VerifyRidersPage}
                />
                <Auth_Stack.Screen
                    name="VerifyOTPPage"
                    component={VerifyOTPPage}
                />
                <Auth_Stack.Screen
                    name="ChangePasswordPage"
                    component={ChangePasswordPage}
                />
                <Auth_Stack.Screen
                    name="ForgotPasswordPage"
                    component={ForgotPasswordPage}
                />
                <Auth_Stack.Screen name="SignInPage" component={SignInPage} />
                <Auth_Stack.Screen
                    name="VerifyMailPage"
                    component={VerifyMailPage}
                    options={{
                        headerShown: false,
                    }}
                />
            </Auth_Stack.Navigator>
        );
    }
};

export default AuthStack;
