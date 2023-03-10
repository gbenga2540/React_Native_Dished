import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Colors from '../../Colors/Colors';
import { fonts } from '../../Fonts/Fonts';
import DishedLogo from '../../Components/Dished_Logo/Dished_Logo';
import TextButton from '../../Components/Text_Button/Text_Button';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const VerifyMailPage: FunctionComponent = () => {
    const route = useRoute<RouteProp<any>>();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const resend_mail = () => {
        setShowSpinner(true);
        setTimeout(async () => {
            try {
                await auth()
                    .currentUser?.sendEmailVerification()
                    .then(() => {
                        setShowSpinner(false);
                    })
                    .catch(error => {
                        setShowSpinner(false);
                        error_handler({
                            error_mssg:
                                'An error occured while trying to re-send the verification link to yout Email Address.',
                            navigation: navigation,
                            svr_error_mssg: error?.code as string,
                        });
                    });
            } catch (err) {
                setShowSpinner(false);
                error_handler({
                    error_mssg:
                        'An error occured while trying to re-send the verification link to yout Email Address.',
                    navigation: navigation,
                });
            }
        }, 500);
    };

    const verify_mail = () => {
        setShowSpinner(true);
        try {
            setTimeout(() => {
                auth()
                    .currentUser?.reload()
                    .catch(() => {
                        setShowSpinner(false);
                        error_handler({
                            navigation: navigation,
                            error_mssg:
                                'Your Email Address is yet to be verified! Please check your Email for the verification link.',
                        });
                    })
                    .then(() => {
                        setShowSpinner(false);
                        if (auth().currentUser?.emailVerified) {
                            navigation.navigate('SelectProfilePage' as never);
                        } else {
                            error_handler({
                                navigation: navigation,
                                error_mssg:
                                    'Your Email Address is yet to be verified! Please check your Email for the verification link.',
                            });
                        }
                    });
            }, 500);
        } catch (err) {
            setShowSpinner(false);
            error_handler({
                navigation: navigation,
                error_mssg:
                    'Your Email Address is yet to be verified! Please check your Email for the verification link.',
            });
        }
    };

    return (
        <View style={styles.verify_mail_main}>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={Colors().Primary}
            />
            <OverlaySpinner
                showSpinner={showSpinner}
                setShowSpinner={setShowSpinner}
            />
            <View style={styles.top_cont}>
                <Text style={styles.top_cont_txt}>Verify Email</Text>
            </View>
            <View style={{ marginTop: 110, marginBottom: 65 }}>
                <DishedLogo />
            </View>
            <Text style={styles.v_o_m_info}>
                {
                    'A verification link has been sent to your email. Please click the link to verify your Email Address.'
                }
            </Text>
            {(route.params?.show_retry || false) && (
                <TextButton
                    textColor={Colors().LightPink}
                    isFontLight={true}
                    marginTop={5}
                    marginLeft={'auto'}
                    marginRight={22}
                    buttonText={'Resend Mail'}
                    execFunc={() => resend_mail()}
                />
            )}
            <View style={styles.s_m_input_cont}>
                <BasicButton
                    buttonText="PROCEED"
                    buttonHeight={52}
                    marginTop={20}
                    marginBottom={16}
                    execFunc={() => verify_mail()}
                />
            </View>
        </View>
    );
};

export default VerifyMailPage;

const styles = StyleSheet.create({
    verify_mail_main: {
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
        paddingHorizontal: 20,
        position: 'absolute',
        width: '100%',
        bottom: 50,
    },
    v_o_m_info: {
        fontFamily: fonts.Poppins_400,
        color: Colors().Black,
        textAlign: 'center',
        width: 290,
        alignSelf: 'center',
        marginBottom: 20,
        fontSize: 15,
    },
});
