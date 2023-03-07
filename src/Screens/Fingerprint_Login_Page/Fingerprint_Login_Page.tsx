import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import SecureTextEntry from '../../Components/Secure_Text_Entry/Secure_Text_Entry';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { fonts } from '../../Fonts/Fonts';
import Colors from '../../Colors/Colors';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SInfo from 'react-native-sensitive-info';
import { SECURE_STORAGE_NAME, SECURE_STORAGE_USER_INFO } from '@env';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import TextButton from '../../Components/Text_Button/Text_Button';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { FIREBASE_USERS_COLLECTION } from '@env';

const FingerprintLoginPage: FunctionComponent = () => {
    const rnBiometrics = useMemo(() => new ReactNativeBiometrics(), []);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [password, setPassword] = useState<string>('');
    const [isFPA, setIsFPA] = useState<boolean>(true);
    const [animState, setAnimState] = useState<string>('idle');
    const [render, setRender] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    interface userInfoProps {
        user_password: string;
    }
    const [userInfo, setUserInfo] = useState<userInfoProps>({
        user_password: '',
    });

    const check_user_info = () => {
        try {
            firestore()
                .collection(FIREBASE_USERS_COLLECTION)
                .doc(auth()?.currentUser?.email as string)
                .get()
                .catch(err => {
                    if (err) {
                        error_handler({
                            navigation: navigation,
                            error_mssg:
                                "An Error occures while trying to verify User's Information on the Server.",
                            svr_error_mssg: err?.code as string,
                        });
                    }
                })
                .then(info_res => {
                    if (
                        info_res?.data() === undefined ||
                        info_res?.data() === null ||
                        info_res?.exists === false
                    ) {
                        navigation.navigate('SelectProfilePage' as never);
                    } else {
                        navigation.push(
                            'AppStack' as never,
                            { screen: 'HomePage' } as never,
                        );
                    }
                });
        } catch (error) {
            error_handler({
                navigation: navigation,
                error_mssg:
                    "An Error occures while trying to verify User's Information on the Server.",
            });
        }
    };

    const manual_authenticate = () => {
        if (password) {
            if (auth()?.currentUser?.email) {
                setShowSpinner(true);
                setTimeout(async () => {
                    try {
                        await auth()
                            .signInWithEmailAndPassword(
                                auth()?.currentUser?.email as string,
                                password,
                            )
                            .then(userCredential => {
                                if (
                                    userCredential === undefined ||
                                    userCredential === null
                                ) {
                                    setShowSpinner(false);
                                    error_handler({
                                        navigation: navigation,
                                        error_mssg:
                                            'An error occured while trying to sign in!',
                                        svr_error_mssg:
                                            'Please check your Internet Connection!',
                                    });
                                } else {
                                    setShowSpinner(false);
                                    check_user_info();
                                }
                            })
                            .catch(error => {
                                setShowSpinner(false);
                                if (error) {
                                    error_handler({
                                        navigation: navigation,
                                        error_mssg: 'Unable to Sign In User!',
                                        svr_error_mssg: error?.code as string,
                                    });
                                }
                            });
                    } catch (err) {
                        setShowSpinner(false);
                        error_handler({
                            navigation: navigation,
                            error_mssg: 'Unable to Sign In User!',
                        });
                    }
                }, 500);
            } else {
                error_handler({
                    navigation: navigation,
                    error_mssg:
                        'Unable to retrieve User Information, Please manually sign in into your Account.',
                });
            }
        } else {
            error_handler({
                navigation: navigation,
                error_mssg: 'Password field cannot be empty!',
            });
        }
    };

    const fingerprint_authenticate = async () => {
        if (auth()?.currentUser?.email && userInfo?.user_password) {
            setShowSpinner(true);
            setTimeout(async () => {
                try {
                    auth()
                        .signInWithEmailAndPassword(
                            auth()?.currentUser?.email as string,
                            userInfo?.user_password,
                        )
                        .then(userCredential => {
                            if (
                                userCredential === null ||
                                userCredential === undefined
                            ) {
                                setShowSpinner(false);
                                error_handler({
                                    navigation: navigation,
                                    error_mssg:
                                        'An error occured while trying to sign in!',
                                    svr_error_mssg:
                                        'Please check your Internet Connection!',
                                });
                            } else {
                                setShowSpinner(false);
                                check_user_info();
                            }
                        })
                        .catch(error => {
                            setShowSpinner(false);
                            if (error) {
                                error_handler({
                                    navigation: navigation,
                                    error_mssg: 'Unable to Sign In User!',
                                    svr_error_mssg: error?.code as string,
                                });
                            }
                        });
                } catch (err) {
                    setShowSpinner(false);
                    error_handler({
                        navigation: navigation,
                        error_mssg: 'Unable to Sign In User!',
                    });
                }
            }, 500);
        } else {
            error_handler({
                navigation: navigation,
                error_mssg: 'Unable to retrieve User Information.',
            });
        }
    };

    const biometric_login = async () => {
        const prompt_biometrics = async () => {
            await rnBiometrics
                .simplePrompt({
                    promptMessage: 'Scan to Login',
                })
                .then(res => {
                    if (res.success) {
                        setAnimState('success');
                    }
                    if (res.error && res.error !== 'User cancellation') {
                        setAnimState('failed');
                    }
                })
                .catch(err => {
                    if (err) {
                        setAnimState('failed');
                    }
                });
        };

        const { available, biometryType } =
            await rnBiometrics.isSensorAvailable();

        if (Platform.OS === 'ios') {
            if (available && biometryType === BiometryTypes.TouchID) {
                setIsFPA(true);
                prompt_biometrics();
            } else {
                setIsFPA(false);
            }
        }
        if (Platform.OS === 'android') {
            if (available && biometryType === BiometryTypes.Biometrics) {
                setIsFPA(true);
                prompt_biometrics();
            } else {
                setIsFPA(false);
            }
        }
    };

    useEffect(() => {
        setAnimState('idle');
        setShowSpinner(false);
        setRender(false);

        const get_user_info = async () => {
            try {
                await SInfo.getItem(SECURE_STORAGE_USER_INFO, {
                    sharedPreferencesName: SECURE_STORAGE_NAME,
                    keychainService: SECURE_STORAGE_NAME,
                })
                    .then(async res => {
                        if (res === null || res === undefined) {
                            navigation.navigate('SignUpPage' as never);
                        } else {
                            const json_res = JSON.parse(res);
                            setUserInfo({ ...json_res });
                            setRender(true);
                        }
                    })
                    .catch(err => {
                        if (err) {
                            navigation.navigate('SignUpPage' as never);
                        }
                    });
            } catch (error) {
                navigation.navigate('SignUpPage' as never);
            }
        };

        const is_biometrics_available = async () => {
            const { available, biometryType } =
                await rnBiometrics.isSensorAvailable();

            if (
                Platform.OS === 'ios' &&
                available &&
                biometryType === BiometryTypes.TouchID
            ) {
                setIsFPA(true);
            } else {
                setIsFPA(false);
            }

            if (
                Platform.OS === 'android' &&
                available &&
                biometryType === BiometryTypes.Biometrics
            ) {
                setIsFPA(true);
            } else {
                setIsFPA(false);
            }
            get_user_info();
        };

        is_biometrics_available();
    }, [rnBiometrics, navigation]);

    if (render) {
        return (
            <View style={styles.flp_main}>
                <OverlaySpinner
                    showSpinner={showSpinner}
                    setShowSpinner={setShowSpinner}
                />
                <ScrollView style={{ flex: 1 }}>
                    <StatusBar
                        barStyle={'dark-content'}
                        backgroundColor={Colors().Background}
                    />
                    <View style={styles.flp_main_cont}>
                        <Text style={styles.f_m_txt1}>Welcome Back!</Text>
                        <Text style={styles.f_m_txt2}>
                            Use{' '}
                            {Platform.OS === 'ios' ? 'Touch ID' : 'Fingerprint'}{' '}
                            to sign in into your Dished account
                        </Text>

                        <TouchableOpacity
                            style={{
                                width: 200,
                                height: 200,
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignSelf: 'center',
                            }}
                            disabled={!isFPA}
                            activeOpacity={0.65}
                            onPress={() => biometric_login()}>
                            {animState === 'idle' && (
                                <LottieView
                                    style={{
                                        transform: [{ scale: 0.93 }],
                                        minWidth: 200,
                                        minHeight: 200,
                                        maxWidth: 200,
                                        maxHeight: 200,
                                        position: 'relative',
                                        alignSelf: 'center',
                                    }}
                                    source={require('../../Animations/Fingerprint_Idle.json')}
                                    autoPlay
                                    loop={isFPA}
                                    resizeMode="cover"
                                />
                            )}
                            {animState === 'failed' && (
                                <LottieView
                                    style={{
                                        transform: [{ scale: 1 }],
                                        minWidth: 200,
                                        minHeight: 200,
                                        maxWidth: 200,
                                        maxHeight: 200,
                                        position: 'relative',
                                        alignSelf: 'center',
                                    }}
                                    source={require('../../Animations/Fingerprint_Failed.json')}
                                    autoPlay
                                    loop={false}
                                    resizeMode="cover"
                                    speed={1.7}
                                />
                            )}
                            {animState === 'success' && (
                                <LottieView
                                    style={{
                                        transform: [{ scale: 0.87 }],
                                        minWidth: 200,
                                        minHeight: 200,
                                        maxWidth: 200,
                                        maxHeight: 200,
                                        position: 'relative',
                                        alignSelf: 'center',
                                    }}
                                    source={require('../../Animations/Fingerprint_Verified.json')}
                                    autoPlay
                                    loop={false}
                                    onAnimationFinish={() =>
                                        fingerprint_authenticate()
                                    }
                                    resizeMode="cover"
                                />
                            )}
                        </TouchableOpacity>

                        {!isFPA && (
                            <Text style={styles.f_m_fpc}>
                                {Platform.OS === 'ios'
                                    ? 'Touch ID is not available!'
                                    : 'Fingerprint is not available!'}
                            </Text>
                        )}
                        {isFPA && animState === 'idle' && (
                            <Text style={[styles.f_m_fpc, { color: 'green' }]}>
                                Click the Icon above to prompt the
                                {Platform.OS === 'ios'
                                    ? ' Touch ID'
                                    : ' Fingerprint'}{' '}
                                sensor.
                            </Text>
                        )}
                        {isFPA && animState === 'failed' && (
                            <Text style={styles.f_m_fpc}>
                                Please input your password instead!
                            </Text>
                        )}
                        <Text style={styles.f_m_txt3}>
                            Or just use password instead
                        </Text>
                        <SecureTextEntry
                            placeHolderText="Enter your password"
                            inputValue={password}
                            setInputValue={setPassword}
                        />
                        <BasicButton
                            execFunc={() => manual_authenticate()}
                            buttonText="Login"
                            buttonHeight={55}
                            marginTop={15}
                            marginBottom={10}
                        />
                        <View style={styles.f_m_acc}>
                            <Text style={styles.f_m_acc_text}>
                                Login with another Account?
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
    } else {
        return null;
    }
};

export default FingerprintLoginPage;

const styles = StyleSheet.create({
    flp_main: {
        flex: 1,
        backgroundColor: Colors().Background,
    },
    flp_main_cont: {
        marginHorizontal: 21,
    },
    f_m_txt1: {
        fontFamily: fonts.Poppins_700,
        fontSize: 32,
        marginTop: Platform.OS === 'ios' ? 100 : 80,
        marginBottom: 5,
        color: Colors().Black,
    },
    f_m_txt2: {
        fontFamily: fonts.Poppins_400,
        fontSize: 18,
        color: '#979797',
        width: 240,
        marginBottom: 40,
    },
    f_m_txt3: {
        fontFamily: fonts.Poppins_400,
        fontSize: 16,
        marginTop: 80,
        marginBottom: 8,
        color: Colors().InputText,
    },
    f_m_fpc: {
        alignSelf: 'center',
        zIndex: 5,
        color: 'red',
        fontFamily: fonts.Poppins_400,
        marginTop: 4,
        fontSize: 16,
        width: 200,
        textAlign: 'center',
    },
    f_m_acc: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    f_m_acc_text: {
        fontFamily: fonts.Poppins_400,
        color: Colors().InputTextGrey,
    },
});
