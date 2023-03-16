import React, { FunctionComponent } from 'react';
import { StatusBar } from 'react-native';
import Colors from '../../Colors/Colors';

interface CustomStatusBarProps {
    showSpinner?: boolean;
    backgroundColor?: string;
    backgroundDimColor?: string;
    barStyleLight?: boolean;
}

const CustomStatusBar: FunctionComponent<CustomStatusBarProps> = ({
    showSpinner,
    backgroundColor,
    backgroundDimColor,
    barStyleLight,
}) => {
    const p_showSpinner: boolean = showSpinner ? showSpinner : false;
    const p_backgroundColor: string = backgroundColor
        ? backgroundColor
        : Colors().Background;
    const p_backgroundDimColor: string = backgroundDimColor
        ? backgroundDimColor
        : 'rgba(0, 0, 0, 0.8)';
    const p_barStyle = barStyleLight ? 'light-content' : 'dark-content';
    return (
        <StatusBar
            barStyle={p_showSpinner ? 'light-content' : p_barStyle}
            backgroundColor={
                p_showSpinner ? p_backgroundDimColor : p_backgroundColor
            }
        />
    );
};

export default CustomStatusBar;
