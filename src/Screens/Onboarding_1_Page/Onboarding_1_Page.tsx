import React, { FunctionComponent } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    PanResponderGestureState,
} from 'react-native';
import Colors from '../../Colors/Colors';
import TextButton from '../../Components/Text_Button/Text_Button';
import { fonts } from '../../Fonts/Fonts';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import SliderHandler from '../../Components/Slider_Handler/Slider_Handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GestureRecognizer from 'react-native-swipe-gestures';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';

const Onboarding1Page: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const gesture_config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const OnSwipeLeft = (gestureState: PanResponderGestureState) => {
        navigation.navigate<never>('Onboarding2Page' as never);
    };

    const skip_onboarding = async () => {
        try {
            await AsyncStorage.setItem('show_onboarding', 'skip');
            navigation.navigate(
                'AuthStack' as never,
                {
                    screen: 'SignUpPage',
                } as never,
            );
        } catch (err) {
            navigation.navigate(
                'AuthStack' as never,
                {
                    screen: 'SignUpPage',
                } as never,
            );
        }
    };

    return (
        <GestureRecognizer
            style={{ flex: 1 }}
            config={gesture_config}
            onSwipeLeft={state => OnSwipeLeft(state)}>
            <View style={styles.op_main}>
                <CustomStatusBar />
                <ScrollView>
                    <View style={styles.op_m_skip}>
                        <TextButton
                            buttonText="Skip"
                            textColor={Colors().Secondary}
                            isFontLight={true}
                            execFunc={() => skip_onboarding()}
                        />
                    </View>
                    <Text style={styles.op_m_main_txt}>
                        Various selection of foods from favorite restaurant!
                    </Text>
                    <Image
                        source={require('../../Images/Onboarding/Food_1.png')}
                        style={styles.op_m_main_img}
                    />
                    <Text style={styles.op_m_sub_txt}>
                        Our restaurants serves a wide variety of food
                    </Text>
                    <SliderHandler sliderNumber={1} />
                    <BasicButton
                        buttonText="Next"
                        buttonHeight={43}
                        marginHorizontal={19}
                        marginTop={50}
                        borderRaduis={20}
                        execFunc={() =>
                            navigation.navigate<never>(
                                'Onboarding2Page' as never,
                            )
                        }
                    />
                    <Image
                        source={require('../../Images/Onboarding/Woman_Chef_Art.png')}
                        style={styles.op_m_wca}
                    />
                    <Image
                        source={require('../../Images/Onboarding/Cooking_Pot.png')}
                        style={styles.op_m_cp}
                    />
                </ScrollView>
            </View>
        </GestureRecognizer>
    );
};

export default Onboarding1Page;

const styles = StyleSheet.create({
    op_main: {
        flex: 1,
        backgroundColor: Colors().White,
    },
    op_m_wca: {
        position: 'absolute',
        marginLeft: 0,
        marginTop: 0,
        width: 164,
        height: 199,
        zIndex: -1,
    },
    op_m_cp: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 164,
        height: 199,
        zIndex: -1,
    },
    op_m_skip: {
        position: 'absolute',
        right: 30,
        top: 60,
    },
    op_m_main_txt: {
        fontFamily: fonts.Poppins_700,
        fontSize: 28,
        color: Colors().Black,
        textAlign: 'center',
        marginTop: 160,
        width: 290,
        lineHeight: 32,
        alignSelf: 'center',
        marginBottom: 22,
    },
    op_m_main_img: {
        width: 260,
        height: 260,
        alignSelf: 'center',
    },
    op_m_sub_txt: {
        fontFamily: fonts.Poppins_400,
        fontSize: 20,
        width: 307,
        alignSelf: 'center',
        marginTop: 54,
        marginBottom: 33,
        textAlign: 'center',
        color: Colors().InputTextGrey,
    },
});
