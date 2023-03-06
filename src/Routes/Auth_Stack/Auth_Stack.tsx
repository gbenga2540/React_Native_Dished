import React, { FunctionComponent, useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SInfo from 'react-native-sensitive-info';
import { SECURE_STORAGE_NAME, SECURE_STORAGE_USER_INFO } from '@env';
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
};

const Auth_Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack: FunctionComponent = () => {
    const [render, setRender] = useState<boolean>(false);
    const [userPresent, setUserPresent] = useState<boolean>(false);

    useEffect(() => {
        setRender(false);
        const does_user_exist = async () => {
            try {
                await SInfo.getItem(SECURE_STORAGE_USER_INFO, {
                    sharedPreferencesName: SECURE_STORAGE_NAME,
                    keychainService: SECURE_STORAGE_NAME,
                })
                    .then(async res => {
                        if (res === null) {
                            setUserPresent(false);
                            setRender(true);
                        } else {
                            const json_res = JSON.parse(res);
                            if (json_res?.email && json_res?.password) {
                                setUserPresent(true);
                                setRender(true);
                            } else {
                                setUserPresent(false);
                                setRender(true);
                            }
                        }
                    })
                    .catch(error => {
                        if (error) {
                            setUserPresent(false);
                            setRender(true);
                        }
                    });
            } catch (err) {
                setUserPresent(false);
                setRender(true);
            }
        };
        does_user_exist();
    }, []);

    if (render) {
        return (
            <Auth_Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                }}
                initialRouteName={
                    userPresent ? 'FingerprintLoginPage' : 'SignUpPage'
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
            </Auth_Stack.Navigator>
        );
    } else {
        return null;
    }
};

export default AuthStack;
