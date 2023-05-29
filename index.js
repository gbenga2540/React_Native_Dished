/**
 * @format
 */

import React from 'react';
import { AppRegistry, LogBox } from 'react-native';
import App from './src/App/App';
import { name as appName } from './app.json';
import store from './src/Configs/Redux_Store/Redux_Store';
import { Provider } from 'react-redux';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state', 'ViewPropTypes']);

const Root = () => {
        return (
                <Provider store={store}>
                        <App />
                </Provider>
        );
};

AppRegistry.registerComponent(appName, () => Root);
