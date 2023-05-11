import React, { Dispatch, FunctionComponent } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { fonts } from '../../Configs/Fonts/Fonts';
import Colors from '../../Configs/Colors/Colors';
import FileUploadIcon from '../../Images/Icons/File_Upload_Icon.svg';

interface TextWithButtonProps {
    inputValue: string;
    placeHolderText?: string;
    setInputValue: Dispatch<React.SetStateAction<string>>;
    iconType?: string;
    execFunc: () => void;
    disabled?: boolean;
}

const TextWithButton: FunctionComponent<TextWithButtonProps> = ({
    inputValue,
    placeHolderText,
    setInputValue,
    iconType,
    execFunc,
    disabled,
}) => {
    return (
        <View style={styles.b_t_e_main}>
            <TextInput
                style={styles.b_t_e_m_ti}
                placeholder={placeHolderText || 'johndoe@gmail.com'}
                placeholderTextColor={Colors.InputTextPH}
                onChangeText={(text: string) => setInputValue(text?.trim())}
                value={inputValue}
                editable={false}
            />
            <TouchableOpacity
                disabled={disabled || false}
                activeOpacity={0.65}
                onPress={() => execFunc()}
                style={{
                    paddingHorizontal: 12,
                    justifyContent: 'center',
                }}>
                {iconType === 'file-upload' ||
                    (iconType === undefined && (
                        <FileUploadIcon width={24} height={24} />
                    ))}
            </TouchableOpacity>
        </View>
    );
};

export default TextWithButton;

const styles = StyleSheet.create({
    b_t_e_main: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        borderColor: Colors.BorderLineGrey,
        borderWidth: 1,
        flexDirection: 'row',
    },
    b_t_e_m_ti: {
        flex: 1,
        fontFamily: fonts.Poppins_400,
        fontSize: 16,
        marginLeft: 10,
        marginRight: 10,
        textAlignVertical: 'center',
        color: Colors.InputText,
    },
});
