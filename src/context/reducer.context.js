import { GET_DATA_MEMBER } from '../constant/endPoint';
import {
    CLEAR_UPDATE,
    CLEAR_UPDATE_MEMBER,
    DELETE_PROJECT,
    GET_ADMIN_MEMBER,
    GET_ADMIN_PROJECT,
    GET_DATA_USER,
    GET_PROJECT_DATA,
    HIDE_ADD_MEMBER,
    HIDE_ADD_PROJECT,
    HIDE_EDIT_MEMBER,
    HIDE_EDIT_PROJECT,
    HIDE_NOTIFY,
    LOGGED,
    LOGGOUT,
    SHOW_ADD_MEMBER,
    SHOW_ADD_PROJECT,
    SHOW_EDIT_MEMBER,
    SHOW_EDIT_PROJECT,
    SHOW_NOTIFY,
    UPDATATE_PROJECT,
    UPDATE_MEMBER,
} from './constant.context';

export const initState = {
    login: false,
    userData: {
        type: 'member',
    },
    editProject: null,
};

export const reducer = (state, action) => {
    console.log(action);

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
        case LOGGOUT: {
            return initState;
        }

        case SHOW_EDIT_PROJECT: {
            return {
                ...state,
                editProject: {
                    status: true,
                    data: action.payload,
                },
            };
        }

        case HIDE_EDIT_PROJECT: {
            return {
                ...state,
                editProject: null,
            };
        }

        case GET_PROJECT_DATA: {
            return {
                ...state,
                projects: action.payload,
            };
        }

        case UPDATATE_PROJECT: {
            return {
                ...state,
                projectUpdated: {
                    status: true,
                    data: action.payload,
                },
            };
        }

        case CLEAR_UPDATE: {
            return {
                ...state,
                projectUpdated: {
                    status: false,
                    data: '',
                },
            };
        }

        case DELETE_PROJECT: {
            return {
                ...state,
            };
        }

        case SHOW_ADD_PROJECT: {
            return {
                ...state,
                addProject: {
                    status: true,
                },
            };
        }
        case HIDE_ADD_PROJECT: {
            return {
                ...state,
                addProject: false,
            };
        }

        case SHOW_ADD_MEMBER: {
            return {
                ...state,
                addMember: true,
            };
        }

        case HIDE_ADD_MEMBER: {
            return {
                ...state,
                addMember: false,
            };
        }

        case SHOW_NOTIFY: {
            return {
                ...state,
                notify: {
                    data: action.payload,
                    show: true,
                },
            };
        }
        case HIDE_NOTIFY: {
            return {
                ...state,
                notify: {
                    data: null,
                    show: false,
                },
            };
        }
        case GET_ADMIN_PROJECT: {
            return {
                ...state,
                adminProjectData: action.payload,
            };
        }

        case GET_ADMIN_MEMBER: {
            return {
                ...state,
                adminMemberData: action.payload,
            };
        }
        case SHOW_EDIT_MEMBER: {
            return {
                ...state,
                editMember: {
                    show: true,
                    data: action.payload,
                },
            };
        }

        case HIDE_EDIT_MEMBER: {
            return {
                ...state,
                editMember: {
                    show: false,
                    data: null,
                },
            };
        }
        case UPDATE_MEMBER: {
            return {
                ...state,
                updateMember: {
                    status: true,
                    data: action.payload,
                },
            };
        }
        case CLEAR_UPDATE_MEMBER: {
            return {
                ...state,
                updateMember: {
                    status: false,
                    data: null,
                },
            };
        }
        default: {
            console.log('Invalid Action');
            console.log('Fail: ', action);
            return state;
        }
    }
};
