import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Colors from '../../Colors/Colors';
import { fonts } from '../../Fonts/Fonts';

import DishedLogo from '../../Components/Dished_Logo/Dished_Logo';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import { useNavigation } from '@react-navigation/native';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';

const ForgotPasswordPage: FunctionComponent = () => {
    const [email, setEmail] = useState<string>('');
    const navigation = useNavigation();

    return (
        <View style={styles.fp_main}>
            <CustomStatusBar
                barStyleLight={true}
                backgroundColor={Colors().Primary}
                backgroundDimColor={Colors().PrimaryDim}
            />
            <ScrollView>
                <View style={styles.top_cont}>
                    <Text style={styles.top_cont_txt}>Forgot Password</Text>
                </View>
                <View style={{ marginTop: 110 }}>
                    <DishedLogo />
                </View>
                <View style={styles.f_p_input_cont}>
                    <Text
                        style={[
                            styles.f_p_input_text,
                            { marginTop: 26, marginBottom: 5 },
                        ]}>
                        Email/Phone
                    </Text>
                    <BasicTextEntry
                        inputValue={email}
                        setInputValue={setEmail}
                        placeHolderText="johndoe@gmail.com / 08011223344"
                    />
                    <BasicButton
                        buttonText="Send OTP"
                        buttonHeight={52}
                        marginTop={60}
                        marginBottom={16}
                        execFunc={() =>
                            navigation.navigate('FingerprintLoginPage' as never)
                        }
                        // update with real code
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default ForgotPasswordPage;

const styles = StyleSheet.create({
    fp_main: {
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
    f_p_input_cont: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 20,
    },
    f_p_input_text: {
        fontFamily: fonts.Poppins_700,
        fontSize: 16,
        lineHeight: 32,
        color: Colors().Black,
    },
});
