export const phone_no_converter = ({ phone_no, country_code }: { phone_no: string; country_code?: string }) => {
        const processed_country_code: string = country_code ? country_code : '234';
        if (phone_no?.length > 8) {
                if (phone_no?.includes('+')) {
                        return phone_no;
                } else if (phone_no?.slice(0, 1) === '0') {
                        return `+${processed_country_code}${phone_no?.slice(1, phone_no?.length)}`;
                } else {
                        return `+${processed_country_code}${phone_no?.slice(0, phone_no?.length)}`;
                }
        } else {
                return '';
        }
};
