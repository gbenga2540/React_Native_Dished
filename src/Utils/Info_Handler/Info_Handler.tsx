import { NavigationProp } from '@react-navigation/native';

interface InfoHandlerProps {
    navigation: NavigationProp<any>;
    success_mssg: string;
    svr_success_mssg?: string;
    proceed_type: number;
}

export const info_handler = ({
    navigation,
    success_mssg,
    svr_success_mssg,
    proceed_type,
}: InfoHandlerProps) => {
    navigation.navigate(
        'InfoPage' as never,
        {
            success_mssg: success_mssg,
            svr_success_mssg: svr_success_mssg,
            proceed_type: proceed_type,
        } as never,
    );
};
