import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import SearchIcon from '../../Images/Icons/Search_Icon.svg';
import Colors from '../../Configs/Colors/Colors';
import { fonts } from '../../Configs/Fonts/Fonts';

interface SearchBarProps {
    searchText: string;
    setSearchText: Dispatch<SetStateAction<string>>;
    onSubmit: () => void;
}

const SearchBar: FunctionComponent<SearchBarProps> = ({
    searchText,
    setSearchText,
    onSubmit,
}) => {
    return (
        <View style={styles.sb_main}>
            <SearchIcon
                color={'#686B6F'}
                width={22}
                height={22}
                style={{
                    marginHorizontal: 11,
                }}
            />
            <TextInput
                style={styles.sb_ti}
                placeholder={'Search for a dish...'}
                placeholderTextColor={Colors.InputTextPH}
                onChangeText={(text: string) => setSearchText(text)}
                value={searchText}
                autoCapitalize={'none'}
                autoCorrect={false}
                keyboardType="web-search"
                onSubmitEditing={() => onSubmit()}
                inputMode="search"
            />
        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    sb_main: {
        marginHorizontal: 20,
        flex: 1,
        borderWidth: 1,
        borderColor: '#D4D4D4',
        height: 50,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    sb_ti: {
        height: '100%',
        paddingHorizontal: 4,
        flex: 1,
        fontSize: 15,
        fontFamily: fonts.Lato_400,
    },
});
