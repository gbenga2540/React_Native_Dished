import React, { FunctionComponent } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Colors/Colors';

const BookingPage: FunctionComponent = () => {
    return (
        <View style={styles.booking_page_main}>
            <StatusBar
                backgroundColor={Colors().Background}
                barStyle={'dark-content'}
            />
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'black' }}>
                        Booking page for Dished!
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default BookingPage;

const styles = StyleSheet.create({
    booking_page_main: {
        flex: 1,
        backgroundColor: Colors().Background,
    },
});
