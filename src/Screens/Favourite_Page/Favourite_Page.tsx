import React, { FunctionComponent } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Colors/Colors';

const FavouritePage: FunctionComponent = () => {
    return (
        <View style={styles.fav_page_main}>
            <StatusBar
                backgroundColor={Colors().Background}
                barStyle={'dark-content'}
            />
            <ScrollView style={{ flex: 1 }}>
                <Text style={{ color: 'black' }}>
                    Favourite page for Dished!
                </Text>
            </ScrollView>
        </View>
    );
};

export default FavouritePage;

const styles = StyleSheet.create({
    fav_page_main: {
        flex: 1,
        backgroundColor: Colors().Background,
    },
});
