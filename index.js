/**
 * @format
 */

import React from 'react';
import { AppRegistry, LogBox } from 'react-native';
import App from './src/App/App';
import { name as appName } from './app.json';

const Root = () => {
    return <App />;
};

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

AppRegistry.registerComponent(appName, () => Root);
