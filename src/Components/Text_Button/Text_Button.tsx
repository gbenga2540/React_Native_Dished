import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { fonts } from '../../Fonts/Fonts';
import Colors from '../../Colors/Colors';

interface TextButtonProps {
    buttonText: string;
    textColor?: string;
    marginLeft?: number | string;
    marginRight?: number | string;
    marginTop?: number | string;
    marginBottom?: number | string;
    isFontLight?: boolean;
    execFunc: () => void;
    disabled?: boolean;
}

const TextButton: FunctionComponent<TextButtonProps> = ({
    buttonText,
    textColor,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    isFontLight,
    execFunc,
    disabled,
}) => {
    return (
        <TouchableOpacity
            disabled={disabled || false}
            activeOpacity={0.65}
            onPress={() => execFunc()}
            style={[
                styles.t_b_main,
                {
                    marginLeft: marginLeft || 0,
                    marginRight: marginRight || 0,
                    marginTop: marginTop || 0,
                    marginBottom: marginBottom || 0,
                },
            ]}>
            <Text
                style={[
                    styles.t_b_m_txt,
                    {
                        color: textColor || Colors().Blue,
                        fontFamily: isFontLight
                            ? fonts.Poppins_400
                            : fonts.Poppins_700,
                    },
                ]}>
                {buttonText}
            </Text>
        </TouchableOpacity>
    );
};

export default TextButton;

const styles = StyleSheet.create({
    t_b_main: {
        alignItems: 'center',
    },
    t_b_m_txt: {
        fontSize: 16,
    },
});
