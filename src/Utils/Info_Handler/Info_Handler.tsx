import { NavigationProp } from '@react-navigation/native';

interface InfoHandlerProps {
    navigation: NavigationProp<any>;
    success_mssg: string;
    svr_success_mssg?: string;
    proceed_type: number;
    hide_back_btn?: boolean;
}

export const info_handler = ({
    navigation,
    success_mssg,
    svr_success_mssg,
    proceed_type,
    hide_back_btn,
}: InfoHandlerProps) => {
    navigation.navigate(
        'InfoPage' as never,
        {
            success_mssg: success_mssg,
            svr_success_mssg: svr_success_mssg,
            proceed_type: proceed_type,
            hide_back_btn: hide_back_btn || false,
        } as never,
    );
};
