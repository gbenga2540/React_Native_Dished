import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { fonts } from '../../Configs/Fonts/Fonts';

interface TextDividerProps {
    text?: string;
    marginTop?: number;
    marginBottom?: number;
}

const TextDivider: FunctionComponent<TextDividerProps> = ({
    text,
    marginTop,
    marginBottom,
}) => {
    return (
        <View
            style={[
                styles.t_d_main,
                { marginTop: marginTop || 0, marginBottom: marginBottom || 0 },
            ]}>
            <View style={styles.t_d_lines}>{''}</View>
            <Text style={styles.t_d_text}>{text || 'or'}</Text>
            <View style={styles.t_d_lines}>{''}</View>
        </View>
    );
};

export default TextDivider;

const styles = StyleSheet.create({
    t_d_main: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    t_d_lines: {
        borderColor: Colors().BorderLineGrey,
        flex: 1,
        borderBottomWidth: 1,
    },
    t_d_text: {
        marginHorizontal: 15,
        fontFamily: fonts.Poppins_700,
        fontSize: 16,
        lineHeight: 32,
        color: Colors().Black,
        height: 32,
        minHeight: 32,
        maxHeight: 32,
    },
});
