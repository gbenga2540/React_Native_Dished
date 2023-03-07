import React, { FunctionComponent } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Colors/Colors';

const HomePage: FunctionComponent = () => {
    return (
        <View style={styles.home_page_main}>
            <StatusBar
                backgroundColor={Colors().Background}
                barStyle={'dark-content'}
            />
            <ScrollView style={{ flex: 1 }}>
                <Text style={{ color: 'black' }}>Home page for Dished!</Text>
            </ScrollView>
        </View>
    );
};

export default HomePage;

const styles = StyleSheet.create({
    home_page_main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors().Background,
    },
});
