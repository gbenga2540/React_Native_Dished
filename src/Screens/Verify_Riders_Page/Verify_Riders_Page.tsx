import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import Colors from '../../Colors/Colors';
import { fonts } from '../../Fonts/Fonts';

import DishedLogo from '../../Components/Dished_Logo/Dished_Logo';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import TextWithButton from '../../Components/Text_With_Button/Text_With_Button';

const VerifyRidersPage: FunctionComponent = () => {
    const [fullName, setFullName] = useState<string>('');
    const [phoneNo, setPhoneNo] = useState<string>('');
    const [guarantor, setGuarantor] = useState<string>('');

    // Text_With_Buttons Controllers
    const [idText, setIDText] = useState<string>('');
    const [ecText, setECText] = useState<string>('');
    const [rpText, setRPText] = useState<string>('');

    return (
        <View style={styles.vr_main}>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={Colors().Primary}
            />
            <ScrollView>
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
                        execFunc={() => console.log('Verify')}
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
    },
});
