import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Feather from 'react-native-vector-icons/Feather';
import { fonts } from '../../Configs/Fonts/Fonts';
import Colors from '../../Configs/Colors/Colors';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { clear_user_info } from '../../Redux/Actions/User_Info/User_Info_Actions';
import { SECURE_STORAGE_NAME, SECURE_STORAGE_USER_INFO } from '@env';
import SInfo from 'react-native-sensitive-info';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import auth from '@react-native-firebase/auth';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { info_handler } from '../../Utils/Info_Handler/Info_Handler';

const InfoPage: FunctionComponent = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute<RouteProp<any>>();
    const hide_back_btn: boolean = route?.params?.hide_back_btn;
    const hide_header: boolean = route?.params?.hide_header;
    const [disableButton, setDisableButton] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const proceed = () => {
        setDisableButton(true);
        switch (route?.params?.proceed_type) {
            case 1:
                navigation.push(
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
            case 3:
                setTimeout(async () => {
                    try {
                        dispatch(clear_user_info());
                        await SInfo.deleteItem(SECURE_STORAGE_USER_INFO, {
                            sharedPreferencesName: SECURE_STORAGE_NAME,
                            keychainService: SECURE_STORAGE_NAME,
                        })
                            .catch(error => {
                                setDisableButton(false);
                                setShowSpinner(false);
                                if (error) {
                                    error_handler({
                                        navigation: navigation,
                                        error_mssg:
                                            'An error occured, Please try again!',
                                    });
                                }
                            })
                            .then(() => {
                                auth().signOut();
                                setDisableButton(false);
                                setShowSpinner(false);
                                info_handler({
                                    navigation: navigation,
                                    success_mssg: 'Successfully Signed Out!',
                                    proceed_type: 1,
                                    hide_back_btn: true,
                                });
                            });
                    } catch (error) {
                        setShowSpinner(false);
                        setDisableButton(false);
                        error_handler({
                            navigation: navigation,
                            error_mssg: 'An error occured, Please try again!',
                        });
                    }
                }, 500);
                break;
            default:
                navigation.push(
                    'AuthStack' as never,
                    { screen: 'SignInPage' } as never,
                );
                break;
        }
        setDisableButton(false);
    };

    return (
        <View style={{ flex: 1 }}>
            <CustomStatusBar />
            <OverlaySpinner
                showSpinner={showSpinner}
                setShowSpinner={setShowSpinner}
            />
            <View style={styles.info_main}>
                <TouchableOpacity
                    style={styles.i_m_bb}
                    disabled={hide_back_btn}
                    onPress={() =>
                        navigation.canGoBack() && navigation.goBack()
                    }>
                    {!hide_back_btn && (
                        <Feather
                            name="chevron-left"
                            size={35}
                            color={'black'}
                        />
                    )}
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
                {!hide_header && (
                    <Text style={[styles.i_m_err_txt, styles.i_m_err_txt_h]}>
                        Successful!
                    </Text>
                )}
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
                        disabled={disableButton}
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
        minWidth: 60,
        height: 60,
        minHeight: 60,
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
