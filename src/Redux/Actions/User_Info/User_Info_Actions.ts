export const set_user_name = ({ user_name }: { user_name: string }) => {
        return {
                type: 'SET_USER_NAME',
                payload: user_name,
        };
};

export const set_user_dp = ({ user_dp }: { user_dp: string }) => {
        return {
                type: 'SET_USER_DP',
                payload: user_dp,
        };
};

export const clear_user_info = () => {
        return {
                type: 'CLEAR_USER_INFO',
        };
};
