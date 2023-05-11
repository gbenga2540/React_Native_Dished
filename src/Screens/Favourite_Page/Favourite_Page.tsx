import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';

const FavouritePage: FunctionComponent = () => {
    return (
        <View style={styles.fav_page_main}>
            <CustomStatusBar />
            {/* <ScrollView
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
            </ScrollView> */}
            <Text style={{ color: 'black' }}>Favourite page for Dished!</Text>
        </View>
    );
};

export default FavouritePage;

const styles = StyleSheet.create({
    fav_page_main: {
        flex: 1,
        backgroundColor: Colors.Background,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
