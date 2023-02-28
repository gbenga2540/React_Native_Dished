import React, { FunctionComponent, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import SecureTextEntry from '../../Components/Secure_Text_Entry/Secure_Text_Entry';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { fonts } from '../../Fonts/Fonts';
import Colors from '../../Colors/Colors';

const FingerprintLoginPage: FunctionComponent = () => {
    const [password, setPassword] = useState<string>('');

    const authenticate = () => {
        console.log('authenticated');
    };

    return (
        <ScrollView style={styles.flp_main}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={Colors().Background}
            />
            <View style={styles.flp_main_cont}>
                <Text style={styles.f_m_txt1}>Hello Restaurant</Text>
                <Text style={styles.f_m_txt2}>
                    Use Touch ID to sign in into your Dished account
                </Text>

                <View
                    style={{
                        width: 180,
                        height: 180,
                        backgroundColor: 'red',
                        alignSelf: 'center',
                        borderRadius: 7,
                    }}>
                    {''}
                </View>

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
                    marginTop={30}
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
        marginTop: 100,
        marginBottom: 5,
    },
    f_m_txt2: {
        fontFamily: fonts.Poppins_400,
        fontSize: 18,
        color: '#979797',
        width: 250,
        marginBottom: 110,
    },
    f_m_txt3: {
        fontFamily: fonts.Poppins_400,
        fontSize: 16,
        marginTop: 110,
        marginBottom: 8,
    },
});
