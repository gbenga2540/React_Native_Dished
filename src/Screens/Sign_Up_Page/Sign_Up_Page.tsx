import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import Colors from '../../Colors/Colors';
import { fonts } from '../../Fonts/Fonts';
import { Sign_Up_Identity_Data } from '../../Data/Sign_Up/Sign_Up_Identity';

import DishedLogo from '../../Components/Dished_Logo/Dished_Logo';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import SecureTextEntry from '../../Components/Secure_Text_Entry/Secure_Text_Entry';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import TextDivider from '../../Components/Text_Divider/Text_Divider';
import BasicLogoButton from '../../Components/Basic_Logo_Button/Basic_Logo_Button';
import TextButton from '../../Components/Text_Button/Text_Button';
import RNDropDown from '../../Components/RN_Drop_Down/RN_Drop_Down';
import { useNavigation } from '@react-navigation/native';

const SignUpPage: FunctionComponent = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [identityValue, setIdentityValue] = useState<string>(
        Sign_Up_Identity_Data[0]?.value,
    );

    const on_get_started = () => {
        switch (identityValue) {
            case Sign_Up_Identity_Data[0]?.value:
                navigation.navigate<never>('VerifyConsumerPage' as never);
                break;
            case Sign_Up_Identity_Data[1]?.value:
                navigation.navigate<never>('VerifyRidersPage' as never);
                break;
            case Sign_Up_Identity_Data[2]?.value:
                navigation.navigate<never>('VerifyRestaurantPage' as never);
                break;
            default:
                break;
        }
    };

    return (
        <View style={styles.signup_main}>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={Colors().Primary}
            />
            <ScrollView>
                <View style={styles.top_cont}>
                    <Text style={styles.top_cont_txt}>Sign up</Text>
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
                    <Text style={[styles.s_m_input_text, { marginTop: 23 }]}>
                        Register as
                    </Text>
                    <RNDropDown
                        dropdownData={Sign_Up_Identity_Data}
                        value={identityValue}
                        setValue={setIdentityValue}
                    />
                    <BasicButton
                        buttonText="Get Started"
                        buttonHeight={52}
                        marginTop={35}
                        marginBottom={16}
                        execFunc={() => on_get_started()}
                    />
                    <TextDivider text={'or'} />
                    <BasicLogoButton
                        logoName="Facebook"
                        inputText="Sign Up with Facebook"
                        marginTop={32}
                    />
                    <BasicLogoButton
                        logoName="Google"
                        inputText="Sign Up with Google"
                        marginTop={16}
                    />
                    <View style={styles.s_m_acc}>
                        <Text style={styles.s_m_acc_text}>
                            Already have an account?
                        </Text>
                        <TextButton
                            buttonText="Sign In"
                            marginLeft={3}
                            execFunc={() =>
                                navigation.navigate<never>(
                                    'SignInPage' as never,
                                )
                            }
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default SignUpPage;

const styles = StyleSheet.create({
    signup_main: {
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
    },
    s_m_acc: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    s_m_acc_text: {
        fontFamily: fonts.Poppins_400,
        color: Colors().InputTextGrey,
    },
});
