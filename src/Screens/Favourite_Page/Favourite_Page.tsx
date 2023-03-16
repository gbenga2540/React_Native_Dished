import React, { FunctionComponent } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Colors/Colors';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';

const FavouritePage: FunctionComponent = () => {
    return (
        <View style={styles.fav_page_main}>
            <CustomStatusBar />
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
