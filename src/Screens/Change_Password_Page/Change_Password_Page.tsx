import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import Colors from '../../Colors/Colors';
import { fonts } from '../../Fonts/Fonts';

import DishedLogo from '../../Components/Dished_Logo/Dished_Logo';
import SecureTextEntry from '../../Components/Secure_Text_Entry/Secure_Text_Entry';
import BasicButton from '../../Components/Basic_Button/Basic_Button';

const ChangePasswordPage: FunctionComponent = () => {
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [newCPassword, setCNewPassword] = useState<string>('');

    return (
        <View style={styles.cp_main}>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={Colors().Primary}
            />
            <ScrollView>
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
                    />
                    <Text style={[styles.c_p_input_text, { marginTop: 26 }]}>
                        New Password
                    </Text>
                    <SecureTextEntry
                        placeHolderText="Enter a New Password"
                        inputValue={newPassword}
                        setInputValue={setNewPassword}
                    />
                    <Text style={[styles.c_p_input_text, { marginTop: 26 }]}>
                        Confirm New Password
                    </Text>
                    <SecureTextEntry
                        placeHolderText="Confirm Password"
                        inputValue={newCPassword}
                        setInputValue={setCNewPassword}
                    />
                    <BasicButton
                        buttonText="Set New Password"
                        buttonHeight={52}
                        marginTop={23}
                        marginBottom={16}
                        execFunc={() => console.log('Set New Password')}
                    />
                </View>
            </ScrollView>
        </View>
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
    c_p_input_cont: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 20,
    },
    c_p_input_text: {
        fontFamily: fonts.Poppins_700,
        fontSize: 16,
        lineHeight: 32,
    },
});
