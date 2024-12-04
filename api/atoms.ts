import { atom } from "recoil";

export const showLoginModalState = atom({
    key: 'showLoginModalState',
    default: false,
});


export const authState = atom({
    key: 'authState',
    default: {
        auth: false,
        user: {
            username: '',
            firstName: '',
            email: '',
            profilePictureURL: '',
        },
    },
});