export const email_checker = (email: string) => {
    if (email?.length > 4 && email?.includes('@') && email.includes('.')) {
        return true;
    } else {
        return false;
    }
};
