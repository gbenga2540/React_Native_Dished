import React, { FunctionComponent, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Colors/Colors';
import DishCard from '../../Components/Dish_Card/Dish_Card';
import { Dish_Props } from '../../Interface/Dish_Props/Dish_Props';
import SearchBar from '../../Components/Search_Bar/Search_Bar';

const HomePage: FunctionComponent = () => {
    const dummy_data: Dish_Props = {
        name: 'CheeseCake',
        desc: 'The main, and thickest, layer consists of a mixture of a soft, fresh cheese eggs, and sugar.',
        discount: true,
        price: '4500',
        discountedPrice: '3375',
        image: require('../../../temp/Dish.png'),
        raters: 2534,
        ratings: 4.9,
        chefPick: true,
        discountedPercentage: 25,
        dishType: 'Main Course',
    };
    const [searchText, setSearchText] = useState<string>('');
    return (
        <View style={styles.home_page_main}>
            <StatusBar
                backgroundColor={Colors().Background}
                barStyle={'dark-content'}
            />
            <ScrollView style={{ flex: 1, paddingTop: 80 }}>
                <View style={{ flex: 1 }}>
                    <SearchBar
                        searchText={searchText}
                        setSearchText={setSearchText}
                    />

                    <View style={{ margin: 20, marginBottom: 0 }}>
                        <DishCard dish={dummy_data} />
                    </View>
                    <View style={{ margin: 20, marginBottom: 0 }}>
                        <DishCard dish={dummy_data} />
                    </View>
                    <View style={{ margin: 20, marginBottom: 0 }}>
                        <DishCard dish={dummy_data} />
                    </View>
                    <View style={{ margin: 20, marginBottom: 0 }}>
                        <DishCard dish={dummy_data} />
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
