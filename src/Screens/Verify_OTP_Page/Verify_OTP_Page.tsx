import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, LogBox } from 'react-native';
import Colors from '../../Colors/Colors';
import { fonts } from '../../Fonts/Fonts';
import OTPTextView from 'react-native-otp-textinput';
import DishedLogo from '../../Components/Dished_Logo/Dished_Logo';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { otp_page_type } from '../../Data/OTP_Page_Type/OTP_Page_Type';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FIREBASE_USERS_COLLECTION } from '@env';

const VerifyOTPPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute<RouteProp<any>>();

    const phoneAuth: string | null = route?.params?.phone_auth as string | null;
    const p_phoneAuth: FirebaseAuthTypes.ConfirmationResult = JSON.parse(
        phoneAuth as string,
    );

    const OTP_Page_Type: string = route?.params?.page_type;

    const [OTP, setOTP] = useState<string>('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const check_user_info = () => {
        try {
            firestore()
                .collection(FIREBASE_USERS_COLLECTION)
                .doc(auth()?.currentUser?.uid as string)
                .get()
                .catch(err => {
                    if (err) {
                        setShowSpinner(false);
                        error_handler({
                            navigation: navigation,
                            error_mssg:
                                "An Error occured while trying to verify User's Information on the Server.",
                            svr_error_mssg: err?.code as string,
                        });
                    }
                })
                .then(async info_res => {
                    if (
                        info_res?.data() === undefined ||
                        info_res?.data() === null ||
                        info_res?.exists === false
                    ) {
                        setShowSpinner(false);
                        navigation.navigate('SelectProfilePage' as never);
                    } else {
                        const dp_ref = storage().ref(
                            `Users_Display_Picture/${
                                auth().currentUser?.uid
                            }/dp.jpeg`,
                        );
                        try {
                            let checkError: boolean = false;
                            await dp_ref
                                .getDownloadURL()
                                .catch(err => {
                                    if (
                                        err &&
                                        err?.code === 'storage/object-not-found'
                                    ) {
                                        setShowSpinner(false);
                                    } else {
                                        checkError = true;
                                        setShowSpinner(false);
                                        error_handler({
                                            navigation: navigation,
                                            error_mssg:
                                                "An Error occured while trying to verify User's Information on the Server.",
                                            svr_error_mssg: err?.code,
                                        });
                                    }
                                })
                                .then(res => {
                                    if (!checkError) {
                                        if (res === null || res === undefined) {
                                            setShowSpinner(false);
                                            navigation.push(
                                                'AuthStack' as never,
                                                {
                                                    screen: 'SelectDPPage',
                                                } as never,
                                            );
                                        } else {
                                            setShowSpinner(false);
                                            navigation.push(
                                                'HomeStack' as never,
                                                { screen: 'HomePage' } as never,
                                            );
                                        }
                                    } else {
                                        setShowSpinner(false);
                                    }
                                });
                        } catch (error) {
                            setShowSpinner(false);
                            error_handler({
                                navigation: navigation,
                                error_mssg:
                                    "An Error occured while trying to verify User's Information on the Server.",
                            });
                        }
                    }
                });
        } catch (error) {
            setShowSpinner(false);
            error_handler({
                navigation: navigation,
                error_mssg:
                    "An Error occured while trying to verify User's Information on the Server.",
            });
        }
    };

    const verify_otp = () => {
        if (OTP?.length === 6) {
            if (p_phoneAuth === null) {
                error_handler({
                    navigation: navigation,
                    error_mssg:
                        'An error occured while trying to verify user. Verification Information Missing!!!',
                });
            } else {
                if (OTP_Page_Type === otp_page_type?.sign_in) {
                    setShowSpinner(true);
                    try {
                        setTimeout(async () => {
                            console.log(p_phoneAuth?.verificationId);
                            const credential =
                                auth.PhoneAuthProvider.credential(
                                    p_phoneAuth?.verificationId === undefined
                                        ? //@ts-ignore
                                          p_phoneAuth?._verificationId
                                        : p_phoneAuth?.verificationId,
                                    OTP,
                                );
                            auth()
                                ?.signInWithCredential(credential)
                                .catch(err => {
                                    setShowSpinner(false);
                                    error_handler({
                                        navigation: navigation,
                                        error_mssg:
                                            'An Error occured while trying to sign in User.',
                                        svr_error_mssg: err?.code,
                                    });
                                })
                                .then(userCredential => {
                                    if (
                                        userCredential === null ||
                                        userCredential === undefined
                                    ) {
                                        setShowSpinner(false);
                                        error_handler({
                                            navigation: navigation,
                                            error_mssg:
                                                'An Error occured while trying to sign in User.',
                                        });
                                    } else {
                                        check_user_info();
                                    }
                                });
                        }, 500);
                    } catch (err) {
                        setShowSpinner(false);
                        error_handler({
                            navigation: navigation,
                            error_mssg:
                                'An Error occured while trying to sign in User.',
                        });
                    }
                } else if (OTP_Page_Type === otp_page_type?.sign_up) {
                    setShowSpinner(true);
                    try {
                        setTimeout(async () => {
                            await p_phoneAuth
                                ?.confirm(OTP)
                                .catch(err => {
                                    setShowSpinner(false);
                                    error_handler({
                                        navigation: navigation,
                                        error_mssg:
                                            'An Error occured while trying to verify Mobile Number.',
                                        svr_error_mssg: err?.code,
                                    });
                                })
                                .then(userCredential => {
                                    if (
                                        userCredential === null ||
                                        userCredential === undefined
                                    ) {
                                        setShowSpinner(false);
                                        error_handler({
                                            navigation: navigation,
                                            error_mssg:
                                                'An Error occured while trying to verify Mobile Number.',
                                        });
                                    } else {
                                        setShowSpinner(false);
                                        navigation.navigate(
                                            'SelectProfilePage' as never,
                                        );
                                    }
                                });
                        }, 500);
                    } catch (err) {
                        setShowSpinner(false);
                        error_handler({
                            navigation: navigation,
                            error_mssg:
                                'An Error occured while trying to verify Mobile Number.',
                        });
                    }
                }
            }
        } else {
            error_handler({
                navigation: navigation,
                error_mssg: 'Incorrect One-Time-Password (OTP).',
            });
        }
    };

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    return (
        <View style={styles.verify_otp_main}>
            <CustomStatusBar
                barStyleLight={true}
                backgroundColor={Colors().Primary}
                backgroundDimColor={Colors().PrimaryDim}
            />
            <OverlaySpinner
                showSpinner={showSpinner}
                setShowSpinner={setShowSpinner}
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
                        'Please input the One-Time-Password (OTP) sent to your Mobile Number.'
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
                <View style={styles.s_m_input_cont}>
                    <BasicButton
                        buttonText="Verify"
                        buttonHeight={52}
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
