export const user_info_reducer = (state = {}, action: any) => {
        switch (action.type) {
                case 'SET_USER_NAME':
                        return { ...state, userName: action.payload };
                case 'SET_USER_DP':
                        return { ...state, userDP: action.payload };
                case 'CLEAR_USER_INFO':
                        return {};
                default:
                        return state;
        }
};
