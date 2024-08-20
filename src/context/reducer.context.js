import { GET_DATA_USER, LOGGED } from './constant.context';

export const initState = {
    login: false,
    userData: {
        type: 'member',
    },
};

export const reducer = (state, action) => {
    switch (action.type) {
        case LOGGED: {
            return {
                ...state,
                login: true,
            };
        }
        case GET_DATA_USER: {
            return {
                ...state,
                userData: action.payload,
            };
        }
        default: {
            console.log('Invalid Action');
            return state;
        }
    }
};
