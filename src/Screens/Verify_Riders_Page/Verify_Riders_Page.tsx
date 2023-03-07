import React, { FunctionComponent, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
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
import { Sign_Up_Identity_Data } from '../../Data/Sign_Up/Sign_Up_Identity';
import { FIREBASE_USERS_COLLECTION } from '@env';

const VerifyRidersPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [fullName, setFullName] = useState<string>('');
    const [phoneNo, setPhoneNo] = useState<string>('');
    const [guarantor, setGuarantor] = useState<string>('');
    const [idText, setIDText] = useState<string>('');
    const [ecText, setECText] = useState<string>('');
    const [rpText, setRPText] = useState<string>('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const on_verify_profile = async () => {
        if (
            fullName?.length > 0 &&
            phoneNo?.length > 0 &&
            guarantor?.length > 0
        ) {
            if (auth()?.currentUser?.email) {
                setShowSpinner(true);
                try {
                    firestore()
                        .collection(FIREBASE_USERS_COLLECTION)
                        .doc(auth()?.currentUser?.email as string)
                        .set({
                            fullName: fullName?.trim(),
                            phoneNo: phoneNo?.trim(),
                            guarantor: guarantor?.trim(),
                            accountType: Sign_Up_Identity_Data[1]?.value,
                        })
                        .then(() => {
                            setShowSpinner(false);
                            navigation.push(
                                'AppStack' as never,
                                {
                                    screen: 'HomePage',
                                } as never,
                            );
                        })
                        .catch(err => {
                            setShowSpinner(false);
                            error_handler({
                                navigation: navigation,
                                error_mssg:
                                    "An error occured while uploading User's information to the server.",
                                svr_error_mssg: err?.code as string,
                            });
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
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={Colors().Primary}
            />
            <OverlaySpinner
                showSpinner={showSpinner}
                setShowSpinner={setShowSpinner}
            />
            <ScrollView style={{ flex: 1 }}>
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
                    />
                    <Text style={[styles.v_r_input_text, { marginTop: 26 }]}>
                        Phone Number
                    </Text>
                    <BasicTextEntry
                        placeHolderText="08012345678"
                        inputValue={phoneNo}
                        setInputValue={setPhoneNo}
                    />
                    <Text style={[styles.v_r_input_text, { marginTop: 26 }]}>
                        Guarantor
                    </Text>
                    <BasicTextEntry
                        placeHolderText="No 1, Alagbaka, Akure, Ondo State."
                        inputValue={guarantor}
                        setInputValue={setGuarantor}
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
                        execFunc={() => on_verify_profile()}
                    />
                </View>
            </ScrollView>
        </View>
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
