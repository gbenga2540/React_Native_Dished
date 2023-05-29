import React, { FunctionComponent, useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import Colors from '../../Configs/Colors/Colors';
import { useSelector } from 'react-redux';
import { fonts } from '../../Configs/Fonts/Fonts';
import { info_handler } from '../../Utils/Info_Handler/Info_Handler';
import { useNavigation } from '@react-navigation/native';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ProfilePage: FunctionComponent = () => {
        const navigation = useNavigation<NativeStackNavigationProp<any>>();
        const userInfo = useSelector((state: any) => state?.UserInfo);
        const [showSpinner, setShowSpinner] = useState<boolean>(false);
        const [disableButton, setDisableButton] = useState<boolean>(false);

        const change_password = () => {
                setDisableButton(true);
                navigation.push('AuthStack' as never, { screen: 'ChangePasswordPage' } as never);
                setDisableButton(false);
        };

        const change_display_picture = () => {
                setDisableButton(true);
                navigation.push('AuthStack' as never, { screen: 'SelectDPPage' } as never);
                setDisableButton(false);
        };

        const sign_out = () => {
                setDisableButton(true);
                info_handler({
                        navigation: navigation,
                        hide_back_btn: false,
                        success_mssg: 'Are you sure you want to Sign Out?',
                        proceed_type: 3,
                        hide_header: true,
                });
                setDisableButton(false);
        };

        return (
                <View style={styles.profile_main}>
                        <CustomStatusBar backgroundColor={Colors.Background} showSpinner={showSpinner} />
                        <OverlaySpinner showSpinner={showSpinner} setShowSpinner={setShowSpinner} />
                        <ScrollView style={{ flex: 1 }}>
                                <View style={styles.pp_w_i_c}>
                                        {userInfo?.userDP ? (
                                                <Image
                                                        style={styles.pp_w_i}
                                                        source={{
                                                                uri: userInfo?.userDP,
                                                                width: 170,
                                                                height: 170,
                                                        }}
                                                />
                                        ) : (
                                                <Image style={styles.pp_w_i} source={require('../../Images/Logo/Default_User_Logo.jpg')} />
                                        )}
                                </View>
                                <View style={styles.pp_cont}>
                                        <Text style={styles.pp_c_n}>{userInfo?.userName}</Text>
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
                                        <TouchableOpacity onPress={() => change_display_picture()} disabled={disableButton} style={{ margin: 20, marginVertical: 7 }} activeOpacity={0.65}>
                                                <Text
                                                        style={{
                                                                color: 'black',
                                                                fontSize: 18,
                                                                fontFamily: fonts.Poppins_400,
                                                        }}>
                                                        Change Display Picture
                                                </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => sign_out()} disabled={disableButton} style={{ margin: 20, marginVertical: 7 }} activeOpacity={0.65}>
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

export default ProfilePage;

const styles = StyleSheet.create({
        profile_main: {
                flex: 1,
                backgroundColor: Colors.Background,
        },
        pp_w_i_c: {
                alignItems: 'center',
                alignSelf: 'center',
                borderRadius: 170,
                padding: 3,
                marginBottom: 20,
                borderColor: Colors.Secondary,
                marginTop: Platform?.OS === 'ios' ? 100 : 75,
                borderWidth: 2,
        },
        pp_w_i: {
                borderRadius: 170,
                width: 170,
                height: 170,
        },
        pp_cont: {
                flex: 1,
                justifyContent: 'center',
        },
        pp_c_n: {
                textAlign: 'center',
                color: Colors.InputText,
                fontFamily: fonts?.Poppins_500,
                fontSize: 20,
                marginBottom: 30,
        },
});
