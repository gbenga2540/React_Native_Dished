import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity,
} from 'react-native';
import SecureTextEntry from '../../Components/Secure_Text_Entry/Secure_Text_Entry';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { fonts } from '../../Fonts/Fonts';
import Colors from '../../Colors/Colors';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import LottieView from 'lottie-react-native';

const FingerprintLoginPage: FunctionComponent = () => {
    const rnBiometrics = useMemo(() => new ReactNativeBiometrics(), []);

    const [password, setPassword] = useState<string>('');
    const [isFPA, setIsFPA] = useState<boolean>(true);
    const [animState, setAnimState] = useState<string>('idle');

    const authenticate = () => {
        // authentication code
        console.log('authenticated');
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
        } else if (Platform.OS === 'android') {
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
        };
        is_biometrics_available();
    }, [rnBiometrics]);

    return (
        <ScrollView style={styles.flp_main}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={Colors().Background}
            />
            <View style={styles.flp_main_cont}>
                <Text style={styles.f_m_txt1}>Hello Restaurant</Text>
                <Text style={styles.f_m_txt2}>
                    Use {Platform.OS === 'ios' ? 'Touch ID' : 'Fingerprint'} to
                    sign in into your Dished account
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
                            onAnimationFinish={() => authenticate()}
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
                {isFPA && animState === 'success' && (
                    <Text style={[styles.f_m_fpc, { color: 'green' }]}>
                        Authenticating...
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
                    execFunc={() => password === '123' && authenticate()}
                    buttonText="Login"
                    buttonHeight={55}
                    marginTop={15}
                />
            </View>
        </ScrollView>
    );
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
});
