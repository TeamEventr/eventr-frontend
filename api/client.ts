import { API_ENDPOINTS } from "./endpoints";
import ky, { HTTPError, TimeoutError} from "ky";
import { Auth, EventListHomeResponse, TopTwoTicketsResponse } from "./types";
import secureLocalStorage from "react-secure-storage";

const Ky = ky.extend({
    hooks: {
        beforeRequest: [
            (request) => {
                const authToken = secureLocalStorage.getItem('AuthToken');
                if (authToken) {
                    request.headers.set('Authorization', `Bearer ${authToken}`);
                }
            },
        ],
    },
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 6000,
});

export const client = {
    
    

    async login(userLogIn: Auth.LogInRequest) {
        try {
            const response = await Ky.post(API_ENDPOINTS.USER_LOGIN, {
                json: userLogIn,
            }).json<Auth.LogInResponse>();
            secureLocalStorage.setItem('authToken', response.token);
            return response;
        } catch (error) {
            if (error instanceof HTTPError) {
                if (error.response.status === 400) {
                    throw new Error('Some fields are missing in the request body');
                } else if (error.response.status === 401) {
                    throw new Error('Username or password is invalid');
                } else if (error.response.status === 500) {
                    throw new Error('Please try again after some time.');
                } else {
                    throw new Error('Login failed');
                }
            } else if (error instanceof TimeoutError) {
                throw new Error('Request timed out. Please try again after some time.');
            } else {
                throw new Error('An unknown error occurred. Please try again.');
            }
        }
    },

    async register(userRegister: Auth.RegisterRequest) {
        try {
            const response = await Ky.post(API_ENDPOINTS.USER_SIGNUP, {
                json: userRegister,
            }).json<Auth.RegisterResponse>();
            secureLocalStorage.setItem('tempToken', response.tempToken);
            secureLocalStorage.setItem('email', response.email);
            secureLocalStorage.setItem('username', response.username);
            return response;
        } catch (error) {
            if (error instanceof HTTPError) {
                if (error.response.status === 303) {
                    throw new Error("Redirect to OTP")
                } else if (error.response.status === 400) {
                    throw new Error("Bad Request");
                } else if (error.response.status === 409) {
                    throw new Error("Username or email already exists");
                } else if (error.response.status === 500) {
                    throw new Error("Server error. Please try again later.");
                } else {
                    throw new Error("An unexpected error occurred. Please try again.");
                }
            } else if (error instanceof TimeoutError) {
                throw new Error('Request timed out. Please try again after some time.');
            } else {
                throw new Error('An unknown error occurred. Please try again.');
            }
        }
    },

    async verifyOTP(userOTPVerify: Auth.OTPVerifyRequest) {
        try {
            const response = await ky.post(API_ENDPOINTS.USER_OTP_VERIFY, {
                headers: {
                    'Authorization': `Bearer ${secureLocalStorage.getItem('tempToken')}`
                },
                json: userOTPVerify
            }).json<Auth.LogInResponse>();
            secureLocalStorage.removeItem('tempToken');
            secureLocalStorage.removeItem('email');
            secureLocalStorage.removeItem('username');
            secureLocalStorage.setItem('authToken', response.token);
            return response;
        } catch (error) {
            if (error instanceof HTTPError) {
                if (error.response.status === 400) {
                    throw new Error("Bad Request");
                } else if (error.response.status === 401) {
                    throw new Error("OTP Invalid");
                } else if (error.response.status === 500) {
                    throw new Error("Please try again after some time");
                } else {
                    throw new Error("An unexpected error occurred. Please try again.");
                }
            } else if (error instanceof TimeoutError) {
                throw new Error('Request timed out. Please try again after some time.');
            } else {
                throw new Error('An unknown error occurred. Please try again.');
            }
        }
    },

    async resendOTP(userOTPResend: Auth.OTPResendRequest) {
        try {
            const response = await ky.post(API_ENDPOINTS.USER_OTP_RESEND, {
                headers: {
                    'Authorization': `Bearer ${secureLocalStorage.getItem('tempToken')}`
                },
                json: userOTPResend
            }).json<Auth.OTPResendResponse>();
            secureLocalStorage.setItem('tempToken', response.tempToken);
            return "Resend Successful";
        } catch (error) {
            if (error instanceof HTTPError) {
                if (error.response.status === 400) {
                    throw new Error("Bad Request");
                } else if (error.response.status === 401) {
                    throw new Error("OTP Invalid");
                } else if (error.response.status === 408) {
                    throw new Error("Retry registration");
                } else if (error.response.status === 429) {
                    throw new Error("Too many reattempts. Try later.");
                } else if (error.response.status === 500) {
                    throw new Error("Please retry after some time");
                } else {
                    throw new Error("An unexpected error occurred. Please try again.");
                }
            } else if (error instanceof TimeoutError) {
                throw new Error('Request timed out. Please try again after some time.');
            } else {
                throw new Error('An unknown error occurred. Please try again.');
            }
        }
    },

    async checkUserName(username: string) {
        try {
            const response = await ky.post(API_ENDPOINTS.USERNAME_CHECK, {
            headers: {
                'Content-Type': 'application/json',
            },
            json: { username: username },
            }).json<{ available: boolean, message: string }>();
            return response.available;
        } catch (error) {
            if (error instanceof HTTPError) {
                const errorResponse = await error.response.json();
                if (error.response.status === 400) {
                    throw new Error(errorResponse.message || "Bad Request");
                } else if (error.response.status === 409) {
                    throw new Error(errorResponse.message || "Username is already taken.");
                } else if (error.response.status === 500) {
                    throw new Error(errorResponse.message || "Server error. Please try again later.");
                } else {
                    throw new Error("An unexpected error occurred. Please try again.");
                }
            } else {
            throw new Error("An unexpected error occurred. Please try again.");
            }
        }
    },
                    
    async googleAuth () {
        try {
            const response = await Ky.get(API_ENDPOINTS.GOOGLE_AUTH, {
            }).json<Auth.GoogleAuthResponse>();
            if(response.username == "User has been banned") {
                throw new Error('User has been banned');
            }
            secureLocalStorage.setItem('authToken', response.token);
            return response;
        } catch (error) {
            if (error instanceof HTTPError) {
                if (error.response.status === 401) {
                    throw new Error('Unauthorized Request');
                } else if (error.response.status === 409) {
                    throw new Error('User already exists');
                } else if (error.response.status === 500) {
                    throw new Error('Please try again after some time.');
                } else {
                    throw new Error('Google authentication failed');
                }
            } else if (error instanceof TimeoutError) {
                throw new Error('Request timed out. Please try again after some time.');
            } else {
                throw new Error('An unknown error occurred. Please try again.');
            }
        }
    },

    async hostRegister(hostRegister: Auth.HostRegisterRequest) {
        try {
            const response = await ky.post(API_ENDPOINTS.HOST_SIGNUP,
                {
                json: hostRegister,
            }).json<Auth.RegisterResponse>();
            secureLocalStorage.setItem('hostEmail', response.email);
        } catch (error) {
            if (error instanceof HTTPError) {
                const errorResponse = await error.response.json();
                if (error.response.status === 303) {
                    throw new Error("Redirect to OTP");
                } else if (error.response.status === 400) {
                    throw new Error("Bad Request");
                } else if (error.response.status === 409) {
                    throw new Error("Account already exists in provided username or company mail");
                } else if (error.response.status === 429) {
                    throw new Error("Too many re-attempts. Try later.");
                } else if (error.response.status === 500) {
                    throw new Error("Please try again in a while");
                } else {
                    throw new Error("An unexpected error occurred. Please try again.");
                }
            } else if (error instanceof TimeoutError) {
                throw new Error('Request timed out. Please try again after some time.');
            } else {
                throw new Error('An unknown error occurred. Please try again.');
            }
        }
    },

    //Home
    async getEventListHome() {
        try {
            const response = await Ky.get(API_ENDPOINTS.GET_EVENTS_LIST_HOME).json<EventListHomeResponse[]>();
            return response;
        } catch (error) {
            if (error instanceof HTTPError) {
                const errorResponse = await error.response.json();
                throw new Error(errorResponse.message || 'Failed to fetch events');
            } else if (error instanceof TimeoutError) {
                throw new Error('Request timed out. Please try again after some time.');
            } else {
                throw new Error('An unknown error occurred. Please try again.');
            }
        }
    },
    
    //Profile 
    async getTopTwoTickets() {
        try {
            const response = await Ky.get(API_ENDPOINTS.GET_TOP_TWO_TICKETS).json<TopTwoTicketsResponse[]>();
            return response;
        } catch (error) {
            if (error instanceof HTTPError) {
                const errorResponse = await error.response.json();
                throw new Error(errorResponse.message || 'Failed to fetch tickets');
            } else if (error instanceof TimeoutError) {
                throw new Error('Request timed out. Please try again after some time.');
            } else {
                throw new Error('An unknown error occurred. Please try again.');
            }
        }
    }
}

