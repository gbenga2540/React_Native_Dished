/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { FunctionComponent, useEffect, useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import Colors from '../Configs/Colors/Colors';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import CustomStatusBar from '../Components/Custom_Status_Bar/Custom_Status_Bar';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { FIREBASE_USERS_COLLECTION, GOOGLE_WEB_CLIENT_ID } from '@env';
import MainStack from '../Routes/Main_Stack/Main_Stack';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import {
    set_user_dp,
    set_user_name,
} from '../Redux/Actions/User_Info/User_Info_Actions';
import { Sign_Up_Identity_Data } from '../Data/Sign_Up_Identity/Sign_Up_Identity';

const App: FunctionComponent = () => {
    const dispatch = useDispatch();
    const [userUID, setUserUID] = useState<string>('');

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: GOOGLE_WEB_CLIENT_ID,
        });
        if (Platform.OS === 'android') {
            const time_out = setTimeout(() => {
                SplashScreen.hide();
            }, 1000);
            return () => {
                clearTimeout(time_out);
            };
        }
    }, []);

    auth().onAuthStateChanged(user => {
        setUserUID(user?.uid as string);
    });

    useEffect(() => {
        if (userUID) {
            try {
                const dp_ref = storage().ref(
                    `Users_Info/${
                        auth().currentUser?.uid
                    }/Display_Picture/dp.jpeg`,
                );
                const get_user_info_from_svr = async () => {
                    await dp_ref.getDownloadURL()?.then(res => {
                        if (res) {
                            dispatch(set_user_dp({ user_dp: res }));
                        }
                    });
                    await firestore()
                        .collection(FIREBASE_USERS_COLLECTION)
                        .doc(auth()?.currentUser?.uid as string)
                        .get()
                        .then(async info_res => {
                            if (info_res?.data() && info_res?.exists === true) {
                                if (
                                    info_res?.data()?.accountType ===
                                    Sign_Up_Identity_Data[0]?.value
                                ) {
                                    dispatch(
                                        set_user_name({
                                            user_name:
                                                info_res?.data()?.fullName,
                                        }),
                                    );
                                } else if (
                                    info_res?.data()?.accountType ===
                                    Sign_Up_Identity_Data[1]?.value
                                ) {
                                    dispatch(
                                        set_user_name({
                                            user_name:
                                                info_res?.data()?.fullName,
                                        }),
                                    );
                                } else if (
                                    info_res?.data()?.accountType ===
                                    Sign_Up_Identity_Data[2]?.value
                                ) {
                                    dispatch(
                                        set_user_name({
                                            user_name:
                                                info_res?.data()?.businessName,
                                        }),
                                    );
                                }
                            }
                        });
                };
                get_user_info_from_svr();
            } catch (error) {}
        }
    }, [userUID, dispatch]);

    return (
        <View style={[styles.app_main, { backgroundColor: Colors.Background }]}>
            <CustomStatusBar />
            <NavigationContainer>
                <MainStack />
            </NavigationContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    app_main: {
        flex: 1,
    },
});

export default App;
