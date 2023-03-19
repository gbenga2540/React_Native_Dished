import React, { FunctionComponent, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Colors from '../../Colors/Colors';
import { fonts } from '../../Fonts/Fonts';
import DishedLogo from '../../Components/Dished_Logo/Dished_Logo';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FIREBASE_USERS_COLLECTION } from '@env';
import { Sign_Up_Identity_Data } from '../../Data/Sign_Up_Identity/Sign_Up_Identity';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { phone_no_converter } from '../../Utils/Phone_No_Converter/Phone_No_Converter';
import { validate_phone_no } from '../../Utils/Validate_Phone_No/Validate_Phone_No';

const VerifyConsumerPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [fullName, setFullName] = useState<string>('');
    const [phoneNo, setPhoneNo] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const on_verify_profile = async () => {
        if (
            fullName?.length > 0 &&
            phoneNo?.length > 0 &&
            address?.length > 0
        ) {
            const new_phone_no = phone_no_converter({
                phone_no: phoneNo,
                country_code: '234',
            });
            if (validate_phone_no({ phone_no: new_phone_no })) {
                if (auth()?.currentUser?.uid) {
                    setShowSpinner(true);
                    try {
                        firestore()
                            .collection(FIREBASE_USERS_COLLECTION)
                            .doc(auth()?.currentUser?.uid as string)
                            .set({
                                fullName: fullName?.trim(),
                                phoneNo: new_phone_no?.trim(),
                                address: address?.trim(),
                                accountType: Sign_Up_Identity_Data[0]?.value,
                            })
                            .catch(err => {
                                setShowSpinner(false);
                                error_handler({
                                    navigation: navigation,
                                    error_mssg:
                                        "An error occured while uploading User's information to the server.",
                                    svr_error_mssg: err?.code as string,
                                });
                            })
                            .then(async () => {
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
                                                    navigation.push(
                                                        'AuthStack' as never,
                                                        {
                                                            screen: 'SelectDPPage',
                                                        } as never,
                                                    );
                                                } else {
                                                    setShowSpinner(false);
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
                                                            {
                                                                screen: 'HomePage',
                                                            } as never,
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
                                } else {
                                    setShowSpinner(false);
                                    navigation.push('SignInPage' as never);
                                }
                            });
                    } catch (error) {
                        setShowSpinner(false);
                        error_handler({
                            navigation: navigation,
                            error_mssg:
                                "An error occured while uploading User's information to the server.",
                        });
                    }
                } else {
                    navigation.push('SignInPage' as never);
                }
            } else {
                setShowSpinner(false);
                error_handler({
                    navigation: navigation,
                    error_mssg: 'Invalid Phone Number!',
                });
            }
        } else {
            setShowSpinner(false);
            error_handler({
                navigation: navigation,
                error_mssg:
                    'Some fields are empty! \nPlease fill all the fields with the appropraite information.',
            });
        }
    };

    useEffect(() => {
        if (!auth()?.currentUser?.email) {
            navigation.push('SignInPage' as never);
        }
    }, [navigation]);

    return (
        <View style={styles.vr_main}>
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
                    <Text style={styles.top_cont_txt}>Complete Profile</Text>
                </View>
                <View style={{ marginTop: 110 }}>
                    <DishedLogo />
                </View>
                <View style={styles.v_c_input_cont}>
                    <Text style={[styles.v_c_input_text, { marginTop: 26 }]}>
                        Full Name
                    </Text>
                    <BasicTextEntry
                        placeHolderText="John Doe"
                        inputValue={fullName}
                        setInputValue={setFullName}
                    />
                    <Text style={[styles.v_c_input_text, { marginTop: 26 }]}>
                        Phone Number
                    </Text>
                    <BasicTextEntry
                        placeHolderText="08101234567"
                        inputValue={phoneNo}
                        setInputValue={setPhoneNo}
                    />
                    <Text style={[styles.v_c_input_text, { marginTop: 26 }]}>
                        Address
                    </Text>
                    <BasicTextEntry
                        placeHolderText="No 1, Alagbaka, Akure, Ondo State."
                        inputValue={address}
                        setInputValue={setAddress}
                    />
                    <BasicButton
                        buttonText="Verify"
                        buttonHeight={52}
                        marginTop={23}
                        marginBottom={16}
                        execFunc={() => on_verify_profile()}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default VerifyConsumerPage;

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
    v_c_input_cont: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 20,
    },
    v_c_input_text: {
        fontFamily: fonts.Poppins_700,
        fontSize: 16,
        lineHeight: 32,
        color: Colors().Black,
    },
});
