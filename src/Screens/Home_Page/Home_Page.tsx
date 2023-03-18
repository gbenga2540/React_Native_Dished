import React, { FunctionComponent, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Platform,
    FlatList,
    Text,
} from 'react-native';
import Colors from '../../Colors/Colors';
import DishCard from '../../Components/Dish_Card/Dish_Card';
import SearchBar from '../../Components/Search_Bar/Search_Bar';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { fonts } from '../../Fonts/Fonts';
import { dummy_data } from '../../../temp/HomeData';

const HomePage: FunctionComponent = () => {
    const [searchText, setSearchText] = useState<string>('');

    return (
        <View style={styles.home_page_main}>
            <CustomStatusBar />
            <ScrollView
                style={{
                    flex: 1,
                    paddingTop: Platform?.OS === 'ios' ? 80 : 35,
                }}>
                <View style={{ flex: 1 }}>
                    <SearchBar
                        searchText={searchText}
                        setSearchText={setSearchText}
                    />
                    <View style={{ margin: 20, marginBottom: 0 }}>
                        <Text
                            style={{
                                fontSize: 25,
                                fontFamily: fonts.Poppins_700,
                            }}>
                            Top Dishes
                        </Text>
                        <FlatList
                            data={dummy_data}
                            renderItem={({ item }) => {
                                return (
                                    <View
                                        style={{
                                            marginRight: 20,
                                            marginVertical: 20,
                                        }}>
                                        <DishCard dish={item} />
                                    </View>
                                );
                            }}
                            keyExtractor={item => item.name}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                        <Text
                            style={{
                                fontSize: 25,
                                fontFamily: fonts.Poppins_700,
                            }}>
                            Latest Dishes
                        </Text>
                        <FlatList
                            data={dummy_data}
                            renderItem={({ item }) => {
                                return (
                                    <View
                                        style={{
                                            marginRight: 20,
                                            marginVertical: 20,
                                        }}>
                                        <DishCard dish={item} />
                                    </View>
                                );
                            }}
                            keyExtractor={item => item.name}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                        <Text
                            style={{
                                fontSize: 25,
                                fontFamily: fonts.Poppins_700,
                            }}>
                            Favourites
                        </Text>
                        <FlatList
                            style={{ marginBottom: 100 }}
                            data={dummy_data}
                            renderItem={({ item }) => {
                                return (
                                    <View
                                        style={{
                                            marginRight: 20,
                                            marginVertical: 20,
                                        }}>
                                        <DishCard dish={item} />
                                    </View>
                                );
                            }}
                            keyExtractor={item => item.name}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default HomePage;

const styles = StyleSheet.create({
    home_page_main: {
        flex: 1,
        backgroundColor: Colors().Background,
    },
});
