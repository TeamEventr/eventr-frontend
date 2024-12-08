export type SignUpDetails = {
    email: string;
    password: string;
    username: string;
};

export type SignUpResponse = {
    email: string;
    expiryAt: string;
    message: string;
    tempToken: string;
    username: string;
}

export type LogInDetails = {
    email: string;
    password: string;
};

export type LogInResponse = {
    email: string;
    firstName: string;
    profilePictureURL: string;
    token: string;
    username: string;
};

export type EventListHomeResponse = {
    id: string;
    title: string;
    startTime: string;
    venue: string;
    thumbnailURL: string;
}