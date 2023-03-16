import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Colors from '../../Colors/Colors';
import { fonts } from '../../Fonts/Fonts';
import { Sign_Up_Identity_Data } from '../../Data/Sign_Up_Identity/Sign_Up_Identity';
import DishedLogo from '../../Components/Dished_Logo/Dished_Logo';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import RNDropDown from '../../Components/RN_Drop_Down/RN_Drop_Down';
import { useNavigation } from '@react-navigation/native';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';

const SelectProfilePage: FunctionComponent = () => {
    const navigation = useNavigation();

    const [identityValue, setIdentityValue] = useState<string>(
        Sign_Up_Identity_Data[0]?.value,
    );

    const on_get_started = async () => {
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
            <CustomStatusBar
                barStyleLight={true}
                backgroundColor={Colors().Primary}
                backgroundDimColor={Colors().PrimaryDim}
            />
            <ScrollView>
                <View style={styles.top_cont}>
                    <Text style={styles.top_cont_txt}>Select Profile</Text>
                </View>
                <View style={{ marginTop: 110 }}>
                    <DishedLogo />
                </View>
                <View style={styles.s_m_input_cont}>
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
                </View>
            </ScrollView>
        </View>
    );
};

export default SelectProfilePage;

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
        color: Colors().Black,
    },
});
