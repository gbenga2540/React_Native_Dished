import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';

const BookingPage: FunctionComponent = () => {
        return (
                <View style={styles.booking_page_main}>
                        <CustomStatusBar />
                        {/* <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                </View>
            </ScrollView> */}
                        <Text style={{ color: 'black' }}>Booking page for Dished!</Text>
                </View>
        );
};

export default BookingPage;

const styles = StyleSheet.create({
        booking_page_main: {
                flex: 1,
                backgroundColor: Colors.Background,
                justifyContent: 'center',
                alignItems: 'center',
        },
});
