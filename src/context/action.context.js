import { type } from '@testing-library/user-event/dist/type';
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

export const logged = (payload) => {
    return {
        type: LOGGED,
        payload,
    };
};

export const getDataUser = (payload) => {
    return {
        type: GET_DATA_USER,
        payload,
    };
};

export const loggout = (payload) => {
    return {
        type: LOGGOUT,
        payload,
    };
};

export const showEditProject = (payload) => {
    return {
        type: SHOW_EDIT_PROJECT,
        payload,
    };
};

export const hideEditProject = (payload) => {
    return {
        type: HIDE_EDIT_PROJECT,
        payload,
    };
};

export const getProjectData = (payload) => {
    return {
        type: GET_PROJECT_DATA,
        payload,
    };
};

export const updateProject = (payload) => {
    return {
        type: UPDATATE_PROJECT,
        payload,
    };
};

export const deleteProject = (payload) => {
    return {
        type: DELETE_PROJECT,
        payload,
    };
};

export const clearUpdate = (payload) => {
    return {
        type: CLEAR_UPDATE,
        payload,
    };
};

export const showAddProject = (payload) => {
    return {
        type: SHOW_ADD_PROJECT,
        payload,
    };
};

export const hideAddProject = (payload) => {
    return {
        type: HIDE_ADD_PROJECT,
        payload,
    };
};

export const showAddMember = (payload) => {
    return {
        type: SHOW_ADD_MEMBER,
        payload,
    };
};

export const hideAddMember = (payload) => {
    return {
        type: HIDE_ADD_MEMBER,
        payload,
    };
};

export const showNotify = (payload) => {
    return {
        type: SHOW_NOTIFY,
        payload,
    };
};

export const hideNotify = (payload) => {
    return {
        type: HIDE_NOTIFY,
        payload,
    };
};

export const getAdminProject = (payload) => {
    return {
        type: GET_ADMIN_PROJECT,
        payload,
    };
};

export const getAdminMember = (payload) => {
    return {
        type: GET_ADMIN_MEMBER,
        payload,
    };
};

export const showEditMember = (payload) => {
    return {
        type: SHOW_EDIT_MEMBER,
        payload,
    };
};

export const hideEditMember = (payload) => {
    return {
        type: HIDE_EDIT_MEMBER,
        payload,
    };
};

export const updateMember = (payload) => {
    return {
        type: UPDATE_MEMBER,
        payload,
    };
};

export const clearUpdateMember = (payload) => {
    return {
        type: CLEAR_UPDATE_MEMBER,
        payload,
    };
};
