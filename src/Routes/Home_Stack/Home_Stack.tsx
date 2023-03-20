import React, { FunctionComponent } from 'react';
import { StyleSheet, Platform, Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../../Colors/Colors';
import { fonts } from '../../Fonts/Fonts';
import Feather from 'react-native-vector-icons/Feather';
import HomePage from '../../Screens/Home_Page/Home_Page';
import CartPage from '../../Screens/Cart_Page/Cart_Page';
import FavouritePage from '../../Screens/Favourite_Page/Favourite_Page';
import BookingPage from '../../Screens/Booking_Page/Booking_Page';
import SettingsPage from '../../Screens/Settings_Page/Settings_Page';
import { useSelector } from 'react-redux';

type HomeStackParamList = {
    HomePage: {};
    BookingPage: {};
    FavouritePage: {};
    CartPage: {};
    SettingsPage: {};
};
const Home_Stack = createBottomTabNavigator<HomeStackParamList>();

const HomeStack: FunctionComponent = () => {
    const userInfo = useSelector((state: any) => state?.UserInfo);

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
                tabBarShowLabel: true,
            }}>
            <Home_Stack.Screen
                name="HomePage"
                component={HomePage}
                options={{
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: ({ color }) => (
                        <Feather name="home" size={25} color={color} />
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
                        <Feather name="calendar" size={25} color={color} />
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
                        <Feather name="heart" size={25} color={color} />
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
                        <Feather name="shopping-bag" size={25} color={color} />
                    ),
                    tabBarLabel: 'Cart',
                }}
            />
            <Home_Stack.Screen
                name="SettingsPage"
                component={SettingsPage}
                options={{
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: (
                        { color }, // eslint-disable-line @typescript-eslint/no-unused-vars
                    ) => (
                        // <Feather name="settings" size={30} color={color} />
                        <View style={styles.tb_i_c}>
                            {userInfo?.userDP ? (
                                <Image
                                    style={styles.tb_i}
                                    source={{
                                        uri: userInfo?.userDP,
                                        width: 28,
                                        height: 28,
                                    }}
                                />
                            ) : (
                                <Image
                                    style={styles.tb_i}
                                    source={require('../../Images/Logo/Default_User_Logo.jpg')}
                                />
                            )}
                        </View>
                    ),
                    tabBarLabel: 'User',
                }}
            />
        </Home_Stack.Navigator>
    );
};

export default HomeStack;

const styles = StyleSheet.create({
    tabBar_main: {
        height: Platform.OS === 'ios' ? 92 : 75,
        paddingBottom: Platform.OS === 'ios' ? 30 : 13,
        backgroundColor: Colors().Background,
    },
    tabBar_label: {
        fontFamily: fonts.Poppins_400,
        fontSize: 12,
    },
    tabBar_icon: {
        marginTop: 7,
    },
    tb_i_c: {
        borderRadius: 28,
    },
    tb_i: {
        borderRadius: 28,
        width: 28,
        height: 28,
    },
});
