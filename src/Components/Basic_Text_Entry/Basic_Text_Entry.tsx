import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { KeyboardAvoidingView, StyleSheet, TextInput } from 'react-native';
import { fonts } from '../../Fonts/Fonts';
import Colors from '../../Colors/Colors';

interface BasicTextEntryProps {
    inputValue: string;
    placeHolderText?: string;
    setInputValue: Dispatch<SetStateAction<string>>;
}

const BasicTextEntry: FunctionComponent<BasicTextEntryProps> = ({
    inputValue,
    placeHolderText,
    setInputValue,
}) => {
    return (
        <KeyboardAvoidingView style={styles.b_t_e_main}>
            <TextInput
                style={styles.b_t_e_m_ti}
                placeholder={placeHolderText || 'johndoe@gmail.com'}
                placeholderTextColor={Colors().InputTextPH}
                onChangeText={(text: string) => setInputValue(text)}
                value={inputValue}
                autoCapitalize={'none'}
                autoCorrect={false}
            />
        </KeyboardAvoidingView>
    );
};

export default BasicTextEntry;

const styles = StyleSheet.create({
    b_t_e_main: {
        flex: 1,
        height: 50,
        borderRadius: 10,
        borderColor: Colors().BorderLineGrey,
        borderWidth: 1,
    },
    b_t_e_m_ti: {
        flex: 1,
        height: '100%',
        fontFamily: fonts.Poppins_400,
        fontSize: 16,
        marginLeft: 10,
        marginRight: 10,
        textAlignVertical: 'center',
        color: Colors().InputText,
    },
});
