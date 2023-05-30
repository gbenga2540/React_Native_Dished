import { Onboarding_Props } from '../../Interface/Onboarding_Props/Onboarding_Props';

export const onboarding_data: Onboarding_Props[] = [
    {
        id: 1,
        text: 'Various selection of foods from favorite restaurant!',
        image: require('../../Images/Onboarding/Food_1.png'),
        subtext: 'Our restaurants serves a wide variety of food',
    },
    {
        id: 2,
        text: 'Use the app to reserve your table from your favorite restaurant',
        image: require('../../Images/Onboarding/Food_2.png'),
        subtext: 'Select a date and reserve a seat in the restaurant',
    },
    {
        id: 3,
        text: 'Home delivery with real time tracking available',
        image: require('../../Images/Onboarding/Food_3.png'),
        subtext:
            'We provide a stress-free home delivery service with real-time tracking',
    },
    {
        id: 4,
        text: 'Instant notification on your WhatsApp and scheduling',
        image: require('../../Images/Onboarding/Food_4.png'),
        subtext: 'Your scheduled meals and orders can be tracked with WhatsApp',
    },
];
