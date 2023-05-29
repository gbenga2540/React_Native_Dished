export interface Dish_Props {
        name: string;
        desc: string;
        image: string;
        discount?: boolean;
        price: string;
        discountedPrice?: string;
        discountedPercentage?: number;
        chefPick?: boolean;
        ratings: number;
        raters: number;
        dishType: string;
}
