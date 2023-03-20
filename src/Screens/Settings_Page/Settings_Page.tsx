import React, { FunctionComponent, useState } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import Colors from '../../Colors/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { fonts } from '../../Fonts/Fonts';
import auth from '@react-native-firebase/auth';
import { SECURE_STORAGE_NAME, SECURE_STORAGE_USER_INFO } from '@env';
import SInfo from 'react-native-sensitive-info';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { info_handler } from '../../Utils/Info_Handler/Info_Handler';
import { useNavigation } from '@react-navigation/native';
import { clear_user_info } from '../../Redux/Actions/User_Info/User_Info_Actions';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const SettingsPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const dispatch = useDispatch();
    const userInfo = useSelector((state: any) => state?.UserInfo);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);

    const change_password = () => {
        setDisableButton(true);
        navigation.push(
            'AuthStack' as never,
            { screen: 'ChangePasswordPage' } as never,
        );
        setDisableButton(false);
    };

    const change_display_picture = () => {
        setDisableButton(true);
        navigation.push(
            'AuthStack' as never,
            { screen: 'SelectDPPage' } as never,
        );
        setDisableButton(false);
    };

    const sign_out = () => {
        setDisableButton(true);
        setShowSpinner(true);
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
    };

    return (
        <View style={styles.settings_main}>
            <CustomStatusBar
                backgroundColor={Colors()?.Background}
                showSpinner={showSpinner}
            />
            <OverlaySpinner
                showSpinner={showSpinner}
                setShowSpinner={setShowSpinner}
            />
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.sm_w_i_c}>
                    {userInfo?.userDP ? (
                        <Image
                            style={styles.sm_w_i}
                            source={{
                                uri: userInfo?.userDP,
                                width: 170,
                                height: 170,
                            }}
                        />
                    ) : (
                        <Image
                            style={styles.sm_w_i}
                            source={require('../../Images/Logo/Default_User_Logo.jpg')}
                        />
                    )}
                </View>
                <View style={styles.sm_cont}>
                    <Text style={styles.sm_c_n}>{userInfo?.userName}</Text>
                    <TouchableOpacity
                        onPress={() => change_password()}
                        disabled={disableButton}
                        style={{
                            margin: 20,
                            marginVertical: 7,
                            marginTop: 30,
                        }}
                        activeOpacity={0.65}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 18,
                                fontFamily: fonts.Poppins_400,
                            }}>
                            Change Password
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => change_display_picture()}
                        disabled={disableButton}
                        style={{ margin: 20, marginVertical: 7 }}
                        activeOpacity={0.65}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 18,
                                fontFamily: fonts.Poppins_400,
                            }}>
                            Change Display Picture
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => sign_out()}
                        disabled={disableButton}
                        style={{ margin: 20, marginVertical: 7 }}
                        activeOpacity={0.65}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 18,
                                fontFamily: fonts.Poppins_400,
                            }}>
                            Sign Out!
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default SettingsPage;

const styles = StyleSheet.create({
    settings_main: {
        flex: 1,
        backgroundColor: Colors().Background,
    },
    sm_w_i_c: {
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 170,
        padding: 3,
        marginBottom: 20,
        borderColor: Colors().Secondary,
        marginTop: Platform?.OS === 'ios' ? 100 : 75,
        borderWidth: 2,
    },
    sm_w_i: {
        borderRadius: 170,
        width: 170,
        height: 170,
    },
    sm_cont: {
        flex: 1,
        justifyContent: 'center',
    },
    sm_c_n: {
        textAlign: 'center',
        color: Colors()?.InputText,
        fontFamily: fonts?.Poppins_500,
        fontSize: 20,
        marginBottom: 30,
    },
});
