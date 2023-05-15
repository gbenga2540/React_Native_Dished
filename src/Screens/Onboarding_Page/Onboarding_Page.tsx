import React, { FunctionComponent, useState } from 'react';
import {
    Image,
    StyleSheet,
    View,
    ScrollView,
    Dimensions,
    Platform,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import SliderHandler from '../../Components/Slider_Handler/Slider_Handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import Carousel from 'react-native-snap-carousel';
import { onboarding_data } from '../../Data/Onboarding_Pages/Onboarding_Pages';
import OnboardingItem from '../../Components/Onboarding_Item/Onboarding_Item';
import { Onboarding_Props } from '../../Interface/Onboarding_Props/Onboarding_Props';
import TextButton from '../../Components/Text_Button/Text_Button';

const OnboardingPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const screen_width = Dimensions.get('screen').width;
    const [itemIndex, setItemIndex] = useState<number>(1);
    const [disableButton, setDisableButton] = useState<boolean>(false);

    const skip_onboarding = async () => {
        setDisableButton(true);
        try {
            await AsyncStorage.setItem('show_onboarding', 'skip');
            navigation.push(
                'AuthStack' as never,
                {
                    screen: 'SignUpPage',
                } as never,
            );
        } catch (err) {
            navigation.push(
                'AuthStack' as never,
                {
                    screen: 'SignUpPage',
                } as never,
            );
        }
        setDisableButton(false);
    };

    // @ts-ignore
    const renderItem = ({
        item,
        index,
    }: {
        item: Onboarding_Props;
        index: number;
    }) => {
        return <OnboardingItem data={item} key={index} />;
    };

    return (
        <View style={styles.op_main}>
            <CustomStatusBar backgroundColor={Colors.White} />
            <View style={styles.op_m_skip}>
                <TextButton
                    buttonText="Skip"
                    execFunc={() => skip_onboarding()}
                    textColor={Colors.Secondary}
                    disabled={disableButton}
                    isFontLight
                />
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                    }}>
                    <Carousel
                        style={{
                            alignSelf: 'center',
                            zIndex: 10,
                        }}
                        itemWidth={screen_width - 20 || 340}
                        sliderWidth={screen_width || 360}
                        data={onboarding_data}
                        renderItem={renderItem}
                        layout="default"
                        onSnapToItem={(index: number) =>
                            setItemIndex(index + 1)
                        }
                    />
                </View>
                <SliderHandler sliderNumber={itemIndex} />
                <BasicButton
                    buttonText="Skip"
                    buttonHeight={43}
                    marginHorizontal={19}
                    marginTop={50}
                    borderRadius={20}
                    disabled={disableButton}
                    execFunc={() => skip_onboarding()}
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
    );
};

export default OnboardingPage;

const styles = StyleSheet.create({
    op_main: {
        flex: 1,
        backgroundColor: Colors.White,
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
        top: Platform?.OS === 'ios' ? 60 : 30,
        zIndex: 100,
    },
});
