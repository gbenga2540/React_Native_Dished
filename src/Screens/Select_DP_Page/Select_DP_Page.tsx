import React, { useState, useEffect, FunctionComponent } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { fonts } from '../../Configs/Fonts/Fonts';
import ImagePicker from 'react-native-image-crop-picker';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import DishedLogo from '../../Components/Dished_Logo/Dished_Logo';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import storage from '@react-native-firebase/storage';
import { get_image_format } from '../../Utils/Get_Image_Format/Get_Image_Format';
import auth from '@react-native-firebase/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { useDispatch } from 'react-redux';
import { set_user_dp } from '../../Redux/Actions/User_Info/User_Info_Actions';

const SelectDPPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const dispatch = useDispatch();
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [displayPicture, setDisplayPicture] = useState<string>('none');
    const [imageFormat, setImageFormat] = useState<string>('');
    const [disableButton, setDisableButton] = useState<boolean>(false);

    const upload_image = async () => {
        if (displayPicture === 'none') {
            setShowSpinner(false);
            setDisableButton(false);
            error_handler({
                navigation: navigation,
                error_mssg:
                    'No picture was uploaded. Please select a picture to proceed.',
            });
        } else {
            if (auth().currentUser) {
                const dp_ref = storage().ref(
                    `Users_Info/${
                        auth().currentUser?.uid
                    }/Display_Picture/dp.${imageFormat}`,
                );
                setShowSpinner(true);
                setDisableButton(true);
                try {
                    let errorPresent: boolean = false;
                    dp_ref
                        .putString(displayPicture, 'data_url')
                        .catch(err => {
                            errorPresent = true;
                            setShowSpinner(false);
                            setDisableButton(false);
                            if (err) {
                                error_handler({
                                    navigation: navigation,
                                    error_mssg:
                                        "An error occured while trying to upload User's Display Picture.",
                                    svr_error_mssg: err?.code,
                                });
                            }
                        })
                        .then(async res => {
                            if (!errorPresent) {
                                if (res?.state === 'success') {
                                    await dp_ref
                                        ?.getDownloadURL()
                                        .then(result => {
                                            if (result) {
                                                dispatch(
                                                    set_user_dp({
                                                        user_dp: result,
                                                    }),
                                                );
                                            }
                                        });
                                    setShowSpinner(false);
                                    setDisableButton(false);
                                    navigation.navigate(
                                        'HomeStack' as never,
                                        {
                                            screen: 'HomePage',
                                        } as never,
                                    );
                                } else {
                                    setShowSpinner(false);
                                    setDisableButton(false);
                                    error_handler({
                                        navigation: navigation,
                                        error_mssg:
                                            "An error occured while trying to upload User's Display Picture.",
                                    });
                                }
                            } else {
                                setShowSpinner(false);
                                setDisableButton(false);
                            }
                        });
                } catch (error) {
                    setShowSpinner(false);
                    setDisableButton(false);
                    error_handler({
                        navigation: navigation,
                        error_mssg:
                            "An error occured while trying to upload User's Display Picture.",
                    });
                }
            } else {
                setShowSpinner(false);
                setDisableButton(false);
                error_handler({
                    navigation: navigation,
                    error_mssg:
                        "An error occured while trying to upload User's display picture. No User is currently logged in.",
                });
            }
        }
    };

    const clear_image = () => {
        setShowSpinner(false);
        setDisableButton(false);
        setDisplayPicture('none');
        ImagePicker.clean();
    };

    const select_image_from_gallery = () => {
        setShowSpinner(false);
        setDisableButton(true);
        try {
            ImagePicker.openPicker({
                width: 300,
                height: 300,
                cropping: true,
                multiple: false,
                includeBase64: true,
                enableRotationGesture: true,
                forceJpg: true,
            })
                .catch(err => {
                    setDisableButton(false);
                    if (err) {
                        clear_image();
                    }
                })
                .then(res => {
                    setDisableButton(false);
                    if (res) {
                        // @ts-ignore
                        const processed_image = `data:${res?.mime};base64,${res?.data}`;
                        setImageFormat(get_image_format({ mime: res?.mime }));
                        setDisplayPicture(processed_image);
                    } else {
                        clear_image();
                    }
                });
        } catch (error) {
            setDisableButton(false);
            clear_image();
        }
    };

    const select_image_from_camera = () => {
        setShowSpinner(false);
        setDisableButton(true);
        try {
            ImagePicker.openCamera({
                width: 300,
                height: 300,
                cropping: true,
                multiple: false,
                includeBase64: true,
                enableRotationGesture: true,
                forceJpg: true,
            })
                .catch(err => {
                    setDisableButton(false);
                    if (err) {
                        clear_image();
                    }
                })
                .then(res => {
                    setDisableButton(false);
                    if (res) {
                        // @ts-ignore
                        const processed_image = `data:${res?.mime};base64,${res?.data}`;
                        setImageFormat(get_image_format({ mime: res?.mime }));
                        setDisplayPicture(processed_image);
                    } else {
                        clear_image();
                    }
                });
        } catch (error) {
            setDisableButton(false);
            clear_image();
        }
    };

    useEffect(() => {
        clear_image();
    }, []);

    return (
        <View style={styles.selectdp_main}>
            <OverlaySpinner
                showSpinner={showSpinner}
                setShowSpinner={setShowSpinner}
            />
            <CustomStatusBar
                showSpinner={showSpinner}
                backgroundColor={Colors.Primary}
                backgroundDimColor={Colors.PrimaryDim}
                barStyleLight={true}
            />
            <ScrollView>
                <View style={styles.top_cont}>
                    <Text style={styles.top_cont_txt}>Display Picture</Text>
                </View>
                <View style={{ marginTop: 110, marginBottom: 50 }}>
                    <DishedLogo />
                </View>
                <View style={styles.sdp_w_i_c}>
                    {displayPicture === 'none' ? (
                        <Image
                            style={styles.sdp_w_i}
                            source={require('../../Images/Logo/Default_User_Logo.jpg')}
                        />
                    ) : (
                        <Image
                            style={styles.sdp_w_i}
                            source={{
                                uri: displayPicture,
                                width: 120,
                                height: 120,
                            }}
                        />
                    )}
                </View>
                <View style={styles.sdp_sp_w}>
                    <TouchableOpacity
                        onPress={select_image_from_camera}
                        style={[
                            styles.sdp_sp_i,
                            { backgroundColor: Colors.White },
                        ]}>
                        <Feather
                            name="camera"
                            size={28}
                            color={Colors.InputText}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={select_image_from_gallery}
                        style={[
                            styles.sdp_sp_i,
                            { backgroundColor: Colors.White },
                        ]}>
                        <Feather
                            name="image"
                            size={28}
                            color={Colors.InputText}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={clear_image}
                        style={[
                            styles.sdp_sp_i,
                            { backgroundColor: Colors.White },
                        ]}>
                        <Feather name="x" size={28} color={Colors.InputText} />
                    </TouchableOpacity>
                </View>
                <View style={styles.sdp_m_input_cont}>
                    <BasicButton
                        buttonText="Upload Picture"
                        buttonHeight={52}
                        disabled={disableButton}
                        marginTop={23}
                        marginBottom={16}
                        execFunc={() => upload_image()}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default SelectDPPage;

const styles = StyleSheet.create({
    selectdp_main: {
        flex: 1,
    },
    top_cont: {
        width: '100%',
        height: 1000,
        top: -890,
        backgroundColor: Colors.Primary,
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        position: 'absolute',
    },
    top_cont_txt: {
        marginTop: 'auto',
        marginBottom: 13,
        color: Colors.White,
        fontFamily: fonts.Poppins_700,
        fontSize: 24,
        lineHeight: 32,
    },
    sdp_w_i_c: {
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 130,
        padding: 2,
        marginBottom: 40,
        borderColor: Colors.Primary,
        borderWidth: 2,
    },
    sdp_w_i: {
        borderRadius: 230,
        width: 230,
        height: 230,
    },
    sdp_sp_w: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    sdp_sp_i: {
        width: 60,
        height: 60,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sdp_m_input_cont: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 20,
        marginTop: 10,
    },
});
