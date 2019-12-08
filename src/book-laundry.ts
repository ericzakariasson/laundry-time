import { getBookingUrl, sortByRank } from "./helper";
import { baseUrl, rooms, days, preferences, BookingOptions } from "./constants";
import { format } from "date-fns";
import { Page } from "puppeteer";

export const tryBookLaundryRoom = async (
  page: Page,
  { day, period, room }: BookingOptions
): Promise<void> => {
  const { bookingUrl, laundryDate } = getBookingUrl({ day, period, room });

  await page.goto(`${baseUrl}/${bookingUrl}`);

  const isError = page.url().includes("Account/Error");

  if (isError) {
    const orderedRooms = rooms.sort(sortByRank);
    const currentRoomIndex = orderedRooms.findIndex(r => r.name === room.name);

    if (currentRoomIndex === rooms.length - 1) {
      const orderedDays = days.sort(sortByRank);
      const currentDayIndex = orderedDays.findIndex(d => d.name === day.name);

      if (currentDayIndex === orderedDays.length - 1) {
        console.log(`No room bookable`);
        return;
      }

      const nextDay = orderedDays[currentDayIndex + 1];
      console.log(`No room bookable for ${day.name}, trying ${nextDay.name}`);
      return tryBookLaundryRoom(page, {
        room: preferences.room,
        day: nextDay,
        period
      });
    }

    const nextRoom = orderedRooms[currentRoomIndex + 1];
    console.log(
      `Room not available for ${room.name} ${period}, trying ${nextRoom.name}`
    );
    return tryBookLaundryRoom(page, { room: nextRoom, day, period });
  }

  const isBookedRegex = new RegExp("Ditt valda pass .* är bokat", "gi");

  await page.waitForSelector("#popup_message");
  const popup = await page.$("#popup_message");
  const popupMessage =
    popup &&
    ((await (await popup.getProperty("textContent")).jsonValue()) as string);

  const isBooked = isBookedRegex.test(popupMessage || "");

  if (isBooked) {
    console.log(
      `Laundry room ${
        room.name
      } is booked on next ${day.name.toLowerCase()} (${format(
        laundryDate,
        "yyyy-MM-dd"
      )}) ${period}`
    );
  }
};
