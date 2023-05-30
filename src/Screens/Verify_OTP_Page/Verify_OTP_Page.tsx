import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { fonts } from '../../Configs/Fonts/Fonts';
import OTPTextView from 'react-native-otp-textinput';
import DishedLogo from '../../Components/Dished_Logo/Dished_Logo';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const VerifyOTPPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [OTP, setOTP] = useState<string>('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);

    const verify_otp = () => {
        setDisableButton(false);
        if (OTP?.length === 6) {
        } else {
            setDisableButton(false);
            error_handler({
                navigation: navigation,
                error_mssg: 'Incorrect One-Time-Password (OTP).',
            });
        }
    };

    return (
        <View style={styles.verify_otp_main}>
            <CustomStatusBar
                barStyleLight={true}
                backgroundColor={Colors.Primary}
                backgroundDimColor={Colors.PrimaryDim}
                showSpinner={showSpinner}
            />
            <OverlaySpinner
                showSpinner={showSpinner}
                setShowSpinner={setShowSpinner}
            />
            <ScrollView>
                <View style={styles.top_cont}>
                    <Text style={styles.top_cont_txt}>{'Verify OTP'}</Text>
                </View>
                <View
                    style={{
                        marginTop: 110,
                        marginBottom: 65,
                    }}>
                    <DishedLogo />
                </View>
                <Text style={styles.v_o_m_info}>
                    {
                        'Please input the One-Time-Password (OTP) sent to your Mobile Number.'
                    }
                </Text>
                <View style={{ marginHorizontal: 26 }}>
                    <OTPTextView
                        inputCount={6}
                        handleTextChange={(text: string) => setOTP(text)}
                        offTintColor={Colors.InputTextGrey}
                        tintColor={Colors.Primary}
                        textInputStyle={styles.roundedTextInput}
                    />
                </View>
                <View style={styles.s_m_input_cont}>
                    <BasicButton
                        buttonText="Verify"
                        buttonHeight={56}
                        disabled={disableButton}
                        marginTop={23}
                        marginBottom={16}
                        execFunc={() => verify_otp()}
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
        backgroundColor: Colors.Primary,
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        position: 'absolute',
    },
    top_cont_txt: {
        marginTop: 'auto',
        marginBottom: 13,
        color: Colors.White,
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
        color: Colors.Black,
        textAlign: 'center',
        width: 250,
        alignSelf: 'center',
        marginBottom: 10,
        fontSize: 15,
    },
});
