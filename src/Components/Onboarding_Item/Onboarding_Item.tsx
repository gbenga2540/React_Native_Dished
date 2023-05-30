import React, { FunctionComponent } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { fonts } from '../../Configs/Fonts/Fonts';
import { Onboarding_Props } from '../../Interface/Onboarding_Props/Onboarding_Props';

interface OnboardingItemProps {
    data: Onboarding_Props;
}
const OnboardingItem: FunctionComponent<OnboardingItemProps> = ({ data }) => {
    return (
        <View key={data?.id}>
            <Text style={styles.op_m_main_txt}>{data?.text}</Text>
            <Image source={data?.image} style={styles.op_m_main_img} />
            <Text style={styles.op_m_sub_txt}>{data?.subtext}</Text>
        </View>
    );
};

export default OnboardingItem;

const styles = StyleSheet.create({
    op_m_main_txt: {
        fontFamily: fonts.Poppins_700,
        fontSize: 28,
        color: Colors.Black,
        textAlign: 'center',
        marginTop: Platform.OS === 'ios' ? 150 : 120,
        width: 290,
        lineHeight: 32,
        alignSelf: 'center',
        marginBottom: 22,
    },
    op_m_main_img: {
        width: 260,
        height: 260,
        alignSelf: 'center',
    },
    op_m_sub_txt: {
        fontFamily: fonts.Poppins_400,
        fontSize: 20,
        width: 307,
        alignSelf: 'center',
        marginTop: 54,
        marginBottom: 33,
        textAlign: 'center',
        color: Colors.InputTextGrey,
    },
});
