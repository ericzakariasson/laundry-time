import { addWeeks, addHours, startOfWeek, addDays, format } from "date-fns";
import { sv } from "date-fns/locale";
import { days, periods, rooms, BookingOptions, Room, Day } from "./constants";

export const getBookingUrl = ({ period, day, room }: BookingOptions) => {
  const today = new Date();
  const nextWeek = addWeeks(today, 1);

  const nextWeekStartDate = addHours(
    startOfWeek(nextWeek, {
      weekStartsOn: 1,
      locale: sv
    }),
    1
  );

  const passDate = addDays(nextWeekStartDate, days.indexOf(day));

  const passNo = periods.indexOf(period);
  const bookingGroupId = rooms.find(r => r.name === room.name)!.id;

  const formattedPassDate = format(passDate, "yyyy-MM-dd");

  const url = `CustomerBooking/Book?passNo=${passNo}&passDate=${formattedPassDate}&bookingGroupId=${bookingGroupId}`;
  return {
    bookingUrl: url,
    laundryDate: passDate
  };
};

export const sortByRank = (a: Room | Day, b: Room | Day) => a.rank - b.rank;
