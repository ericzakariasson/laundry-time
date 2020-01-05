import { google } from "googleapis";

const scopes = ["https://www.googleapis.com/auth/calendar"];

const auth = new google.auth.JWT(
  process.env.GOOGLE_APPLICATION_CLIENT_EMAIL,
  undefined,
  process.env.GOOGLE_APPLICATION_PRIVATE_KEY,
  scopes
);

export const calendar = google.calendar({ version: "v3", auth });
