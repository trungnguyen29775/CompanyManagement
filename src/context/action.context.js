import { GET_DATA_USER, LOGGED, LOGGOUT } from './constant.context';

export const logged = () => {
    return {
        type: LOGGED,
    };
};

export const getDataUser = (payload) => {
    return {
        type: GET_DATA_USER,
        payload,
    };
};

export const loggout = () => {
    return {
        type: LOGGOUT,
    };
};
