/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { FunctionComponent, useEffect } from 'react';
import { StatusBar, StyleSheet, View, Platform } from 'react-native';
import Colors from '../Colors/Colors';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import MainStack from '../Routes/Main_Stack/Main_Stack';

const App: FunctionComponent = () => {
    useEffect(() => {
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
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={Colors().Background}
            />
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
