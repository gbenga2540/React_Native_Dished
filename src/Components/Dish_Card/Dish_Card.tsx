import React, { FunctionComponent, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dish_Props } from '../../Interface/Dish_Props/Dish_Props';
import StarIcon from '../../Images/Icons/Star_Icon.svg';
import { fonts } from '../../Configs/Fonts/Fonts';
import Colors from '../../Configs/Colors/Colors';
import { shorten_text } from '../../Utils/Shorten_Text/Shorten_Text';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

interface DishCard_Props {
    dish: Dish_Props;
}
const DishCard: FunctionComponent<DishCard_Props> = ({ dish }) => {
    const [liked, setLiked] = useState<boolean | null>(false);

    const nav_to_dish_dets = () => {
        console.log(dish?.name);
    };

    return (
        <View style={styles.dc_main}>
            <TouchableOpacity
                onPress={() => nav_to_dish_dets()}
                activeOpacity={1}
                style={styles.dc_img_fav}>
                <TouchableOpacity
                    activeOpacity={0.65}
                    style={styles.dc_fav}
                    onPress={() => setLiked(!liked)}>
                    {liked ? (
                        <Entypo
                            name="heart"
                            size={20}
                            color={Colors().Secondary}
                        />
                    ) : (
                        <Feather
                            name="heart"
                            size={17}
                            color={Colors().Black}
                        />
                    )}
                </TouchableOpacity>
                <Image
                    style={styles.dc_img}
                    source={require('../../../temp/Dish.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => nav_to_dish_dets()}
                style={styles.dc_info}>
                <Text style={styles.dc_name}>
                    {shorten_text({ text: dish?.name, limit: 20 })}
                </Text>
                {dish?.discount ? (
                    <View style={styles.dc_price_cont}>
                        <Text style={styles.dc_dprice}>
                            {`₦${dish?.discountedPrice}`}
                        </Text>
                        <Text style={styles.dc_price}>{`₦${dish?.price}`}</Text>
                        <Text
                            style={
                                styles.dc_dpercent
                            }>{`${dish?.discountedPercentage}% OFF`}</Text>
                    </View>
                ) : (
                    <View style={styles.dc_price_cont}>
                        <Text style={styles.dc_dprice}>
                            {`₦${dish?.price}`}
                        </Text>
                    </View>
                )}
                <Text style={styles.dc_desc}>
                    {shorten_text({ text: dish?.desc, limit: 85 })}
                </Text>
                <View style={styles.dc_rate_cont}>
                    <StarIcon
                        width={20}
                        height={20}
                        color={'#FFE202'}
                        style={{ marginRight: 4 }}
                    />
                    <Text style={styles.dc_ratings}>
                        {dish?.ratings?.toFixed(1)}
                    </Text>
                    <Text style={styles.dc_raters}>{`(${dish?.raters})`}</Text>
                    <Text style={styles.dc_dt}>{dish?.dishType}</Text>
                    {dish?.chefPick && (
                        <Text style={styles.dc_chefp}>CHEF PICK</Text>
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default DishCard;

const styles = StyleSheet.create({
    dc_main: {
        width: 284,
        maxWidth: 284,
        // height: 312,
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 10,
        backgroundColor: 'white',
    },
    dc_img_fav: {
        width: 284,
        height: 156,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    dc_fav: {
        position: 'absolute',
        zIndex: 2,
        width: 32,
        height: 32,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        right: 8,
        top: 10,
    },
    dc_img: {
        width: 284,
        height: 156,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        resizeMode: 'cover',
    },
    dc_info: {
        padding: 16,
        // minHeight: 156,
    },
    dc_name: {
        fontFamily: fonts.Lato_400,
        color: Colors().DarkGrey,
        fontSize: 20,
        lineHeight: 24,
    },
    dc_price_cont: {
        marginVertical: 4,
        flexDirection: 'row',
    },
    dc_dprice: {
        fontFamily: fonts.Lato_800,
        color: Colors().DarkGrey,
        fontSize: 16,
        lineHeight: 20,
        marginRight: 8,
    },
    dc_price: {
        fontFamily: fonts.Lato_800,
        color: Colors().LightGrey,
        fontSize: 16,
        lineHeight: 20,
        marginRight: 'auto',
        textDecorationLine: 'line-through',
    },
    dc_dpercent: {
        color: Colors().Green,
        backgroundColor: Colors().LightGreen,
        paddingVertical: 4,
        paddingHorizontal: 8,
        fontFamily: fonts.Lato_800,
        fontSize: 12,
        borderRadius: 8,
    },
    dc_desc: {
        color: Colors().MeduimGrey,
        fontSize: 13,
        fontFamily: fonts.Lato_400,
        lineHeight: 16,
        marginBottom: 16,
    },
    dc_rate_cont: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dc_ratings: {
        fontFamily: fonts.Lato_700,
        fontSize: 12,
        color: Colors().DarkGrey,
    },
    dc_raters: {
        fontFamily: fonts.Lato_400,
        fontSize: 12,
        color: Colors().DarkGrey,
        marginLeft: 1,
        marginRight: 8,
    },
    dc_dt: {
        fontFamily: fonts.Lato_700,
        fontSize: 12,
        color: Colors().DarkGrey,
        marginRight: 'auto',
    },
    dc_chefp: {
        color: Colors().MeduimBlue,
        backgroundColor: Colors().LightBlue,
        paddingVertical: 4,
        paddingHorizontal: 8,
        fontFamily: fonts.Lato_800,
        fontSize: 12,
        borderRadius: 8,
    },
});
