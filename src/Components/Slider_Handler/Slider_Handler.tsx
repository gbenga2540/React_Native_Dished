import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../Colors/Colors';

interface SliderHandlerProps {
    sliderNumber?: number;
    totalSliderCount?: number;
}

const SliderHandler: FunctionComponent<SliderHandlerProps> = ({
    sliderNumber,
    totalSliderCount,
}) => {
    return (
        <View style={styles.s_h_main}>
            {[...Array(totalSliderCount || 4)]?.map((e, i) => (
                <View
                    style={
                        (sliderNumber || 1) === i + 1
                            ? styles.s_h_m_dot_current
                            : styles.s_h_m_dot
                    }
                    key={i}>
                    {''}
                </View>
            ))}
        </View>
    );
};

export default SliderHandler;

const styles = StyleSheet.create({
    s_h_main: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    s_h_m_dot: {
        width: 8,
        height: 8,
        borderRadius: 8,
        backgroundColor: Colors().Dot,
        marginLeft: 2,
        marginRight: 2,
    },
    s_h_m_dot_current: {
        width: 19,
        height: 8,
        borderRadius: 8,
        backgroundColor: Colors().Secondary,
        marginLeft: 2,
        marginRight: 2,
    },
});
