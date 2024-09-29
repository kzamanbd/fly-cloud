import moment from 'moment';

const dateFormat = (date: any) => {
    return {
        fromNow: () => moment(date).fromNow(),
        format: (format = 'LL') => moment(date).format(format)
    };
};

export default dateFormat;

