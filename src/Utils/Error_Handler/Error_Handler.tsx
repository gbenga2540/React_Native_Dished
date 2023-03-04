import { NavigationProp } from '@react-navigation/native';

interface ErrorHandlerProps {
    navigation: NavigationProp<any>;
    error_mssg: string;
    svr_error_mssg?: string;
}

export const error_handler = ({
    navigation,
    error_mssg,
    svr_error_mssg,
}: ErrorHandlerProps) => {
    navigation.navigate(
        'ErrorPage' as never,
        {
            error_mssg: error_mssg,
            svr_error_mssg: svr_error_mssg,
        } as never,
    );
};
