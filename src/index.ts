import * as puppeteer from "puppeteer";
import { baseUrl, preferences } from "./constants";
import { tryBookLaundryRoom } from "./book-laundry";
import * as dotenv from "dotenv";

dotenv.config();

const headless = false;
const isProduction = process.env.NODE_ENV === "production";

export const bookLaundryRoom = async () => {
  const browser = await puppeteer.launch({
    headless: isProduction ? true : headless
  });
  const page = await browser.newPage();

  await page.goto(`${baseUrl}`);

  await page.type("#UserName", process.env.USERNAME as string);
  await page.type("#Password", process.env.PASSWORD as string);
  await page.click("#btnLogin");

  await page.waitForSelector('[aria-label="Boka"]');
  await page.click('[aria-label="Boka"]');

  await page.waitForSelector("#btnNewBooking");

  const hasBooking = (await page.$('button[title="Avboka"]')) !== null;

  if (hasBooking) {
    console.log("Time already booked");
    await browser.close();
    return;
  }

  tryBookLaundryRoom(page, preferences);
};
