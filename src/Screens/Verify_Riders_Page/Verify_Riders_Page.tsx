import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Keyboard,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import Colors from '../../Colors/Colors';
import { fonts } from '../../Fonts/Fonts';
import DishedLogo from '../../Components/Dished_Logo/Dished_Logo';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import TextWithButton from '../../Components/Text_With_Button/Text_With_Button';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { Sign_Up_Identity_Data } from '../../Data/Sign_Up_Identity/Sign_Up_Identity';
import { FIREBASE_USERS_COLLECTION } from '@env';
import storage from '@react-native-firebase/storage';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { phone_no_converter } from '../../Utils/Phone_No_Converter/Phone_No_Converter';
import { validate_phone_no } from '../../Utils/Validate_Phone_No/Validate_Phone_No';
import { set_user_name } from '../../Redux/Actions/User_Info/User_Info_Actions';
import { useDispatch } from 'react-redux';

const VerifyRidersPage: FunctionComponent = () => {
    type ScrollViewRef = ScrollView & {
        flashScrollIndicators: () => void;
    };
    const scrollViewRef = useRef<ScrollViewRef | null>(null);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const dispatch = useDispatch();

    const [fullName, setFullName] = useState<string>('');
    const [phoneNo, setPhoneNo] = useState<string>('');
    const [guarantor, setGuarantor] = useState<string>('');
    const [idText, setIDText] = useState<string>('');
    const [ecText, setECText] = useState<string>('');
    const [rpText, setRPText] = useState<string>('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);

    const on_verify_profile = async () => {
        if (
            fullName?.length > 0 &&
            phoneNo?.length > 0 &&
            guarantor?.length > 0
        ) {
            const new_phone_no = phone_no_converter({
                phone_no: phoneNo,
                country_code: '234',
            });
            if (validate_phone_no({ phone_no: new_phone_no })) {
                if (auth()?.currentUser?.uid) {
                    setShowSpinner(true);
                    setDisableButton(true);
                    try {
                        firestore()
                            .collection(FIREBASE_USERS_COLLECTION)
                            .doc(auth()?.currentUser?.uid as string)
                            .set({
                                fullName: fullName?.trim(),
                                phoneNo: new_phone_no?.trim(),
                                guarantor: guarantor?.trim(),
                                accountType: Sign_Up_Identity_Data[1]?.value,
                            })
                            .catch(err => {
                                setShowSpinner(false);
                                setDisableButton(false);
                                error_handler({
                                    navigation: navigation,
                                    error_mssg:
                                        "An error occured while uploading User's information to the server.",
                                    svr_error_mssg: err?.code as string,
                                });
                            })
                            .then(async () => {
                                dispatch(
                                    set_user_name({
                                        user_name: fullName,
                                    }),
                                );
                                if (auth()?.currentUser?.uid) {
                                    const dp_ref = storage().ref(
                                        `Users_Info/${
                                            auth().currentUser?.uid
                                        }/Display_Picture/dp.jpeg`,
                                    );
                                    try {
                                        let checkError: boolean = false;
                                        await dp_ref
                                            .getDownloadURL()
                                            .catch(err => {
                                                checkError = true;
                                                if (
                                                    err &&
                                                    (err?.code ===
                                                        'storage/object-not-found' ||
                                                        err?.code ===
                                                            'storage/unknown')
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
                                                    error_handler({
                                                        navigation: navigation,
                                                        error_mssg:
                                                            "An Error occured while trying to verify User's Information on the Server.",
                                                        svr_error_mssg:
                                                            err?.code,
                                                    });
                                                }
                                            })
                                            .then(res => {
                                                if (!checkError) {
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
                                } else {
                                    setShowSpinner(false);
                                    setDisableButton(false);
                                    navigation.navigate('SignInPage' as never);
                                }
                            });
                    } catch (error) {
                        setShowSpinner(false);
                        setDisableButton(false);
                        error_handler({
                            navigation: navigation,
                            error_mssg:
                                "An error occured while uploading User's information to the server.",
                        });
                    }
                } else {
                    setShowSpinner(false);
                    setDisableButton(false);
                    navigation.navigate('SignInPage' as never);
                }
            } else {
                setShowSpinner(false);
                setDisableButton(false);
                error_handler({
                    navigation: navigation,
                    error_mssg: 'Invalid Phone Number!',
                });
            }
        } else {
            setShowSpinner(false);
            setDisableButton(false);
            error_handler({
                navigation: navigation,
                error_mssg:
                    'Some fields are empty! \nPlease fill all the fields with the appropraite information.',
            });
        }
    };

    useEffect(() => {
        setShowSpinner(false);
        setDisableButton(false);
        if (!auth()?.currentUser?.email) {
            navigation.navigate('SignInPage' as never);
        }
    }, [navigation]);

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
            style={styles.vr_main}>
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
                    <Text style={styles.top_cont_txt}>Complete Profile</Text>
                </View>
                <View style={{ marginTop: 110 }}>
                    <DishedLogo />
                </View>
                <View style={styles.v_r_input_cont}>
                    <Text style={[styles.v_r_input_text, { marginTop: 26 }]}>
                        Full Name
                    </Text>
                    <BasicTextEntry
                        placeHolderText="John Doe"
                        inputValue={fullName}
                        setInputValue={setFullName}
                        keyboardType="default"
                    />
                    <Text style={[styles.v_r_input_text, { marginTop: 26 }]}>
                        Phone Number
                    </Text>
                    <BasicTextEntry
                        placeHolderText="08012345678"
                        inputValue={phoneNo}
                        setInputValue={setPhoneNo}
                        keyboardType="numbers-and-punctuation"
                    />
                    <Text style={[styles.v_r_input_text, { marginTop: 26 }]}>
                        Guarantor
                    </Text>
                    <BasicTextEntry
                        placeHolderText="No 1, Alagbaka, Akure, Ondo State."
                        inputValue={guarantor}
                        setInputValue={setGuarantor}
                        keyboardType="default"
                    />
                    <Text style={[styles.v_r_input_text, { marginTop: 26 }]}>
                        ID
                    </Text>
                    <TextWithButton
                        placeHolderText="Upload ID"
                        inputValue={idText}
                        setInputValue={setIDText}
                        execFunc={() => console.log('uploading ID')}
                    />
                    <Text style={[styles.v_r_input_text, { marginTop: 26 }]}>
                        Employment Contract
                    </Text>
                    <TextWithButton
                        placeHolderText="Upload Employment Contract"
                        inputValue={ecText}
                        setInputValue={setECText}
                        execFunc={() =>
                            console.log('uploading Employment Contract')
                        }
                    />
                    <Text style={[styles.v_r_input_text, { marginTop: 26 }]}>
                        Registration Papers
                    </Text>
                    <TextWithButton
                        placeHolderText="Upload Registration Papers"
                        inputValue={rpText}
                        setInputValue={setRPText}
                        execFunc={() =>
                            console.log('uploading Registration Papers')
                        }
                    />
                    <BasicButton
                        buttonText="Verify"
                        buttonHeight={52}
                        marginTop={23}
                        marginBottom={16}
                        disabled={disableButton}
                        execFunc={() => on_verify_profile()}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default VerifyRidersPage;

const styles = StyleSheet.create({
    vr_main: {
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
    v_r_input_cont: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 20,
    },
    v_r_input_text: {
        fontFamily: fonts.Poppins_700,
        fontSize: 16,
        lineHeight: 32,
        color: Colors().Black,
    },
});
