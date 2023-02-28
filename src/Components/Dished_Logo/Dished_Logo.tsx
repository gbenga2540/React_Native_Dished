import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fonts } from '../../Fonts/Fonts';
import DishedLogoImage from '../../Images/Logo/Dished_Logo.svg';

const DishedLogo: FunctionComponent = () => {
    return (
        <View style={styles.dl_main}>
            <Text style={[styles.dl_m_txt, { marginRight: -3 }]}>DIS</Text>
            <DishedLogoImage width={50} height={50} />
            <Text style={[styles.dl_m_txt, { marginLeft: -2 }]}>HED</Text>
        </View>
    );
};

export default DishedLogo;

const styles = StyleSheet.create({
    dl_main: {
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 13,
        height: 60,
        width: 240,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dl_m_txt: {
        fontFamily: fonts.Poppins_500,
        fontSize: 40,
        letterSpacing: 10,
    },
});
