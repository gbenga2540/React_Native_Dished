import React, { FunctionComponent } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ParamListBase } from '@react-navigation/native';
import Colors from '../../Colors/Colors';
import { fonts } from '../../Fonts/Fonts';
import BookingIcon from '../../Images/Icons/Booking_Icon.svg';
import CartIcon from '../../Images/Icons/Cart_Icon.svg';
import HomeIcon from '../../Images/Icons/Home_Icon.svg';
import FavouriteIcon from '../../Images/Icons/Favourite_Icon.svg';
import HomePage from '../../Screens/Home_Page/Home_Page';
import CartPage from '../../Screens/Cart_Page/Cart_Page';
import FavouritePage from '../../Screens/Favourite_Page/Favourite_Page';
import BookingPage from '../../Screens/Booking_Page/Booking_Page';

const Home_Stack = createBottomTabNavigator<ParamListBase>();

const HomeStack: FunctionComponent = () => {
    return (
        <Home_Stack.Navigator
            initialRouteName="HomePage"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors().Secondary,
                tabBarInactiveTintColor: Colors().InputTextGrey,
                tabBarStyle: styles.tabBar_main,
                tabBarLabelStyle: styles.tabBar_label,
                tabBarIconStyle: styles.tabBar_icon,
            }}>
            <Home_Stack.Screen
                name="HomePage"
                component={HomePage}
                options={{
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: ({ color }) => (
                        <HomeIcon color={color} width={25} height={25} />
                    ),
                    tabBarLabel: 'Home',
                }}
            />
            <Home_Stack.Screen
                name="BookingPage"
                component={BookingPage}
                options={{
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: ({ color }) => (
                        <BookingIcon color={color} width={25} height={25} />
                    ),
                    tabBarLabel: 'Booking',
                }}
            />
            <Home_Stack.Screen
                name="FavouritePage"
                component={FavouritePage}
                options={{
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: ({ color }) => (
                        <FavouriteIcon color={color} width={25} height={25} />
                    ),
                    tabBarLabel: 'Favourite',
                }}
            />
            <Home_Stack.Screen
                name="CartPage"
                component={CartPage}
                options={{
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: ({ color }) => (
                        <CartIcon color={color} width={25} height={25} />
                    ),
                    tabBarLabel: 'Cart',
                }}
            />
        </Home_Stack.Navigator>
    );
};

export default HomeStack;

const styles = StyleSheet.create({
    tabBar_main: {
        height: Platform.OS === 'ios' ? 90 : 65,
        paddingBottom: Platform.OS === 'ios' ? 30 : 13,
        backgroundColor: Colors().Background,
    },
    tabBar_label: {
        fontFamily: fonts.Poppins_400,
        fontSize: 12,
    },
    tabBar_icon: {
        marginTop: 10,
    },
});
