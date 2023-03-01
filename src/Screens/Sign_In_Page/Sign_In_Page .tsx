import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import Colors from '../../Colors/Colors';
import { fonts } from '../../Fonts/Fonts';

import DishedLogo from '../../Components/Dished_Logo/Dished_Logo';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import SecureTextEntry from '../../Components/Secure_Text_Entry/Secure_Text_Entry';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import TextDivider from '../../Components/Text_Divider/Text_Divider';
import BasicLogoButton from '../../Components/Basic_Logo_Button/Basic_Logo_Button';
import TextButton from '../../Components/Text_Button/Text_Button';
import { useNavigation } from '@react-navigation/native';

const SignInPage: FunctionComponent = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigation = useNavigation();

    return (
        <View style={styles.signin_main}>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={Colors().Primary}
            />
            <ScrollView>
                <View style={styles.top_cont}>
                    <Text style={styles.top_cont_txt}>Sign In</Text>
                </View>
                <View style={{ marginTop: 110 }}>
                    <DishedLogo />
                </View>
                <View style={styles.s_m_input_cont}>
                    <Text style={[styles.s_m_input_text, { marginTop: 26 }]}>
                        Email
                    </Text>
                    <BasicTextEntry
                        inputValue={email}
                        setInputValue={setEmail}
                    />
                    <Text style={[styles.s_m_input_text, { marginTop: 26 }]}>
                        Password
                    </Text>
                    <SecureTextEntry
                        inputValue={password}
                        setInputValue={setPassword}
                    />
                    <BasicButton
                        buttonText="Login"
                        buttonHeight={52}
                        marginTop={23}
                        marginBottom={16}
                        execFunc={() => console.log('Login')}
                    />
                    <View style={styles.s_m_fp}>
                        <TextButton
                            buttonText="Forgot Password"
                            marginLeft={3}
                            textColor={Colors().InputText}
                            isFontLight={true}
                            execFunc={() =>
                                navigation.navigate(
                                    'ForgotPasswordPage' as never,
                                )
                            }
                        />
                    </View>
                    <TextDivider text={'or'} marginBottom={20} />
                    <BasicLogoButton
                        logoName="Facebook"
                        inputText="Sign In with Facebook"
                        marginTop={32}
                    />
                    <BasicLogoButton
                        logoName="Google"
                        inputText="Sign In with Google"
                        marginTop={16}
                    />
                    <View style={styles.s_m_acc}>
                        <Text style={styles.s_m_acc_text}>New to Dished?</Text>
                        <TextButton
                            buttonText="Sign Up"
                            marginLeft={3}
                            execFunc={() =>
                                navigation.navigate<never>(
                                    'SignUpPage' as never,
                                )
                            }
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default SignInPage;

const styles = StyleSheet.create({
    signin_main: {
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
    s_m_input_cont: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 20,
    },
    s_m_input_text: {
        fontFamily: fonts.Poppins_700,
        fontSize: 16,
        lineHeight: 32,
        color: Colors().Black,
    },
    s_m_acc: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 35,
    },
    s_m_acc_text: {
        fontFamily: fonts.Poppins_400,
        color: Colors().InputTextGrey,
    },
    s_m_fp: {
        marginTop: 10,
        marginBottom: 18,
        marginRight: 'auto',
    },
});
