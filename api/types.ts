export type EventListHomeResponse = {
  id: string;
  title: string;
  startTime: string;
  venue: string;
  thumbnailURL: string;
};

export type TopTwoTicketsResponse = {
  id: string;
  title: string;
  startTime: string;
  venue: string;
  thumbnailURL: string;
};

export namespace Auth {
  export type LogInRequest = {
    username: string;
    password: string;
  };

  export type LogInResponse = {
    message: string;
    token: string;
    username: string;
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
    profilePictureURL: string;
  };
  export type RegisterRequest = {
    email: string;
    password: string;
    username: string;
  };

  export type RegisterResponse = {
    email: string;
    expiryAt: string;
    message: string;
    tempToken: string;
    username: string;
  };

  export type OTPVerifyRequest = {
    username: string;
    email: string;
    otp: string;
  };

  export type OTPResendRequest = {
    username: string;
    email: string;
  };

  export type OTPResendResponse = {
    message: string;
    username: string;
    email: string;
    tempToken: string;
    expiryAt: string;
  };

  export type GoogleAuthResponse = {
    message: string;
    username: string;
    token: string;
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
    profilePictureURL: string;
  };

  export type HostRegisterRequest = {
    username: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    phoneNumber: string;
    dob: Date | null;
    companyMail: string;
    backupMail: string;
    companyName: string;
    registered: boolean;
    hostedStatus: string;
  };

  export type HostRegisterResponse = {
    message: string;
    username: string;
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
    profilePictureURL: string;
  };
}
