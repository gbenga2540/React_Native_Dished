import React, { Dispatch, FunctionComponent, useState } from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { fonts } from '../../Fonts/Fonts';
import Colors from '../../Colors/Colors';
import Feather from 'react-native-vector-icons/Feather';

interface SecureTextEntryProps {
    inputValue: string;
    placeHolderText?: string;
    setInputValue: Dispatch<React.SetStateAction<string>>;
}

const SecureTextEntry: FunctionComponent<SecureTextEntryProps> = ({
    inputValue,
    placeHolderText,
    setInputValue,
}) => {
    const [hidePswd, setHidePswd] = useState<boolean>(true);

    return (
        <KeyboardAvoidingView style={styles.b_t_e_main}>
            <TextInput
                style={styles.b_t_e_m_ti}
                placeholder={placeHolderText || 'password'}
                placeholderTextColor={Colors().InputTextPH}
                onChangeText={(text: string) => setInputValue(text?.trim())}
                value={inputValue}
                secureTextEntry={hidePswd}
            />
            {hidePswd ? (
                <TouchableOpacity
                    activeOpacity={0.65}
                    onPress={() => setHidePswd(!hidePswd)}
                    style={{ marginRight: 10 }}>
                    <Feather
                        name="eye"
                        size={25}
                        color={Colors().InputTextPH}
                    />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    activeOpacity={0.65}
                    onPress={() => setHidePswd(!hidePswd)}
                    style={{ marginRight: 10 }}>
                    <Feather
                        name="eye-off"
                        size={25}
                        color={Colors().InputTextPH}
                    />
                </TouchableOpacity>
            )}
        </KeyboardAvoidingView>
    );
};

export default SecureTextEntry;

const styles = StyleSheet.create({
    b_t_e_main: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        borderColor: Colors().BorderLineGrey,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    b_t_e_m_ti: {
        flex: 1,
        maxWidth: '100%',
        fontFamily: fonts.Poppins_400,
        fontSize: 16,
        height: 50,
        marginLeft: 10,
        marginRight: 10,
        textAlignVertical: 'center',
        color: Colors().InputText,
        letterSpacing: 0.2,
    },
});
