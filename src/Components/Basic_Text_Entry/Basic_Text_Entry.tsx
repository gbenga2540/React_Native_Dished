import React, { Dispatch, FunctionComponent } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { fonts } from '../../Fonts/Fonts';
import Colors from '../../Colors/Colors';

interface BasicTextEntryProps {
    inputValue: string;
    placeHolderText?: string;
    setInputValue: Dispatch<React.SetStateAction<string>>;
}

const BasicTextEntry: FunctionComponent<BasicTextEntryProps> = ({
    inputValue,
    placeHolderText,
    setInputValue,
}) => {
    return (
        <View style={styles.b_t_e_main}>
            <TextInput
                style={styles.b_t_e_m_ti}
                placeholder={placeHolderText || 'johndoe@gmail.com'}
                placeholderTextColor={Colors().InputTextPH}
                onChangeText={(text: string) => setInputValue(text?.trim())}
                value={inputValue}
            />
        </View>
    );
};

export default BasicTextEntry;

const styles = StyleSheet.create({
    b_t_e_main: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        borderColor: Colors().BorderLineGrey,
        borderWidth: 1,
    },
    b_t_e_m_ti: {
        width: '100%',
        height: '100%',
        fontFamily: fonts.Poppins_400,
        fontSize: 16,
        marginLeft: 10,
        marginRight: 10,
        textAlignVertical: 'center',
        color: Colors().InputText,
    },
});
