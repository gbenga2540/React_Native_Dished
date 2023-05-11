import React, {
    Dispatch,
    FunctionComponent,
    SetStateAction,
    useState,
} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../Configs/Colors/Colors';
import { fonts } from '../../Configs/Fonts/Fonts';

interface DropDownProps {
    borderColor?: string;
    backgroundColor?: string;
    showLabel?: boolean;
    labelTitle?: string;
    dropdownData: { label: string; value: string }[];
    focusPlaceHolder?: string;
    unFocusPlaceHolder?: string;
    value: any;
    setValue: Dispatch<SetStateAction<any>>;
}

const RNDropDown: FunctionComponent<DropDownProps> = ({
    borderColor,
    backgroundColor,
    showLabel,
    labelTitle,
    dropdownData,
    focusPlaceHolder,
    unFocusPlaceHolder,
    value,
    setValue,
}) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text
                    style={[
                        styles.label,
                        {
                            backgroundColor:
                                backgroundColor || Colors.Background,
                        },
                        isFocus && { color: borderColor || Colors.Primary },
                    ]}>
                    {labelTitle || 'Select'}
                </Text>
            );
        }
        return null;
    };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: backgroundColor || Colors.Background },
            ]}>
            {(showLabel || false) && renderLabel()}
            <Dropdown
                style={[
                    styles.dropdown,
                    isFocus && { borderColor: borderColor || Colors.Primary },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={styles.itemTextStyle}
                iconStyle={styles.iconStyle}
                data={dropdownData}
                search={false}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={
                    !isFocus
                        ? unFocusPlaceHolder || 'Select Option'
                        : focusPlaceHolder || '...'
                }
                searchPlaceholder="Search..."
                value={value || dropdownData[0]?.value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value as any);
                    setIsFocus(false);
                }}
                // renderLeftIcon={() => (
                //     <AntDesign
                //         style={styles.icon}
                //         color={
                //             isFocus ? borderColor || Colors.Primary : 'black'
                //         }
                //         name="Safety"
                //         size={20}
                //     />
                // )}
                renderLeftIcon={() => null}
            />
        </View>
    );
};

export default RNDropDown;

const styles = StyleSheet.create({
    container: {
        padding: 0,
        paddingBottom: 0,
        paddingTop: 5,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingLeft: 16,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        fontFamily: fonts.Poppins_400,
        color: Colors.InputText,
    },
    selectedTextStyle: {
        fontSize: 16,
        fontFamily: fonts.Poppins_400,
        color: Colors.InputText,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    itemTextStyle: {
        fontFamily: fonts.Poppins_400,
        color: Colors.InputText,
    },
});
