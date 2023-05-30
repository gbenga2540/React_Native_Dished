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
import SecureTextEntry from '../../Components/Secure_Text_Entry/Secure_Text_Entry';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import SInfo from 'react-native-sensitive-info';
import { SECURE_STORAGE_NAME, SECURE_STORAGE_USER_INFO } from '@env';
import { info_handler } from '../../Utils/Info_Handler/Info_Handler';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ChangePasswordPage: FunctionComponent = () => {
    type ScrollViewRef = ScrollView & {
        flashScrollIndicators: () => void;
    };
    const scrollViewRef = useRef<ScrollViewRef | null>(null);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [newCPassword, setCNewPassword] = useState<string>('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);

    const change_password = () => {
        setDisableButton(false);
        if (oldPassword && newPassword && newCPassword) {
            if (newPassword?.length >= 6) {
                if (newPassword === newCPassword) {
                    if (auth()?.currentUser?.email) {
                        setShowSpinner(true);
                        setDisableButton(true);
                        setTimeout(async () => {
                            try {
                                let errorPresent: boolean = false;
                                await auth()
                                    .signInWithEmailAndPassword(
                                        auth()?.currentUser?.email as string,
                                        oldPassword,
                                    )
                                    .catch(error => {
                                        errorPresent = true;
                                        setShowSpinner(false);
                                        setDisableButton(false);
                                        if (error) {
                                            error_handler({
                                                navigation: navigation,
                                                error_mssg:
                                                    'An error occured while trying to verify User!',
                                                svr_error_mssg:
                                                    error?.code as string,
                                            });
                                        }
                                    })
                                    .then(async userCredential => {
                                        if (!errorPresent) {
                                            if (
                                                userCredential === undefined ||
                                                userCredential === null
                                            ) {
                                                setShowSpinner(false);
                                                setDisableButton(false);
                                                error_handler({
                                                    navigation: navigation,
                                                    error_mssg:
                                                        'An error occured while trying to verify User!',
                                                    svr_error_mssg:
                                                        'Please check your Internet Connection!',
                                                });
                                            } else {
                                                try {
                                                    let errorPresent2: boolean =
                                                        false;
                                                    await auth()
                                                        ?.currentUser?.updatePassword(
                                                            newPassword,
                                                        )
                                                        ?.catch(err => {
                                                            errorPresent2 =
                                                                true;
                                                            setShowSpinner(
                                                                false,
                                                            );
                                                            setDisableButton(
                                                                false,
                                                            );
                                                            if (err) {
                                                                error_handler({
                                                                    navigation:
                                                                        navigation,
                                                                    error_mssg:
                                                                        'An error occured while trying to change your Password!',
                                                                    svr_error_mssg:
                                                                        'Please check your Internet Connection!',
                                                                });
                                                            }
                                                        })
                                                        .then(async () => {
                                                            if (
                                                                !errorPresent2
                                                            ) {
                                                                const user_data =
                                                                    {
                                                                        user_password:
                                                                            newPassword,
                                                                        google_auth:
                                                                            false,
                                                                    };
                                                                try {
                                                                    await SInfo.setItem(
                                                                        SECURE_STORAGE_USER_INFO,
                                                                        JSON.stringify(
                                                                            {
                                                                                ...user_data,
                                                                            },
                                                                        ),
                                                                        {
                                                                            sharedPreferencesName:
                                                                                SECURE_STORAGE_NAME,
                                                                            keychainService:
                                                                                SECURE_STORAGE_NAME,
                                                                        },
                                                                    )
                                                                        .catch(
                                                                            error => {
                                                                                setShowSpinner(
                                                                                    false,
                                                                                );
                                                                                setDisableButton(
                                                                                    false,
                                                                                );
                                                                                if (
                                                                                    error
                                                                                ) {
                                                                                    error_handler(
                                                                                        {
                                                                                            navigation:
                                                                                                navigation,
                                                                                            error_mssg:
                                                                                                'An error occured, Please retry!',
                                                                                        },
                                                                                    );
                                                                                }
                                                                            },
                                                                        )
                                                                        .then(
                                                                            () => {
                                                                                setShowSpinner(
                                                                                    false,
                                                                                );
                                                                                setDisableButton(
                                                                                    false,
                                                                                );
                                                                                info_handler(
                                                                                    {
                                                                                        navigation:
                                                                                            navigation,
                                                                                        success_mssg:
                                                                                            'Password Changed Successfully!',
                                                                                        proceed_type: 2,
                                                                                    },
                                                                                );
                                                                            },
                                                                        );
                                                                } catch (error) {
                                                                    setShowSpinner(
                                                                        false,
                                                                    );
                                                                    setDisableButton(
                                                                        false,
                                                                    );
                                                                    error_handler(
                                                                        {
                                                                            navigation:
                                                                                navigation,
                                                                            error_mssg:
                                                                                'An error occured, Please retry!',
                                                                        },
                                                                    );
                                                                }
                                                            } else {
                                                                setShowSpinner(
                                                                    false,
                                                                );
                                                                setDisableButton(
                                                                    false,
                                                                );
                                                            }
                                                        });
                                                } catch (error) {
                                                    setShowSpinner(false);
                                                    setDisableButton(false);
                                                    error_handler({
                                                        navigation: navigation,
                                                        error_mssg:
                                                            'An error occured while trying to change your Password!',
                                                        svr_error_mssg:
                                                            'Please check your Internet Connection!',
                                                    });
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
                                    error_mssg:
                                        'An error occured while trying to verify User!',
                                });
                            }
                        }, 500);
                    } else {
                        setShowSpinner(false);
                        setDisableButton(false);
                        error_handler({
                            navigation: navigation,
                            error_mssg:
                                'No User is not logged in. Please proceed to the SignIn Page to login.',
                        });
                    }
                } else {
                    setShowSpinner(false);
                    setDisableButton(false);
                    error_handler({
                        navigation: navigation,
                        error_mssg:
                            'New Password and Confirm New Password Input do not match!',
                    });
                }
            } else {
                setShowSpinner(false);
                setDisableButton(false);
                error_handler({
                    navigation: navigation,
                    error_mssg: 'Password cannot be less than six (6).',
                });
            }
        } else {
            setShowSpinner(false);
            setDisableButton(false);
            error_handler({
                navigation: navigation,
                error_mssg: 'Some password fields are missing!',
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
            style={styles.cp_main}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <CustomStatusBar
                backgroundColor={Colors.Primary}
                backgroundDimColor={Colors.PrimaryDim}
                barStyleLight={true}
                showSpinner={showSpinner}
            />
            <OverlaySpinner
                showSpinner={showSpinner}
                setShowSpinner={setShowSpinner}
            />
            <ScrollView
                ref={ref => (scrollViewRef.current = ref)}
                style={{ flex: 1 }}>
                <View style={styles.top_cont}>
                    <Text style={styles.top_cont_txt}>Change Password</Text>
                </View>
                <View style={{ marginTop: 110 }}>
                    <DishedLogo />
                </View>
                <View style={styles.c_p_input_cont}>
                    <Text style={[styles.c_p_input_text, { marginTop: 26 }]}>
                        Old Password
                    </Text>
                    <SecureTextEntry
                        placeHolderText="Enter your Old Password"
                        inputValue={oldPassword}
                        setInputValue={setOldPassword}
                        keyboardType="default"
                    />
                    <Text style={[styles.c_p_input_text, { marginTop: 26 }]}>
                        New Password
                    </Text>
                    <SecureTextEntry
                        placeHolderText="Enter a New Password"
                        inputValue={newPassword}
                        setInputValue={setNewPassword}
                        keyboardType="default"
                    />
                    <Text style={[styles.c_p_input_text, { marginTop: 26 }]}>
                        Confirm New Password
                    </Text>
                    <SecureTextEntry
                        placeHolderText="Confirm Password"
                        inputValue={newCPassword}
                        setInputValue={setCNewPassword}
                        keyboardType="default"
                    />
                    <BasicButton
                        buttonText="Set New Password"
                        buttonHeight={52}
                        marginTop={30}
                        marginBottom={16}
                        execFunc={() => change_password()}
                        disabled={disableButton}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ChangePasswordPage;

const styles = StyleSheet.create({
    cp_main: {
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
    c_p_input_cont: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 20,
    },
    c_p_input_text: {
        fontFamily: fonts.Poppins_700,
        fontSize: 16,
        lineHeight: 32,
        color: Colors.Black,
    },
});
