export const analyze_first_name = ({ name, slice }: { name: string; slice?: number }) => {
        const new_slice: number = slice === undefined || slice === null || slice < 8 ? 15 : slice;
        if (name) {
                if (name?.includes(' ')) {
                        const space_index = name?.indexOf(' ');
                        const new_name = name?.slice(0, space_index);
                        if (new_name?.length > new_slice) {
                                return `${new_name?.slice(0, new_slice)}...`;
                        } else {
                                return new_name;
                        }
                } else {
                        if (name?.length > new_slice) {
                                return `${name?.slice(0, new_slice)}...`;
                        } else {
                                return name;
                        }
                }
        } else {
                return '';
        }
};
