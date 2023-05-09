import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { fonts } from '../../Configs/Fonts/Fonts';
import Colors from '../../Configs/Colors/Colors';
import FacebookLogo from '../../Images/Logo/Facebook_Logo.svg';
import GoogleLogo from '../../Images/Logo/Google_Logo.svg';

interface BasicLogoButtonProps {
    logoName: string;
    inputText: string;
    marginTop?: number;
    marginBottom?: number;
    execFunc: () => void;
    disabled?: boolean;
}

const BasicLogoButton: FunctionComponent<BasicLogoButtonProps> = ({
    logoName,
    inputText,
    marginTop,
    marginBottom,
    execFunc,
    disabled,
}) => {
    return (
        <TouchableOpacity
            disabled={disabled || false}
            onPress={() => execFunc()}
            activeOpacity={0.65}
            style={[
                styles.b_l_b_main,
                { marginTop: marginTop || 0, marginBottom: marginBottom || 0 },
            ]}>
            {logoName === 'Facebook' && <FacebookLogo width={22} height={22} />}
            {logoName === 'Google' && <GoogleLogo width={22} height={22} />}
            <Text style={styles.b_l_b_m_t}>{inputText || 'Sign up with'}</Text>
        </TouchableOpacity>
    );
};

export default BasicLogoButton;

const styles = StyleSheet.create({
    b_l_b_main: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        borderColor: Colors().BorderLineGrey,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 11,
    },
    b_l_b_m_t: {
        fontFamily: fonts.Poppins_700,
        fontSize: 16,
        flex: 1,
        marginLeft: 11,
        textAlignVertical: 'center',
        color: Colors().InputTextGrey,
    },
});
