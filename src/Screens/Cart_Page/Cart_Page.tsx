import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';

const CartPage: FunctionComponent = () => {
    return (
        <View style={styles.cart_page_main}>
            <CustomStatusBar />
            {/* <ScrollView style={{ flex: 1 }}>
            </ScrollView> */}
            <Text style={{ color: 'black' }}>Cart page for Dished!</Text>
        </View>
    );
};

export default CartPage;

const styles = StyleSheet.create({
    cart_page_main: {
        flex: 1,
        backgroundColor: Colors.Background,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
