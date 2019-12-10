import * as puppeteer from "puppeteer-core";
import { baseUrl, preferences } from "./constants";
import { tryBookLaundryRoom } from "./book-laundry";
import { getChrome } from "./chrome";
import { Page } from "puppeteer-core";

export const bookLaundryRoom = async () => {
  const chrome = await getChrome();
  const browser = await puppeteer.connect({
    browserWSEndpoint: chrome.endpoint
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
  await page.waitForSelector('button[title="Avboka"');

  const hasBooking = (await page.$('button[title="Avboka"]')) !== null;

  if (hasBooking) {
    console.log("Time already booked");
    await browser.close();
    return "Time already booked";
  }

  return "Got this far";

  tryBookLaundryRoom(page, preferences);
};

const tryLogin = async (page: Page) => {
  console.log("Trying to login");

  await page.waitForSelector("#UserName", { timeout: 10000 });
  console.log("Found username field");
  await page.type("#UserName", process.env.USERNAME as string);

  await page.waitForSelector("#Password", { timeout: 2000 });
  console.log("Found password field");
  await page.type("#Password", process.env.PASSWORD as string);

  await page.waitForSelector("#btnLogin", { timeout: 2000 });
  console.log("Found login button");
  await page.click("#btnLogin");

  console.log("Logged in");
};
