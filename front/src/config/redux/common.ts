import { SerializedError } from "@reduxjs/toolkit";

export interface ErrorBaseState extends SerializedError {
  code?: string;
  http_status: number;
  name?: string;
  message?: string;
  stack?: string;
}
export interface IBaseState {
  status: "pending" | "loading" | "complete" | "failed";
  error?: ErrorBaseState | any;
}

export interface IEntityBaseState<T> extends IBaseState {
  payload?: T;
}

export const BaseState: IBaseState = {
  status: "pending",
};

export const StateUtils = {
  isLoading: (...states: IBaseState[]) => {
    return states.some(
      (state) => state.status === "loading" || state.status === "pending"
    );
  },
  isLoadingOnly: (...states: IBaseState[]) => {
    return states.some((state) => state.status === "loading");
  },

  isPending: (...states: IBaseState[]) => {
    return states.some((state) => state.status === "pending");
  },

  isComplete: (...states: IBaseState[]) => {
    return states.every((state) => state.status === "complete");
  },
  isSomeComplete: (...states: IBaseState[]) => {
    return states.some((state) => state.status === "complete");
  },

  isFailed: (...states: IBaseState[]) => {
    return states.some((state) => state.status === "failed");
  },
  isPendingOrFailed: (...states: IBaseState[]) => {
    return states.some(
      (state) => state.status === "failed" || state.status === "pending"
    );
  },

  isSomeFailed: (...states: IBaseState[]) => {
    return states.some((state) => state.status === "failed");
  },
};
