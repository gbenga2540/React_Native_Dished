import React, { FunctionComponent, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import Colors from '../../Colors/Colors';
import { fonts } from '../../Fonts/Fonts';
import DishedLogo from '../../Components/Dished_Logo/Dished_Logo';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { fireb_db } from '../../Configs/Firebase/Firebase';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { doc, setDoc } from 'firebase/firestore';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SInfo from 'react-native-sensitive-info';
import { SECURE_STORAGE_NAME, SECURE_STORAGE_USER_INFO } from '@env';
import { Sign_Up_Identity_Data } from '../../Data/Sign_Up/Sign_Up_Identity';

const VerifyConsumerPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [fullName, setFullName] = useState<string>('');
    const [phoneNo, setPhoneNo] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    interface userInfoProps {
        email: string;
        password: string;
        uid: string;
    }
    const [userInfo, setUserInfo] = useState<userInfoProps>({
        email: '',
        password: '',
        uid: '',
    });

    const on_verify = async () => {
        if (
            fullName?.length > 0 &&
            phoneNo?.length > 0 &&
            address?.length > 0
        ) {
            setShowSpinner(true);
            try {
                await setDoc(doc(fireb_db, 'Users', userInfo?.email), {
                    fullName: fullName?.trim(),
                    phoneNo: phoneNo?.trim(),
                    address: address?.trim(),
                    accountType: Sign_Up_Identity_Data[0]?.value,
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
                    .catch(error => {
                        setShowSpinner(false);
                        error_handler({
                            navigation: navigation,
                            error_mssg:
                                'An error occured while uploading user info to the server.',
                            svr_error_mssg: error?.code as string,
                        });
                    });
            } catch (error) {
                setShowSpinner(false);
                error_handler({
                    navigation: navigation,
                    error_mssg:
                        'An error occured while uploading user info to the server.',
                });
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
        const get_user_data = async () => {
            await SInfo.getItem(SECURE_STORAGE_USER_INFO, {
                sharedPreferencesName: SECURE_STORAGE_NAME,
                keychainService: SECURE_STORAGE_NAME,
            })
                .then(async res => {
                    if (res !== null || res !== undefined) {
                        const json_res = JSON.parse(res);
                        setUserInfo({ ...json_res });
                    } else {
                        navigation.navigate('SignUpPage' as never);
                    }
                })
                .catch(error => {
                    if (error) {
                        navigation.navigate('SignUpPage' as never);
                    }
                });
        };
        get_user_data();
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
                        execFunc={() => on_verify()}
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
