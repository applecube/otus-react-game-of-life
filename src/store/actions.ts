import { createAction } from "@reduxjs/toolkit";

export const login = createAction(
  "@set/login",
  (payload: { email: string; password: string }) => ({
    payload
  })
);
