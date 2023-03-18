/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { FunctionComponent, useEffect } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import Colors from '../Colors/Colors';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import CustomStatusBar from '../Components/Custom_Status_Bar/Custom_Status_Bar';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_WEB_CLIENT_ID } from '@env';
import MainStack from '../Routes/Main_Stack/Main_Stack';
// import HomeStack from '../Routes/Home_Stack/Home_Stack';

const App: FunctionComponent = () => {
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

    return (
        <View
            style={[
                styles.app_main,
                { backgroundColor: Colors()?.Background },
            ]}>
            <CustomStatusBar />
            <NavigationContainer>
                <MainStack />
                {/* <HomeStack /> */}
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
