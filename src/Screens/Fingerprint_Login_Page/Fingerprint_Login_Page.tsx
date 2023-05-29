import React, { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View, Platform, TouchableOpacity, ScrollView, KeyboardAvoidingView, Keyboard } from 'react-native';
import SecureTextEntry from '../../Components/Secure_Text_Entry/Secure_Text_Entry';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { fonts } from '../../Configs/Fonts/Fonts';
import Colors from '../../Configs/Colors/Colors';
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
import { Sign_Up_Identity_Data } from '../../Data/Sign_Up_Identity/Sign_Up_Identity';
import { analyze_first_name } from '../../Utils/Analyze_First_Name/Analyze_First_Name';
import storage from '@react-native-firebase/storage';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import BasicLogoButton from '../../Components/Basic_Logo_Button/Basic_Logo_Button';
import TextDivider from '../../Components/Text_Divider/Text_Divider';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const FingerprintLoginPage: FunctionComponent = () => {
        type ScrollViewRef = ScrollView & {
                flashScrollIndicators: () => void;
        };
        const scrollViewRef = useRef<ScrollViewRef | null>(null);
        const rnBiometrics = useMemo(() => new ReactNativeBiometrics(), []);
        const navigation = useNavigation<NativeStackNavigationProp<any>>();

        const [welcomeText, setWelcomeText] = useState<string>('Welcome Back!');
        const [password, setPassword] = useState<string>('');
        const [isFPA, setIsFPA] = useState<boolean>(true);
        const [animState, setAnimState] = useState<string>('idle');
        const [render, setRender] = useState<boolean>(false);
        const [showSpinner, setShowSpinner] = useState<boolean>(false);
        const [disableButton, setDisableButton] = useState<boolean>(false);
        const [disableLoginButton, setDisableLoginButton] = useState<boolean>(false);
        interface userInfoProps {
                user_password: string;
                google_auth: boolean | undefined;
        }
        const [userInfo, setUserInfo] = useState<userInfoProps>({
                user_password: '',
                google_auth: undefined,
        });

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
                                                        error_mssg: "An Error occured while trying to verify User's Information on the Server.",
                                                        svr_error_mssg: err?.code as string,
                                                });
                                        }
                                })
                                .then(async info_res => {
                                        if (!errorPresent) {
                                                if (info_res?.data() === undefined || info_res?.data() === null || info_res?.exists === false) {
                                                        setShowSpinner(false);
                                                        setDisableButton(false);
                                                        navigation.push('SelectProfilePage' as never);
                                                } else {
                                                        const dp_ref = storage().ref(`Users_Info/${auth().currentUser?.uid}/Display_Picture/dp.jpeg`);
                                                        let errorPresent2: boolean = false;
                                                        try {
                                                                await dp_ref
                                                                        ?.getDownloadURL()
                                                                        .catch(err => {
                                                                                if (err && (err?.code === 'storage/object-not-found' || err?.code === 'storage/unknown')) {
                                                                                        setShowSpinner(false);
                                                                                        setDisableButton(false);
                                                                                } else {
                                                                                        errorPresent2 = true;
                                                                                        setShowSpinner(false);
                                                                                        setDisableButton(false);
                                                                                        error_handler({
                                                                                                navigation: navigation,
                                                                                                error_mssg: "An Error occured while trying to verify User's Information on the Server.",
                                                                                                svr_error_mssg: err?.code,
                                                                                        });
                                                                                }
                                                                        })
                                                                        .then(res => {
                                                                                if (!errorPresent2) {
                                                                                        if (res === null || res === undefined) {
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
                                                                        error_mssg: "An Error occured while trying to verify User's Information on the Server.",
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
                                error_mssg: "An Error occured while trying to verify User's Information on the Server.",
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
                                                        error_mssg: 'An error occured while trying to sign in with Google.',
                                                        svr_error_mssg: err?.code,
                                                });
                                        }
                                })
                                .then(async res => {
                                        if (!errorPresent) {
                                                if (res) {
                                                        setShowSpinner(true);
                                                        setDisableButton(false);
                                                        const googleCredential = auth.GoogleAuthProvider.credential(res?.idToken as string);
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
                                                                                                error_mssg: 'An error occured while trying to sign in with Google.',
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
                                                                                                                        sharedPreferencesName: SECURE_STORAGE_NAME,
                                                                                                                        keychainService: SECURE_STORAGE_NAME,
                                                                                                                },
                                                                                                        )
                                                                                                                .then(() => {
                                                                                                                        setAnimState('idle');
                                                                                                                        check_user_info();
                                                                                                                })
                                                                                                                .catch(error => {
                                                                                                                        if (error) {
                                                                                                                                setAnimState('idle');
                                                                                                                                check_user_info();
                                                                                                                        }
                                                                                                                });
                                                                                                } catch (err) {
                                                                                                        setAnimState('idle');
                                                                                                        check_user_info();
                                                                                                }
                                                                                        } else {
                                                                                                setShowSpinner(false);
                                                                                                setDisableButton(false);
                                                                                                error_handler({
                                                                                                        navigation: navigation,
                                                                                                        error_mssg: 'An error occured while trying to sign in with Google.',
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
                                                                        error_mssg: 'An error occured while trying to sign in with Google.',
                                                                });
                                                        }
                                                } else {
                                                        setShowSpinner(false);
                                                        setDisableButton(false);
                                                        error_handler({
                                                                navigation: navigation,
                                                                error_mssg: 'An error occured while trying to sign in with Google.',
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
                                error_mssg: 'An error occured while trying to sign in with Google.',
                        });
                }
        };

        const manual_authenticate = () => {
                if (userInfo?.google_auth === true) {
                        setShowSpinner(false);
                        setDisableButton(false);
                        error_handler({
                                navigation: navigation,
                                error_mssg: "Google Auth was used to Sign In. Please use the fingerprint to login or use the 'Sign in with Google' button below to proceed.",
                        });
                } else {
                        if (password) {
                                if (auth()?.currentUser?.email) {
                                        setShowSpinner(true);
                                        setDisableButton(true);
                                        setTimeout(async () => {
                                                let errorPresent: boolean = false;
                                                try {
                                                        await auth()
                                                                .signInWithEmailAndPassword(auth()?.currentUser?.email as string, password)
                                                                .catch(error => {
                                                                        errorPresent = true;
                                                                        setShowSpinner(false);
                                                                        setDisableButton(false);
                                                                        if (error) {
                                                                                error_handler({
                                                                                        navigation: navigation,
                                                                                        error_mssg: 'Unable to Sign In User!',
                                                                                        svr_error_mssg: error?.code as string,
                                                                                });
                                                                        }
                                                                })
                                                                .then(async userCredential => {
                                                                        if (!errorPresent) {
                                                                                if (userCredential === undefined || userCredential === null) {
                                                                                        setShowSpinner(false);
                                                                                        setDisableButton(false);
                                                                                        error_handler({
                                                                                                navigation: navigation,
                                                                                                error_mssg: 'An error occured while trying to sign in!',
                                                                                                svr_error_mssg: 'Please check your Internet Connection!',
                                                                                        });
                                                                                } else {
                                                                                        const user_data = {
                                                                                                user_password: password,
                                                                                        };
                                                                                        try {
                                                                                                await SInfo.setItem(
                                                                                                        SECURE_STORAGE_USER_INFO,
                                                                                                        JSON.stringify({
                                                                                                                ...user_data,
                                                                                                        }),
                                                                                                        {
                                                                                                                sharedPreferencesName: SECURE_STORAGE_NAME,
                                                                                                                keychainService: SECURE_STORAGE_NAME,
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
                                                                        } else {
                                                                                setShowSpinner(false);
                                                                                setDisableButton(false);
                                                                        }
                                                                });
                                                } catch (err) {
                                                        setShowSpinner(false);
                                                        setDisableButton(false);
                                                        error_handler({
                                                                navigation: navigation,
                                                                error_mssg: 'Unable to Sign In User!',
                                                        });
                                                }
                                        }, 500);
                                } else {
                                        setShowSpinner(false);
                                        setDisableButton(false);
                                        error_handler({
                                                navigation: navigation,
                                                error_mssg: 'Unable to retrieve User Information, Please manually sign in into your Account.',
                                        });
                                }
                        } else {
                                setShowSpinner(false);
                                setDisableButton(false);
                                error_handler({
                                        navigation: navigation,
                                        error_mssg: 'Password field cannot be empty!',
                                });
                        }
                }
        };

        const fingerprint_authenticate = async () => {
                if (userInfo?.google_auth !== undefined && userInfo?.google_auth === false) {
                        if (auth()?.currentUser?.email && userInfo?.user_password) {
                                setShowSpinner(true);
                                setDisableButton(true);
                                setTimeout(async () => {
                                        let errorPresent: boolean = false;
                                        try {
                                                auth()
                                                        .signInWithEmailAndPassword(auth()?.currentUser?.email as string, userInfo?.user_password)
                                                        .catch(error => {
                                                                errorPresent = true;
                                                                setAnimState('idle');
                                                                setShowSpinner(false);
                                                                setDisableButton(false);
                                                                if (error) {
                                                                        error_handler({
                                                                                navigation: navigation,
                                                                                error_mssg: 'Unable to Sign In User!',
                                                                                svr_error_mssg: error?.code as string,
                                                                        });
                                                                }
                                                        })
                                                        .then(userCredential => {
                                                                if (!errorPresent) {
                                                                        if (userCredential === null || userCredential === undefined) {
                                                                                setAnimState('idle');
                                                                                setShowSpinner(false);
                                                                                setDisableButton(false);
                                                                                error_handler({
                                                                                        navigation: navigation,
                                                                                        error_mssg: 'An error occured while trying to sign in!',
                                                                                        svr_error_mssg: 'Please check your Internet Connection!',
                                                                                });
                                                                        } else {
                                                                                setAnimState('idle');
                                                                                check_user_info();
                                                                        }
                                                                } else {
                                                                        setAnimState('idle');
                                                                        setShowSpinner(false);
                                                                        setDisableButton(false);
                                                                }
                                                        });
                                        } catch (err) {
                                                setShowSpinner(false);
                                                setDisableButton(false);
                                                setAnimState('idle');
                                                error_handler({
                                                        navigation: navigation,
                                                        error_mssg: 'Unable to Sign In User!',
                                                });
                                        }
                                }, 500);
                        } else {
                                setShowSpinner(false);
                                setDisableButton(false);
                                setAnimState('idle');
                                error_handler({
                                        navigation: navigation,
                                        error_mssg: 'Unable to retrieve User Information.',
                                });
                        }
                } else {
                        sign_in_with_google();
                }
        };

        const biometric_login = async () => {
                setShowSpinner(false);
                setDisableButton(false);
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
                                                setTimeout(() => {
                                                        setAnimState('idle');
                                                }, 3000);
                                        }
                                })
                                .catch(err => {
                                        if (err) {
                                                setAnimState('failed');
                                                setTimeout(() => {
                                                        setAnimState('idle');
                                                }, 3000);
                                        }
                                });
                };

                const { available, biometryType } = await rnBiometrics.isSensorAvailable();

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
                const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
                        scrollViewRef.current?.scrollTo({
                                x: 0,
                                y: Platform.OS === 'ios' ? 150 : 170,
                                animated: true,
                        });
                });
                const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
                        scrollViewRef.current?.scrollTo({
                                x: 0,
                                y: 0,
                                animated: true,
                        });
                });

                return () => {
                        keyboardDidHideListener.remove();
                        keyboardDidShowListener.remove();
                };
        }, []);

        useEffect(() => {
                setAnimState('idle');
                setShowSpinner(false);
                setDisableButton(false);
                setDisableLoginButton(false);
                setRender(false);

                const get_user_name_from_svr = () => {
                        setRender(true);
                        if (auth().currentUser?.uid) {
                                try {
                                        firestore()
                                                .collection(FIREBASE_USERS_COLLECTION)
                                                .doc(auth().currentUser?.uid as string)
                                                .get()
                                                .then(user_info => {
                                                        if (
                                                                // Consumer
                                                                user_info.data()?.accountType === Sign_Up_Identity_Data[0]?.value
                                                        ) {
                                                                setWelcomeText(
                                                                        `Hello ${analyze_first_name({
                                                                                name: user_info.data()?.fullName as string,
                                                                        })}`,
                                                                );
                                                        } else if (
                                                                // Dispatch Rider
                                                                user_info.data()?.accountType === Sign_Up_Identity_Data[1]?.value
                                                        ) {
                                                                setWelcomeText(
                                                                        `Hello ${analyze_first_name({
                                                                                name: user_info.data()?.fullName as string,
                                                                        })}`,
                                                                );
                                                        } else if (
                                                                // Restaurant
                                                                user_info.data()?.accountType === Sign_Up_Identity_Data[2]?.value
                                                        ) {
                                                                setWelcomeText('Hello Restaurant');
                                                        } else {
                                                                setWelcomeText('Welcome Back!');
                                                        }
                                                });
                                } catch (error) {
                                        setRender(true);
                                }
                        }
                };

                const get_user_info = async () => {
                        let errorPresent: boolean = false;
                        try {
                                await SInfo.getItem(SECURE_STORAGE_USER_INFO, {
                                        sharedPreferencesName: SECURE_STORAGE_NAME,
                                        keychainService: SECURE_STORAGE_NAME,
                                })
                                        .catch(err => {
                                                errorPresent = true;
                                                if (err) {
                                                        get_user_name_from_svr();
                                                }
                                        })
                                        .then(async res => {
                                                if (!errorPresent) {
                                                        if (res) {
                                                                const json_res = JSON.parse(res);
                                                                setUserInfo({ ...json_res });
                                                                get_user_name_from_svr();
                                                        } else {
                                                                if (auth().currentUser?.email) {
                                                                        get_user_name_from_svr();
                                                                } else {
                                                                        navigation.navigate('SignUpPage' as never);
                                                                }
                                                        }
                                                }
                                        });
                        } catch (error) {
                                get_user_name_from_svr();
                        }
                };

                const is_biometrics_available = async () => {
                        const { available, biometryType } = await rnBiometrics.isSensorAvailable();

                        if (Platform.OS === 'ios' && available && biometryType === BiometryTypes.TouchID) {
                                setIsFPA(true);
                        } else {
                                setIsFPA(false);
                        }

                        if (Platform.OS === 'android' && available && biometryType === BiometryTypes.Biometrics) {
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
                        <KeyboardAvoidingView style={styles.flp_main} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                                <CustomStatusBar showSpinner={showSpinner} />
                                <OverlaySpinner showSpinner={showSpinner} setShowSpinner={setShowSpinner} />
                                <ScrollView style={styles.flp_main} ref={ref => (scrollViewRef.current = ref)}>
                                        <View style={{ flex: 1 }}>
                                                <View style={styles.flp_main_cont}>
                                                        <Text style={styles.f_m_txt1}>{welcomeText}</Text>
                                                        <Text style={styles.f_m_txt2}>Use {Platform.OS === 'ios' ? 'Touch ID' : 'Fingerprint'} to sign in into your Dished account</Text>
                                                        <TouchableOpacity
                                                                style={{
                                                                        width: 200,
                                                                        minWidth: 200,
                                                                        maxWidth: 200,
                                                                        height: 200,
                                                                        minHeight: 200,
                                                                        maxHeight: 200,
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
                                                                                source={require('../../Animations/Fingerprint_Success.json')}
                                                                                autoPlay
                                                                                loop={false}
                                                                                onAnimationFinish={() => fingerprint_authenticate()}
                                                                                resizeMode="cover"
                                                                        />
                                                                )}
                                                        </TouchableOpacity>
                                                        {!isFPA && <Text style={styles.f_m_fpc}>{Platform.OS === 'ios' ? 'Touch ID is not available!' : 'Fingerprint is not available!'}</Text>}
                                                        {isFPA && animState === 'idle' && (
                                                                <Text style={[styles.f_m_fpc, { color: Colors.InputText }]}>
                                                                        Click the Icon above to prompt the
                                                                        {Platform.OS === 'ios' ? ' Touch ID' : ' Fingerprint'} sensor.
                                                                </Text>
                                                        )}
                                                        {isFPA && animState === 'failed' && <Text style={styles.f_m_fpc}>Please input your password instead!</Text>}
                                                        {isFPA && animState === 'success' && <Text style={[styles.f_m_fpc, { color: 'green' }]}>Authenticating...</Text>}
                                                        {!userInfo?.google_auth && (
                                                                <View
                                                                        style={{
                                                                                height: 275,
                                                                                minHeight: 275,
                                                                                maxHeight: 275,
                                                                        }}>
                                                                        <Text style={styles.f_m_txt3}>Or just use password instead</Text>
                                                                        <SecureTextEntry placeHolderText={'Enter your password'} inputValue={password} setInputValue={setPassword} keyboardType="default" />
                                                                        <View style={styles.f_m_fp}>
                                                                                <TextButton buttonText="Forgot Password" marginLeft={3} textColor={Colors.InputText} isFontLight={true} disabled={disableButton} execFunc={() => navigation.push('ForgotPasswordPage' as never)} />
                                                                        </View>
                                                                        <BasicButton execFunc={() => manual_authenticate()} buttonText="Login" buttonHeight={55} marginTop={10} disabled={disableButton} marginBottom={10} />
                                                                </View>
                                                        )}
                                                        <View
                                                                style={{
                                                                        flex: 1,
                                                                        marginBottom: 10,
                                                                        marginTop: userInfo?.google_auth ? 60 : 0,
                                                                }}>
                                                                <TextDivider text={'or'} marginBottom={0} />
                                                        </View>
                                                        <BasicLogoButton logoName="Google" inputText="Sign In with Google" marginTop={userInfo?.google_auth ? 1 : 0} marginBottom={5} disabled={disableButton} execFunc={() => sign_in_with_google()} />
                                                        <View style={styles.f_m_acc}>
                                                                <Text style={styles.f_m_acc_text}>Login with another Account?</Text>
                                                                <TextButton
                                                                        buttonText="Sign In"
                                                                        marginTop={0}
                                                                        marginLeft={3}
                                                                        disabled={disableLoginButton}
                                                                        execFunc={() => {
                                                                                setDisableLoginButton(true);
                                                                                navigation.push('SignInPage' as never);
                                                                                setDisableLoginButton(false);
                                                                        }}
                                                                />
                                                        </View>
                                                </View>
                                        </View>
                                </ScrollView>
                        </KeyboardAvoidingView>
                );
        } else {
                return null;
        }
};

export default FingerprintLoginPage;

const styles = StyleSheet.create({
        flp_main: {
                flex: 1,
                backgroundColor: Colors.Background,
        },
        flp_main_cont: {
                marginHorizontal: 21,
        },
        f_m_txt1: {
                fontFamily: fonts.Poppins_700,
                fontSize: 32,
                marginTop: Platform.OS === 'ios' ? 100 : 50,
                marginBottom: 5,
                color: Colors.Black,
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
                marginTop: 50,
                marginBottom: 8,
                color: Colors.InputText,
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
                height: 50,
                minHeight: 50,
                maxHeight: 50,
        },
        f_m_acc: {
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                marginBottom: 30,
        },
        f_m_acc_text: {
                fontFamily: fonts.Poppins_400,
                color: Colors.InputTextGrey,
        },
        f_m_fp: {
                marginTop: 20,
                marginBottom: 0,
                marginLeft: 'auto',
        },
});
