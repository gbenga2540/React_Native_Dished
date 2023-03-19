import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Feather from 'react-native-vector-icons/Feather';
import { fonts } from '../../Fonts/Fonts';
import Colors from '../../Colors/Colors';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import BasicButton from '../../Components/Basic_Button/Basic_Button';

const InfoPage: FunctionComponent = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<any>>();

    const proceed = () => {
        switch (route?.params?.proceed_type) {
            case 1:
                navigation.navigate(
                    'AuthStack' as never,
                    { screen: 'SignInPage' } as never,
                );
                break;
            case 2:
                navigation.navigate(
                    'HomeStack' as never,
                    { screen: 'HomePage' } as never,
                );
                break;
            default:
                navigation.navigate(
                    'AuthStack' as never,
                    { screen: 'SignInPage' } as never,
                );
                break;
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <CustomStatusBar />
            <View style={styles.info_main}>
                <TouchableOpacity
                    style={styles.i_m_bb}
                    onPress={() =>
                        navigation.canGoBack() && navigation.goBack()
                    }>
                    <Feather name="chevron-left" size={35} color={'black'} />
                </TouchableOpacity>
                <LottieView
                    style={{
                        transform: [{ scale: 1 }],
                        minWidth: 280,
                        minHeight: 280,
                        maxWidth: 280,
                        maxHeight: 280,
                        position: 'relative',
                        alignSelf: 'center',
                    }}
                    source={require('../../Animations/On_Success.json')}
                    autoPlay
                    loop={true}
                    resizeMode="cover"
                    speed={1.7}
                />
                <Text style={[styles.i_m_err_txt, styles.i_m_err_txt_h]}>
                    Successful!
                </Text>
                <Text style={styles.i_m_err_txt}>
                    {route?.params?.success_mssg || ''}
                </Text>
                <Text
                    style={[
                        styles.i_m_err_txt,
                        {
                            fontSize: 14,
                            color: Colors().Primary,
                            marginTop: 50,
                        },
                    ]}>
                    {route?.params?.svr_success_mssg || ''}
                </Text>
                <View
                    style={{
                        marginHorizontal: 20,
                        marginBottom: 60,
                        flex: 1,
                        justifyContent: 'flex-end',
                    }}>
                    <BasicButton
                        buttonText="PROCEED"
                        buttonHeight={52}
                        marginTop={0}
                        marginBottom={0}
                        execFunc={() => proceed()}
                    />
                </View>
            </View>
        </View>
    );
};

export default InfoPage;

const styles = StyleSheet.create({
    info_main: {
        flex: 1,
        backgroundColor: Colors().Background,
    },
    i_m_bb: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        marginTop: 30,
        marginLeft: 5,
        marginBottom: 20,
    },
    i_m_err_txt: {
        marginTop: 20,
        width: 260,
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: fonts.Poppins_400,
        fontSize: 16,
        color: Colors().Black,
    },
    i_m_err_txt_h: {
        fontFamily: fonts.Poppins_700,
        fontSize: 19,
        marginTop: 10,
        color: 'green',
    },
});
