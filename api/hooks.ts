import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import { client } from "./client";
import { Auth, EventListHomeResponse, TopTwoTicketsResponse } from "./types";

export const queryClient = new QueryClient();

export const useLogin = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: (loginDetails: Auth.LogInRequest) => client.login(loginDetails),
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "user"], {
        username: data.username,
        firstName: data.firstName,
        email: data.email,
        profilePictureURL: data.profilePictureURL,
      });
      onSuccess?.();
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (registerDetails: Auth.RegisterRequest) =>
      client.register(registerDetails),
  });
};

export const useVerifyOTP = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: (otpDetails: Auth.OTPVerifyRequest) =>
      client.verifyOTP(otpDetails),
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "user"], {
        username: data.username,
        firstName: data.firstName,
        email: data.email,
        profilePictureURL: data.profilePictureURL,
      });
      onSuccess?.();
    },
  });
};

export const useResendOTP = () => {
  return useMutation({
    mutationFn: (otpDetails: Auth.OTPResendRequest) =>
      client.resendOTP(otpDetails),
  });
};

export const useUsernameCheck = () => {
  return useMutation({
    mutationFn: (username: string) => client.checkUserName(username),
  });
};

export const useHostRegister = () => {
  return useMutation({
    mutationFn: (registerDetails: Auth.HostRegisterRequest) => client.hostRegister(registerDetails),
  });
}

export const getGoogleAuth = () =>
  useQuery<Auth.GoogleAuthResponse>({
    queryKey: ["auth", "google"],
    queryFn: client.googleAuth,
  });

export const getEventsListHome = () =>
  useQuery<EventListHomeResponse[]>({
    queryKey: ["eventlist", "home"],
    queryFn: client.getEventListHome,
  });

export const getTopTwoTickets = () =>
  useQuery<TopTwoTicketsResponse[]>({
    queryKey: ["profile", "tickets"],
    queryFn: client.getTopTwoTickets,
  });
