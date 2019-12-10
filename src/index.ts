import { baseUrl, preferences } from "./constants";
import { tryBookLaundryRoom } from "./book-laundry";
import { Page } from "puppeteer-core";
import * as chromium from "chrome-aws-lambda";

export const bookLaundryRoom = async () => {
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless
  });

  console.log("Connected to Chrome");

  const page = await browser.newPage();

  console.log("Created new page");

  await page.goto(`${baseUrl}`);

  console.log("Navigated to ", baseUrl);

  if (page.url().includes("Login")) {
    await tryLogin(page);
  }

  await page.waitForSelector('[aria-label="Boka"]');
  await page.click('[aria-label="Boka"]');

  await page.waitForSelector("#btnNewBooking");
  const hasBooking = (await page.$('button[title="Avboka"]')) !== null;

  if (hasBooking) {
    console.log("Time already booked");
    await browser.close();
    return "Time already booked";
  }

  const response = await tryBookLaundryRoom(page, preferences);
  await browser.close();

  return response;
};

const tryLogin = async (page: Page) => {
  console.log("Trying to login");

  await page.waitForSelector("#UserName");
  await page.type("#UserName", process.env.PAGE_USERNAME as string);

  await page.waitForSelector("#Password");
  await page.type("#Password", process.env.PAGE_PASSWORD as string);

  await page.waitForSelector("#btnLogin");
  await page.click("#btnLogin");
};
