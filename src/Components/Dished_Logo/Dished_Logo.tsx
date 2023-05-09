import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { fonts } from '../../Configs/Fonts/Fonts';
import DishedLogoImage from '../../Images/Logo/Dished_Logo.svg';
import Colors from '../../Configs/Colors/Colors';

const DishedLogo: FunctionComponent = () => {
    return (
        <View style={styles.dl_main}>
            <Text
                style={[
                    styles.dl_m_txt,
                    { marginRight: Platform?.OS === 'ios' ? -5 : 0 },
                ]}>
                DIS
            </Text>
            <DishedLogoImage width={50} height={50} />
            <Text
                style={[
                    styles.dl_m_txt,
                    { marginLeft: Platform?.OS === 'ios' ? 0 : -5 },
                ]}>
                HED
            </Text>
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
        color: Colors().Black,
    },
});
