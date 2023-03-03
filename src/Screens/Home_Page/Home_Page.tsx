import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HomePage: FunctionComponent = () => {
    return (
        <View style={styles.home_page_main}>
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
