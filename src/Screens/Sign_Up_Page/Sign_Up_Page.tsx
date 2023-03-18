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
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { email_checker } from '../../Utils/Email_Checker/Email_Checker';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import SInfo from 'react-native-sensitive-info';
import { SECURE_STORAGE_NAME, SECURE_STORAGE_USER_INFO } from '@env';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const SignUpPage: FunctionComponent = () => {
    const navigation = useNavigation<NavigationProp<any>>();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const verify_mail_page = () => {
        navigation.navigate('VerifyMailPage' as never);
    };

    const send_email_ver = async () => {
        try {
            await auth()
                .currentUser?.sendEmailVerification()
                .then(() => {
                    setShowSpinner(false);
                    verify_mail_page();
                })
                .catch(() => {
                    setShowSpinner(false);
                    verify_mail_page();
                });
        } catch (err) {
            setShowSpinner(false);
            verify_mail_page();
        }
    };

    const on_get_started = async () => {
        if (email_checker(email)) {
            if (password?.length >= 6) {
                try {
                    let checkError: boolean = false;
                    setShowSpinner(true);
                    setTimeout(async () => {
                        await auth()
                            .createUserWithEmailAndPassword(
                                email?.trim(),
                                password,
                            )
                            .catch(error => {
                                checkError = true;
                                setShowSpinner(false);
                                error_handler({
                                    navigation: navigation,
                                    error_mssg:
                                        'An error occured while trying to register User!',
                                    svr_error_mssg: error?.code as string,
                                });
                            })
                            .then(async userCredential => {
                                if (!checkError) {
                                    if (
                                        userCredential === null ||
                                        userCredential === undefined
                                    ) {
                                        setShowSpinner(false);
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
                                }
                            })
                            .finally(() => {
                                setShowSpinner(false);
                            });
                    }, 500);
                } catch (err) {
                    setShowSpinner(false);
                    error_handler({
                        navigation: navigation,
                        error_mssg:
                            'An error occured while trying to register User!',
                    });
                }
            } else {
                error_handler({
                    navigation: navigation,
                    error_mssg: 'Password must not be less than six!',
                });
            }
        } else {
            error_handler({
                navigation: navigation,
                error_mssg:
                    'Please, input a valid Email Address or Mobile Number to proceed!',
            });
        }
    };

    const sign_in_with_google = async () => {
        setShowSpinner(true);
        try {
            let checkError: boolean = false;
            await GoogleSignin?.signIn()
                ?.catch(err => {
                    checkError = true;
                    setShowSpinner(false);
                    if (err) {
                        console.log(err.message);
                        error_handler({
                            navigation: navigation,
                            error_mssg:
                                'An error occured while trying to sign in with Google.',
                            svr_error_mssg: err?.message,
                        });
                    }
                })
                .then(async res => {
                    console.log('res', res);
                    if (!checkError) {
                        if (res) {
                            setShowSpinner(true);
                            const googleCredential =
                                auth.GoogleAuthProvider.credential(
                                    res?.idToken as string,
                                );
                            try {
                                let checkError2: boolean = false;
                                await auth()
                                    .signInWithCredential(googleCredential)
                                    ?.catch(err => {
                                        checkError2 = true;
                                        setShowSpinner(false);
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
                                        if (!checkError2) {
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
                                                            setShowSpinner(
                                                                false,
                                                            );
                                                            navigation.navigate(
                                                                'SelectProfilePage' as never,
                                                            );
                                                        })
                                                        .catch(error => {
                                                            if (error) {
                                                                setShowSpinner(
                                                                    false,
                                                                );
                                                            }
                                                            navigation.navigate(
                                                                'SelectProfilePage' as never,
                                                            );
                                                        });
                                                } catch (err) {
                                                    setShowSpinner(false);
                                                    navigation.navigate(
                                                        'SelectProfilePage' as never,
                                                    );
                                                }
                                            } else {
                                                setShowSpinner(false);
                                                error_handler({
                                                    navigation: navigation,
                                                    error_mssg:
                                                        'An error occured while trying to sign in with Google.',
                                                });
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
                                        'An error occured while trying to sign in with Google.',
                                });
                            }
                        } else {
                            setShowSpinner(false);
                            error_handler({
                                navigation: navigation,
                                error_mssg:
                                    'An error occured while trying to sign in with Google.',
                            });
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
                    'An error occured while trying to sign in with Google.',
            });
        }
    };

    return (
        <View style={styles.signup_main}>
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
                    />
                    <Text style={[styles.s_m_input_text, { marginTop: 20 }]}>
                        Password
                    </Text>
                    <SecureTextEntry
                        inputValue={password}
                        setInputValue={setPassword}
                    />
                    <BasicButton
                        buttonText="Get Started"
                        buttonHeight={52}
                        marginTop={45}
                        marginBottom={16}
                        execFunc={() => on_get_started()}
                    />
                    <TextDivider text={'or'} />
                    <BasicLogoButton
                        logoName="Google"
                        inputText="Sign Up with Google"
                        marginTop={16}
                        execFunc={() => sign_in_with_google()}
                    />
                    <View style={styles.s_m_acc}>
                        <Text style={styles.s_m_acc_text}>
                            Already have an account?
                        </Text>
                        <TextButton
                            buttonText="Sign In"
                            marginLeft={3}
                            execFunc={() =>
                                navigation.navigate<never>(
                                    'SignInPage' as never,
                                )
                            }
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
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
