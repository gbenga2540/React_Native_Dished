import React, { FunctionComponent, useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Platform,
    FlatList,
    Text,
    Image,
} from 'react-native';
import Colors from '../../Colors/Colors';
import DishCard from '../../Components/Dish_Card/Dish_Card';
import SearchBar from '../../Components/Search_Bar/Search_Bar';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { fonts } from '../../Fonts/Fonts';
import { dummy_data } from '../../../temp/HomeData';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

const HomePage: FunctionComponent = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [displayPicture, setDisplayPicture] = useState<string>('none');

    useEffect(() => {
        if (auth().currentUser) {
            const dp_ref = storage().ref(
                `Users_Info/${auth().currentUser?.uid}/Display_Picture/dp.jpeg`,
            );
            try {
                dp_ref.getDownloadURL()?.then(res => {
                    if (res) {
                        setDisplayPicture(res);
                    }
                });
            } catch (error) {}
        }
    }, []);

    return (
        <View style={styles.home_page_main}>
            <CustomStatusBar />
            <ScrollView
                style={{
                    flex: 1,
                    paddingTop: Platform?.OS === 'ios' ? 60 : 20,
                }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.hp_w_i_c}>
                        {displayPicture === 'none' ? (
                            <Image
                                style={styles.hp_w_i}
                                source={require('../../Images/Logo/Default_User_Logo.jpg')}
                            />
                        ) : (
                            <Image
                                style={styles.hp_w_i}
                                source={{
                                    uri: displayPicture,
                                    width: 120,
                                    height: 120,
                                }}
                            />
                        )}
                    </View>
                    <SearchBar
                        searchText={searchText}
                        setSearchText={setSearchText}
                    />
                    <View style={{ marginTop: 20, marginBottom: 0 }}>
                        <Text
                            style={{
                                fontSize: 25,
                                fontFamily: fonts.Poppins_700,
                                color: Colors()?.Black,
                                marginLeft: 20,
                            }}>
                            Top Dishes
                        </Text>
                        <FlatList
                            data={dummy_data}
                            renderItem={({ item, index }) => {
                                return (
                                    <View
                                        style={{
                                            marginRight: 20,
                                            marginVertical: 20,
                                            marginLeft: index === 0 ? 20 : 0,
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
                                color: Colors()?.Black,
                                marginLeft: 20,
                            }}>
                            Latest Dishes
                        </Text>
                        <FlatList
                            data={dummy_data}
                            renderItem={({ item, index }) => {
                                return (
                                    <View
                                        style={{
                                            marginRight: 20,
                                            marginVertical: 20,
                                            marginLeft: index === 0 ? 20 : 0,
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
                                color: Colors()?.Black,
                                marginLeft: 20,
                            }}>
                            Favourites
                        </Text>
                        <FlatList
                            style={{ marginBottom: 100 }}
                            data={dummy_data}
                            renderItem={({ item, index }) => {
                                return (
                                    <View
                                        style={{
                                            marginRight: 20,
                                            marginVertical: 20,
                                            marginLeft: index === 0 ? 20 : 0,
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
    hp_w_i_c: {
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginRight: 20,
        borderRadius: 50,
        marginBottom: 20,
    },
    hp_w_i: {
        borderRadius: 50,
        width: 50,
        height: 50,
    },
});
