import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import Colors from '../../Colors/Colors';
import { fonts } from '../../Fonts/Fonts';
import OTPTextView from 'react-native-otp-textinput';
import DishedLogo from '../../Components/Dished_Logo/Dished_Logo';
import TextButton from '../../Components/Text_Button/Text_Button';
import BasicButton from '../../Components/Basic_Button/Basic_Button';

const VerifyOTPPage: FunctionComponent = () => {
    const [OTP, setOTP] = useState<string>('');

    return (
        <View style={styles.verify_otp_main}>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={Colors().Primary}
            />
            <ScrollView>
                <View style={styles.top_cont}>
                    <Text style={styles.top_cont_txt}>{'Verify OTP'}</Text>
                </View>
                <View style={{ marginTop: 110, marginBottom: 65 }}>
                    <DishedLogo />
                </View>
                <Text style={styles.v_o_m_info}>
                    {
                        'Please input the One-Time-Password (OTP) sent to your Email.'
                    }
                </Text>
                <View style={{ marginHorizontal: 26 }}>
                    <OTPTextView
                        inputCount={6}
                        handleTextChange={(text: string) => setOTP(text)}
                        offTintColor={Colors().InputTextGrey}
                        tintColor={Colors().Primary}
                        textInputStyle={styles.roundedTextInput}
                    />
                </View>
                <TextButton
                    textColor={Colors().LightPink}
                    isFontLight={true}
                    marginTop={25}
                    marginLeft={'auto'}
                    marginRight={22}
                    buttonText="Resend OTP"
                    execFunc={() => console.log('resend otp')}
                />
                <View style={styles.s_m_input_cont}>
                    <BasicButton
                        buttonText="Verify"
                        buttonHeight={52}
                        marginTop={23}
                        marginBottom={16}
                        execFunc={() => console.log('Verify')}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default VerifyOTPPage;

const styles = StyleSheet.create({
    verify_otp_main: {
        flex: 1,
    },
    top_cont: {
        width: '100%',
        height: 1000,
        top: -890,
        backgroundColor: Colors()?.Primary,
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        position: 'absolute',
    },
    top_cont_txt: {
        marginTop: 'auto',
        marginBottom: 13,
        color: Colors().White,
        fontFamily: fonts.Poppins_700,
        fontSize: 24,
        lineHeight: 32,
    },
    s_m_input_cont: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 20,
    },
    roundedTextInput: {
        borderRadius: 5,
        borderWidth: 1,
        borderBottomWidth: 1,
    },
    v_o_m_info: {
        fontFamily: fonts.Poppins_400,
        color: Colors().Black,
        textAlign: 'center',
        width: 250,
        alignSelf: 'center',
        marginBottom: 10,
        fontSize: 15,
    },
});
