import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Spinner, { SpinnerType } from 'react-native-spinkit';
import { spinkit_types } from '../../Data/Spinkit_Types/SpinKit_Types';
import Colors from '../../Colors/Colors';
import Feather from 'react-native-vector-icons/Feather';

interface ShowSpinnerProps {
    showSpinner: boolean;
    setShowSpinner: Dispatch<SetStateAction<boolean>>;
}
const OverlaySpinner: FunctionComponent<ShowSpinnerProps> = ({
    showSpinner,
    setShowSpinner,
}) => {
    if (showSpinner) {
        return (
            <View style={styles.overlay_spinner_main}>
                <TouchableOpacity
                    onPress={() => setShowSpinner(false)}
                    style={{
                        position: 'absolute',
                        left: 20,
                        top: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Feather
                        name="chevron-left"
                        size={35}
                        color={Colors().White}
                    />
                </TouchableOpacity>
                <Spinner
                    isVisible={true}
                    size={80}
                    type={spinkit_types[6] as SpinnerType}
                    color={Colors().Secondary}
                />
            </View>
        );
    } else {
        return null;
    }
};

export default OverlaySpinner;

const styles = StyleSheet.create({
    overlay_spinner_main: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
});
