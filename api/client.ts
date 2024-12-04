import { API_ENDPOINTS } from "./endpoints";
import ky, { HTTPError, TimeoutError} from "ky";
import { LogInDetails, LogInResponse, EventListHomeResponse } from "./types";

export const client = {

    async login(userLogIn: LogInDetails) {
        try {
            const response = await ky.post(API_ENDPOINTS.USER_LOGIN, {
                json: userLogIn,
            }).json<LogInResponse>();
            return response;
        } catch (error) {
            if (error instanceof HTTPError) {
                const errorResponse = await error.response.json();
                throw new Error(errorResponse.message || 'Login failed');
            } else if (error instanceof TimeoutError) {
                throw new Error('Request timed out. Please try again after some time.');
            } else {
                throw new Error('An unknown error occurred. Please try again.');
            }
        }
    },

    async getEventListHome() {
        try {
            const response = await ky.get(API_ENDPOINTS.GET_EVENTS_LIST_HOME).json<EventListHomeResponse[]>();
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
    }
    // Add more methods here as needed
}

