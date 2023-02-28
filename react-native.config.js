module.exports = {
    project: {
        ios: {
            sourceDir: './ios',
        },
        android: {},
    },
    assets: ['./src/Fonts'],
    dependencies: {
        'react-native-splash-screen': {
            platforms: {
                ios: null, // disable ios platform, other platforms will still autolink if provided
            },
        },
    },
};
