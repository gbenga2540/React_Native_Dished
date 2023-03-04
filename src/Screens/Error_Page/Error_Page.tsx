import React, { FunctionComponent } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Feather from 'react-native-vector-icons/Feather';
import { fonts } from '../../Fonts/Fonts';
import Colors from '../../Colors/Colors';

const ErrorPage: FunctionComponent = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<any>>();

    return (
        <ScrollView style={{ flex: 1, backgroundColor: Colors().Background }}>
            <View style={styles.error_main}>
                <StatusBar
                    barStyle={'dark-content'}
                    backgroundColor={Colors().Background}
                />
                <TouchableOpacity
                    style={styles.e_m_bb}
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
                    source={require('../../Animations/An_Error_Occured.json')}
                    autoPlay
                    loop={true}
                    resizeMode="cover"
                    speed={1.7}
                />
                <Text style={[styles.e_m_err_txt, styles.e_m_err_txt_h]}>
                    Error!
                </Text>
                <Text style={styles.e_m_err_txt}>
                    {route?.params?.error_mssg}
                </Text>
                <Text
                    style={[
                        styles.e_m_err_txt,
                        {
                            fontSize: 14,
                            color: Colors().LightPink,
                            marginTop: 50,
                        },
                    ]}>
                    {route?.params?.svr_error_mssg || ''}
                </Text>
            </View>
        </ScrollView>
    );
};

export default ErrorPage;

const styles = StyleSheet.create({
    error_main: {
        flex: 1,
        backgroundColor: Colors().Background,
    },
    e_m_bb: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        marginTop: 30,
        marginLeft: 5,
        marginBottom: 20,
    },
    e_m_err_txt: {
        marginTop: 20,
        width: 260,
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: fonts.Poppins_400,
        fontSize: 16,
        color: Colors().Black,
    },
    e_m_err_txt_h: {
        fontFamily: fonts.Poppins_700,
        fontSize: 19,
        marginTop: 10,
        color: 'red',
    },
});
