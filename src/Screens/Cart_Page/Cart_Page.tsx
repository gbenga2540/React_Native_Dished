import React, { FunctionComponent } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Colors/Colors';

const CartPage: FunctionComponent = () => {
    return (
        <View style={styles.cart_page_main}>
            <StatusBar
                backgroundColor={Colors().Background}
                barStyle={'dark-content'}
            />
            <ScrollView style={{ flex: 1 }}>
                <Text style={{ color: 'black' }}>Cart page for Dished!</Text>
            </ScrollView>
        </View>
    );
};

export default CartPage;

const styles = StyleSheet.create({
    cart_page_main: {
        flex: 1,
        backgroundColor: Colors().Background,
    },
});
