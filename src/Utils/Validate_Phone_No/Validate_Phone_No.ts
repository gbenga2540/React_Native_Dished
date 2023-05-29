export const validate_phone_no = ({ phone_no }: { phone_no: string }) => {
        // eslint-disable-next-line no-useless-escape
        const model = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$/im;
        return model.test(phone_no);
};
