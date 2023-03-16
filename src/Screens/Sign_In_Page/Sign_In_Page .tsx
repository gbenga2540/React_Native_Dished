import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Colors from '../../Colors/Colors';
import { fonts } from '../../Fonts/Fonts';
import DishedLogo from '../../Components/Dished_Logo/Dished_Logo';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import SecureTextEntry from '../../Components/Secure_Text_Entry/Secure_Text_Entry';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import TextDivider from '../../Components/Text_Divider/Text_Divider';
import BasicLogoButton from '../../Components/Basic_Logo_Button/Basic_Logo_Button';
import TextButton from '../../Components/Text_Button/Text_Button';
import { useNavigation } from '@react-navigation/native';
import { email_checker } from '../../Utils/Email_Checker/Email_Checker';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import SInfo from 'react-native-sensitive-info';
import { SECURE_STORAGE_NAME, SECURE_STORAGE_USER_INFO } from '@env';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FIREBASE_USERS_COLLECTION } from '@env';
import storage from '@react-native-firebase/storage';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { phone_no_converter } from '../../Utils/Phone_No_Converter/Phone_No_Converter';
import { validate_phone_no } from '../../Utils/Validate_Phone_No/Validate_Phone_No';
import { Sign_Up_Type } from '../../Data/Sign_Up_Type/Sign_Up_Type';
import RNDropDown from '../../Components/RN_Drop_Down/RN_Drop_Down';
import { otp_page_type } from '../../Data/OTP_Page_Type/OTP_Page_Type';

const SignInPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [signUpType, setSignUpType] = useState<string>(
        Sign_Up_Type[0]?.value,
    );

    const verify_otp_page = ({
        userCredential,
    }: {
        userCredential: FirebaseAuthTypes.ConfirmationResult;
    }) => {
        navigation.navigate(
            'VerifyOTPPage' as never,
            {
                phone_auth: JSON.stringify(userCredential),
                page_type: otp_page_type?.sign_in,
            } as never,
        );
    };

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

    const sign_in_user = () => {
        if (email_checker(email)) {
            if (password) {
                setShowSpinner(true);
                setTimeout(async () => {
                    try {
                        await auth()
                            .signInWithEmailAndPassword(email?.trim(), password)
                            .catch(error => {
                                setShowSpinner(false);
                                if (error) {
                                    error_handler({
                                        navigation: navigation,
                                        error_mssg:
                                            'An error occured while trying to sign in!',
                                        svr_error_mssg: error?.code as string,
                                    });
                                }
                            })
                            .then(async userCredential => {
                                if (
                                    userCredential === undefined ||
                                    userCredential === null
                                ) {
                                    error_handler({
                                        navigation: navigation,
                                        error_mssg:
                                            'An error occured while trying to sign in!',
                                        svr_error_mssg:
                                            'Please check your Internet Connection!',
                                    });
                                } else {
                                    const user_data = {
                                        user_password: password,
                                    };
                                    try {
                                        await SInfo.setItem(
                                            SECURE_STORAGE_USER_INFO,
                                            JSON.stringify({ ...user_data }),
                                            {
                                                sharedPreferencesName:
                                                    SECURE_STORAGE_NAME,
                                                keychainService:
                                                    SECURE_STORAGE_NAME,
                                            },
                                        )
                                            .then(() => {
                                                check_user_info();
                                            })
                                            .catch(error => {
                                                if (error) {
                                                    check_user_info();
                                                }
                                            });
                                    } catch (error) {
                                        check_user_info();
                                    }
                                }
                            });
                    } catch (err) {
                        setShowSpinner(false);
                        error_handler({
                            navigation: navigation,
                            error_mssg:
                                'An error occured while trying to sign in!',
                        });
                    }
                }, 500);
            } else {
                error_handler({
                    navigation: navigation,
                    error_mssg: 'Password field cannot be empty!',
                });
            }
        } else if (email?.length > 8) {
            const phone_no = phone_no_converter({
                phone_no: email,
                country_code: '234',
            });
            if (validate_phone_no({ phone_no: phone_no })) {
                setShowSpinner(true);
                setTimeout(async () => {
                    try {
                        await auth()
                            ?.signInWithPhoneNumber(phone_no)
                            .catch(err => {
                                setShowSpinner(false);
                                if (err) {
                                    error_handler({
                                        navigation: navigation,
                                        error_mssg:
                                            'An error occured while trying to sign in User!',
                                        svr_error_mssg: err?.code as string,
                                    });
                                }
                            })
                            .then(async userCredential => {
                                if (
                                    userCredential === null ||
                                    userCredential === undefined
                                ) {
                                    setShowSpinner(false);
                                    error_handler({
                                        navigation: navigation,
                                        error_mssg:
                                            'An error occured while trying to sign in User!',
                                    });
                                } else {
                                    setShowSpinner(false);
                                    const user_data = {
                                        phone_number: phone_no,
                                    };
                                    try {
                                        await SInfo.setItem(
                                            SECURE_STORAGE_USER_INFO,
                                            JSON.stringify({ ...user_data }),
                                            {
                                                sharedPreferencesName:
                                                    SECURE_STORAGE_NAME,
                                                keychainService:
                                                    SECURE_STORAGE_NAME,
                                            },
                                        )
                                            .then(() => {
                                                setShowSpinner(false);
                                                verify_otp_page({
                                                    userCredential:
                                                        userCredential,
                                                });
                                            })
                                            .catch(error => {
                                                if (error) {
                                                    setShowSpinner(false);
                                                    verify_otp_page({
                                                        userCredential:
                                                            userCredential,
                                                    });
                                                }
                                            });
                                    } catch (err) {
                                        setShowSpinner(false);
                                        verify_otp_page({
                                            userCredential: userCredential,
                                        });
                                    }
                                }
                            })
                            .finally(() => {
                                setShowSpinner(false);
                            });
                    } catch (error) {
                        setShowSpinner(false);
                        error_handler({
                            navigation: navigation,
                            error_mssg:
                                'An error occured while trying to sign in User!',
                        });
                    }
                }, 500);
            } else {
                setShowSpinner(false);
                error_handler({
                    navigation: navigation,
                    error_mssg:
                        'Please, input a valid Mobile Number to proceed!',
                });
            }
        } else {
            error_handler({
                navigation: navigation,
                error_mssg: 'Please, input a valid Email Address!',
            });
        }
    };

    return (
        <View style={styles.signin_main}>
            <OverlaySpinner
                showSpinner={showSpinner}
                setShowSpinner={setShowSpinner}
            />
            <CustomStatusBar
                showSpinner={showSpinner}
                backgroundColor={Colors().Primary}
                backgroundDimColor={Colors().PrimaryDim}
                barStyleLight={true}
            />
            <ScrollView>
                <View style={styles.top_cont}>
                    <Text style={styles.top_cont_txt}>Sign In</Text>
                </View>
                <View style={{ marginTop: 110 }}>
                    <DishedLogo />
                </View>
                <View style={styles.s_m_input_cont}>
                    <Text style={[styles.s_m_input_text, { marginTop: 26 }]}>
                        Login with
                    </Text>
                    <RNDropDown
                        dropdownData={Sign_Up_Type}
                        value={signUpType}
                        setValue={setSignUpType}
                    />
                    <Text style={[styles.s_m_input_text, { marginTop: 26 }]}>
                        {signUpType === Sign_Up_Type[0]?.value
                            ? 'Email'
                            : 'Phone Number'}
                    </Text>
                    <BasicTextEntry
                        inputValue={email}
                        setInputValue={setEmail}
                        placeHolderText={
                            signUpType === Sign_Up_Type[0]?.value
                                ? 'johndoe@gmail.com'
                                : '08011223344'
                        }
                    />
                    {signUpType === Sign_Up_Type[0]?.value && (
                        <Text
                            style={[styles.s_m_input_text, { marginTop: 26 }]}>
                            Password
                        </Text>
                    )}
                    {signUpType === Sign_Up_Type[0]?.value && (
                        <SecureTextEntry
                            inputValue={password}
                            setInputValue={setPassword}
                        />
                    )}
                    <BasicButton
                        buttonText="Login"
                        buttonHeight={52}
                        marginTop={23}
                        marginBottom={
                            signUpType === Sign_Up_Type[0]?.value ? 16 : 32
                        }
                        execFunc={() => sign_in_user()}
                    />
                    {signUpType === Sign_Up_Type[0]?.value && (
                        <View style={styles.s_m_fp}>
                            <TextButton
                                buttonText="Forgot Password"
                                marginLeft={3}
                                textColor={Colors().InputText}
                                isFontLight={true}
                                execFunc={() =>
                                    navigation.navigate(
                                        'ForgotPasswordPage' as never,
                                    )
                                }
                            />
                        </View>
                    )}
                    <TextDivider text={'or'} marginBottom={0} />
                    <BasicLogoButton
                        logoName="Google"
                        inputText="Sign In with Google"
                        marginTop={15}
                        execFunc={() => console.log('google')}
                    />
                    <View style={styles.s_m_acc}>
                        <Text style={styles.s_m_acc_text}>New to Dished?</Text>
                        <TextButton
                            buttonText="Sign Up"
                            marginLeft={3}
                            execFunc={() =>
                                navigation.navigate<never>(
                                    'SignUpPage' as never,
                                )
                            }
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default SignInPage;

const styles = StyleSheet.create({
    signin_main: {
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
    s_m_input_text: {
        fontFamily: fonts.Poppins_700,
        fontSize: 16,
        lineHeight: 32,
        color: Colors().Black,
    },
    s_m_acc: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 35,
    },
    s_m_acc_text: {
        fontFamily: fonts.Poppins_400,
        color: Colors().InputTextGrey,
    },
    s_m_fp: {
        marginTop: 10,
        marginBottom: 10,
        marginRight: 'auto',
    },
});
