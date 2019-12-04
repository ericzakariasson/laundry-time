import dotenv from "dotenv";
dotenv.config();

export const baseUrl = process.env.BASE_URL;

export interface Room {
  name: "1A" | "1B" | "2A" | "2B" | "3";
  id: 6 | 7 | 8 | 9 | 10 | 11;
  rank: number;
}

export const rooms: Room[] = [
  {
    name: "1A",
    id: 6,
    rank: 2
  },
  {
    name: "1B",
    id: 7,
    rank: 3
  },
  {
    name: "2A",
    id: 8,
    rank: 0
  },
  {
    name: "2B",
    id: 9,
    rank: 4
  },
  {
    name: "3",
    id: 10,
    rank: 1
  }
];

export interface Day {
  name:
    | "Måndag"
    | "Tisdag"
    | "Onsdag"
    | "Torsdag"
    | "Fredag"
    | "Lördag"
    | "Söndag";
  rank: number;
}

export const days: Day[] = [
  { name: "Måndag", rank: 2 },
  { name: "Tisdag", rank: 1 },
  { name: "Onsdag", rank: 0 },
  { name: "Torsdag", rank: 3 },
  { name: "Fredag", rank: 4 },
  { name: "Lördag", rank: 6 },
  { name: "Söndag", rank: 5 }
];

export type Period =
  | "01-04"
  | "04-07"
  | "07-10"
  | "10-13"
  | "13-16"
  | "16-19"
  | "19-22"
  | "22-01";

export const periods: Period[] = [
  "01-04",
  "04-07",
  "07-10",
  "10-13",
  "13-16",
  "16-19",
  "19-22",
  "22-01"
];

export interface BookingOptions {
  day: Day;
  period: Period;
  room: Room;
}

export const preferences: BookingOptions = {
  day: days.find(day => day.name === "Måndag")!,
  period: "19-22",
  room: rooms.find(room => room.rank === 0)!
};
