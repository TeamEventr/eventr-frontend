import { useMutation, useQuery, useQueryClient, QueryClient } from "@tanstack/react-query";
import { client } from "./client";
import secureLocalStorage from "react-secure-storage";
import { LogInDetails, LogInResponse, EventListHomeResponse, TopTwoTicketsResponse } from "./types";
import { use } from "react";

export const queryClient = new QueryClient();

export const useLogin = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (loginDetails: LogInDetails) => client.login(loginDetails),
    onSuccess: (data) => {
      secureLocalStorage.setItem("authToken", data.token);
      queryClient.setQueryData(
        ["auth", "user"], {
        username: data.username,
        firstName: data.firstName,
        email: data.email,
        profilePictureURL: data.profilePictureURL,
      });
      onSuccess?.();
    },
  });
};

export const getEventsListHome = () => 
  useQuery<EventListHomeResponse[]>({
    queryKey: ['eventlist', 'home'],
    queryFn: client.getEventListHome,
  });

export const getTopTwoTickets = () =>
  useQuery<TopTwoTicketsResponse[]>({
    queryKey: ['profile', 'tickets'],
    queryFn: client.getTopTwoTickets,
  })
