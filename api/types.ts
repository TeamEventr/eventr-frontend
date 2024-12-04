export type LogInDetails = {
    userMail: string;
    passWord: string;
};

export type LogInResponse = {
    token: string;
    email: string;
    username: string;
    firstName: string;
    profilePictureURL: string;
};


export type EventListHomeResponse = {
    id: number;
    name: string;
    date: string;
    location: string;
    thumbnail: string;
}