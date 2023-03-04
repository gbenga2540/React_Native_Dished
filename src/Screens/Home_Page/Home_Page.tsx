import React, { FunctionComponent } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Colors/Colors';

const HomePage: FunctionComponent = () => {
    return (
        <View style={styles.home_page_main}>
            <StatusBar
                backgroundColor={Colors().White}
                barStyle={'dark-content'}
            />
            <Text style={{ color: 'black' }}>Home page for Dished!</Text>
        </View>
    );
};

export default HomePage;

const styles = StyleSheet.create({
    home_page_main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
