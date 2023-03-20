import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Colors from '../../Colors/Colors';
import { fonts } from '../../Fonts/Fonts';
import DishedLogo from '../../Components/Dished_Logo/Dished_Logo';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import { useNavigation } from '@react-navigation/native';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import auth from '@react-native-firebase/auth';
import { email_checker } from '../../Utils/Email_Checker/Email_Checker';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { info_handler } from '../../Utils/Info_Handler/Info_Handler';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ForgotPasswordPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [email, setEmail] = useState<string>('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);

    const send_password_reset = () => {
        setDisableButton(false);
        if (email_checker(email)) {
            try {
                setShowSpinner(true);
                setDisableButton(true);
                setTimeout(async () => {
                    await auth()
                        ?.sendPasswordResetEmail(email)
                        .catch(err => {
                            setShowSpinner(false);
                            setDisableButton(false);
                            if (err) {
                                error_handler({
                                    navigation: navigation,
                                    error_mssg:
                                        'An error occured while trying to send a Password Reset link to your Email.',
                                    svr_error_mssg: err?.code,
                                });
                            }
                        })
                        .then(() => {
                            setShowSpinner(false);
                            setDisableButton(false);
                            info_handler({
                                navigation: navigation,
                                success_mssg:
                                    'A Reset Password Mail has been sent to your Email Address. Please visit the link to reset your password.',
                                proceed_type: 1,
                            });
                        });
                }, 500);
            } catch (err) {
                setShowSpinner(false);
                setDisableButton(false);
                error_handler({
                    navigation: navigation,
                    error_mssg:
                        'An error occured while trying to send a Password Reset link to your Email.',
                });
            }
        } else {
            setShowSpinner(false);
            setDisableButton(false);
            error_handler({
                navigation: navigation,
                error_mssg: 'Please, input a valid Email Address to proceed!',
            });
        }
    };

    return (
        <View style={styles.fp_main}>
            <CustomStatusBar
                barStyleLight={true}
                backgroundColor={Colors().Primary}
                backgroundDimColor={Colors().PrimaryDim}
                showSpinner={showSpinner}
            />
            <OverlaySpinner
                showSpinner={showSpinner}
                setShowSpinner={setShowSpinner}
            />
            <ScrollView>
                <View style={styles.top_cont}>
                    <Text style={styles.top_cont_txt}>Forgot Password</Text>
                </View>
                <View style={{ marginTop: 110 }}>
                    <DishedLogo />
                </View>
                <View style={styles.f_p_input_cont}>
                    <Text
                        style={[
                            styles.f_p_input_text,
                            { marginTop: 26, marginBottom: 5 },
                        ]}>
                        Email
                    </Text>
                    <BasicTextEntry
                        inputValue={email}
                        setInputValue={setEmail}
                        placeHolderText="johndoe@gmail.com"
                    />
                    <BasicButton
                        buttonText="Send Reset Link"
                        buttonHeight={52}
                        marginTop={40}
                        marginBottom={16}
                        disabled={disableButton}
                        execFunc={() => send_password_reset()}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default ForgotPasswordPage;

const styles = StyleSheet.create({
    fp_main: {
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
    f_p_input_cont: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 20,
    },
    f_p_input_text: {
        fontFamily: fonts.Poppins_700,
        fontSize: 16,
        lineHeight: 32,
        color: Colors().Black,
    },
});
