import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Keyboard,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { fonts } from '../../Configs/Fonts/Fonts';
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
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import SInfo from 'react-native-sensitive-info';
import {
    FIREBASE_USERS_COLLECTION,
    SECURE_STORAGE_NAME,
    SECURE_STORAGE_USER_INFO,
} from '@env';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const SignUpPage: FunctionComponent = () => {
    type ScrollViewRef = ScrollView & {
        flashScrollIndicators: () => void;
    };
    const scrollViewRef = useRef<ScrollViewRef | null>(null);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);
    const [disableNavButton, setDisableNavButton] = useState<boolean>(false);

    const verify_mail_page = () => {
        navigation.push('VerifyMailPage' as never);
    };

    const send_email_ver = async () => {
        try {
            await auth()
                .currentUser?.sendEmailVerification()
                .then(() => {
                    setShowSpinner(false);
                    setDisableButton(false);
                    verify_mail_page();
                })
                .catch(() => {
                    setShowSpinner(false);
                    setDisableButton(false);
                    verify_mail_page();
                });
        } catch (err) {
            setShowSpinner(false);
            setDisableButton(false);
            verify_mail_page();
        }
    };

    const on_get_started = async () => {
        if (email_checker(email)) {
            if (password?.length >= 6) {
                try {
                    let errorPresent: boolean = false;
                    setShowSpinner(true);
                    setDisableButton(true);
                    setTimeout(async () => {
                        await auth()
                            .createUserWithEmailAndPassword(
                                email?.trim(),
                                password,
                            )
                            .catch(error => {
                                errorPresent = true;
                                setShowSpinner(false);
                                setDisableButton(false);
                                error_handler({
                                    navigation: navigation,
                                    error_mssg:
                                        'An error occured while trying to register User!',
                                    svr_error_mssg: error?.code as string,
                                });
                            })
                            .then(async userCredential => {
                                if (!errorPresent) {
                                    if (
                                        userCredential === null ||
                                        userCredential === undefined
                                    ) {
                                        setShowSpinner(false);
                                        setDisableButton(false);
                                        error_handler({
                                            navigation: navigation,
                                            error_mssg:
                                                'An error occured while trying to register User!',
                                        });
                                    } else {
                                        const user_data = {
                                            user_password: password,
                                            google_auth: false,
                                        };
                                        try {
                                            await SInfo.setItem(
                                                SECURE_STORAGE_USER_INFO,
                                                JSON.stringify({
                                                    ...user_data,
                                                }),
                                                {
                                                    sharedPreferencesName:
                                                        SECURE_STORAGE_NAME,
                                                    keychainService:
                                                        SECURE_STORAGE_NAME,
                                                },
                                            )
                                                .then(() => {
                                                    send_email_ver();
                                                })
                                                .catch(error => {
                                                    if (error) {
                                                        send_email_ver();
                                                    }
                                                });
                                        } catch (err) {
                                            send_email_ver();
                                        }
                                    }
                                } else {
                                    setShowSpinner(false);
                                    setDisableButton(false);
                                }
                            })
                            .finally(() => {
                                setShowSpinner(false);
                                setDisableButton(false);
                            });
                    }, 500);
                } catch (err) {
                    setShowSpinner(false);
                    setDisableButton(false);
                    error_handler({
                        navigation: navigation,
                        error_mssg:
                            'An error occured while trying to register User!',
                    });
                }
            } else {
                setShowSpinner(false);
                setDisableButton(false);
                error_handler({
                    navigation: navigation,
                    error_mssg: 'Password must not be less than six!',
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

    const check_user_info = () => {
        let errorPresent: boolean = false;
        try {
            firestore()
                .collection(FIREBASE_USERS_COLLECTION)
                .doc(auth()?.currentUser?.uid as string)
                .get()
                .catch(err => {
                    errorPresent = true;
                    if (err) {
                        setShowSpinner(false);
                        setDisableButton(false);
                        error_handler({
                            navigation: navigation,
                            error_mssg:
                                "An Error occured while trying to verify User's Information on the Server.",
                            svr_error_mssg: err?.code as string,
                        });
                    }
                })
                .then(async info_res => {
                    if (!errorPresent) {
                        if (
                            info_res?.data() === undefined ||
                            info_res?.data() === null ||
                            info_res?.exists === false
                        ) {
                            setShowSpinner(false);
                            setDisableButton(false);
                            navigation.push('SelectProfilePage' as never);
                        } else {
                            const dp_ref = storage().ref(
                                `Users_Info/${
                                    auth().currentUser?.uid
                                }/Display_Picture/dp.jpeg`,
                            );
                            try {
                                let errorPresent2: boolean = false;
                                await dp_ref
                                    .getDownloadURL()
                                    .catch(err => {
                                        if (
                                            err &&
                                            (err?.code ===
                                                'storage/object-not-found' ||
                                                err?.code === 'storage/unknown')
                                        ) {
                                            setShowSpinner(false);
                                            setDisableButton(false);
                                        } else {
                                            errorPresent2 = true;
                                            setShowSpinner(false);
                                            setDisableButton(false);
                                            error_handler({
                                                navigation: navigation,
                                                error_mssg:
                                                    "An Error occured while trying to verify User's Information on the Server.",
                                                svr_error_mssg: err?.code,
                                            });
                                        }
                                    })
                                    .then(res => {
                                        if (!errorPresent2) {
                                            if (
                                                res === null ||
                                                res === undefined
                                            ) {
                                                setShowSpinner(false);
                                                setDisableButton(false);
                                                navigation.push(
                                                    'AuthStack' as never,
                                                    {
                                                        screen: 'SelectDPPage',
                                                    } as never,
                                                );
                                            } else {
                                                setShowSpinner(false);
                                                setDisableButton(false);
                                                navigation.push(
                                                    'HomeStack' as never,
                                                    {
                                                        screen: 'HomePage',
                                                    } as never,
                                                );
                                            }
                                        } else {
                                            setShowSpinner(false);
                                            setDisableButton(false);
                                        }
                                    });
                            } catch (error) {
                                setShowSpinner(false);
                                setDisableButton(false);
                                error_handler({
                                    navigation: navigation,
                                    error_mssg:
                                        "An Error occured while trying to verify User's Information on the Server.",
                                });
                            }
                        }
                    } else {
                        setShowSpinner(false);
                        setDisableButton(false);
                    }
                });
        } catch (error) {
            setShowSpinner(false);
            setDisableButton(false);
            error_handler({
                navigation: navigation,
                error_mssg:
                    "An Error occured while trying to verify User's Information on the Server.",
            });
        }
    };

    const sign_in_with_google = async () => {
        setShowSpinner(true);
        setDisableButton(true);
        try {
            let errorPresent: boolean = false;
            await GoogleSignin?.signIn()
                ?.catch(err => {
                    errorPresent = true;
                    setShowSpinner(false);
                    setDisableButton(false);
                    if (err) {
                        error_handler({
                            navigation: navigation,
                            error_mssg:
                                'An error occured while trying to sign in with Google.',
                            svr_error_mssg: err?.message,
                        });
                    }
                })
                .then(async res => {
                    if (!errorPresent) {
                        if (res) {
                            const googleCredential =
                                auth.GoogleAuthProvider.credential(
                                    res?.idToken as string,
                                );
                            try {
                                let errorPresent2: boolean = false;
                                await auth()
                                    .signInWithCredential(googleCredential)
                                    ?.catch(err => {
                                        errorPresent2 = true;
                                        setShowSpinner(false);
                                        setDisableButton(false);
                                        if (err) {
                                            error_handler({
                                                navigation: navigation,
                                                error_mssg:
                                                    'An error occured while trying to sign in with Google.',
                                                svr_error_mssg: err?.code,
                                            });
                                        }
                                    })
                                    .then(async userCredential => {
                                        if (!errorPresent2) {
                                            if (userCredential) {
                                                const user_data = {
                                                    google_auth: true,
                                                };
                                                try {
                                                    await SInfo.setItem(
                                                        SECURE_STORAGE_USER_INFO,
                                                        JSON.stringify({
                                                            ...user_data,
                                                        }),
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
                                                } catch (err) {
                                                    check_user_info();
                                                }
                                            } else {
                                                setShowSpinner(false);
                                                setDisableButton(false);
                                                error_handler({
                                                    navigation: navigation,
                                                    error_mssg:
                                                        'An error occured while trying to sign in with Google.',
                                                });
                                            }
                                        } else {
                                            setShowSpinner(false);
                                            setDisableButton(false);
                                        }
                                    });
                            } catch (error) {
                                setShowSpinner(false);
                                setDisableButton(false);
                                error_handler({
                                    navigation: navigation,
                                    error_mssg:
                                        'An error occured while trying to sign in with Google.',
                                });
                            }
                        } else {
                            setShowSpinner(false);
                            setDisableButton(false);
                            error_handler({
                                navigation: navigation,
                                error_mssg:
                                    'An error occured while trying to sign in with Google.',
                            });
                        }
                    } else {
                        setShowSpinner(false);
                        setDisableButton(false);
                    }
                });
        } catch (error) {
            setShowSpinner(false);
            setDisableButton(false);
            error_handler({
                navigation: navigation,
                error_mssg:
                    'An error occured while trying to sign in with Google.',
            });
        }
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                scrollViewRef.current?.scrollTo({
                    x: 0,
                    y: Platform.OS === 'ios' ? 150 : 170,
                    animated: true,
                });
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                scrollViewRef.current?.scrollTo({
                    x: 0,
                    y: 0,
                    animated: true,
                });
            },
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.signup_main}>
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
            <ScrollView
                style={{ flex: 1 }}
                ref={ref => (scrollViewRef.current = ref)}>
                <View style={styles.top_cont}>
                    <Text style={styles.top_cont_txt}>Sign up</Text>
                </View>
                <View style={{ marginTop: 110 }}>
                    <DishedLogo />
                </View>
                <View style={styles.s_m_input_cont}>
                    <Text style={[styles.s_m_input_text, { marginTop: 26 }]}>
                        Email
                    </Text>
                    <BasicTextEntry
                        inputValue={email}
                        setInputValue={setEmail}
                        placeHolderText="johndoe@gmail.com"
                        keyboardType="email-address"
                    />
                    <Text style={[styles.s_m_input_text, { marginTop: 20 }]}>
                        Password
                    </Text>
                    <SecureTextEntry
                        inputValue={password}
                        setInputValue={setPassword}
                        keyboardType="default"
                    />
                    <BasicButton
                        buttonText="Get Started"
                        buttonHeight={52}
                        marginTop={45}
                        disabled={disableButton}
                        marginBottom={16}
                        execFunc={() => on_get_started()}
                    />
                    <TextDivider text={'or'} />
                    <BasicLogoButton
                        logoName="Google"
                        inputText="Sign Up with Google"
                        marginTop={16}
                        disabled={disableButton}
                        execFunc={() => sign_in_with_google()}
                    />
                    <View style={styles.s_m_acc}>
                        <Text style={styles.s_m_acc_text}>
                            Already have an account?
                        </Text>
                        <TextButton
                            buttonText="Sign In"
                            marginLeft={3}
                            disabled={disableNavButton}
                            execFunc={() => {
                                setDisableNavButton(true);
                                navigation.navigate('SignInPage' as never);
                                setDisableNavButton(false);
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default SignUpPage;

const styles = StyleSheet.create({
    signup_main: {
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
        marginTop: 20,
    },
    s_m_acc_text: {
        fontFamily: fonts.Poppins_400,
        color: Colors().InputTextGrey,
    },
});
