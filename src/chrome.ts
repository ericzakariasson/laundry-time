import * as launchChrome from "@serverless-chrome/lambda";
import fetch from "node-fetch";

export const getChrome = async () => {
  const chrome = await (typeof launchChrome === "function"
    ? launchChrome
    : launchChrome.default)();

  const response = await fetch(`${chrome.url}/json/version`, {
    headers: { "Content-Type": "application/json" }
  });

  const { webSocketDebuggerUrl } = await response.json();

  return {
    endpoint: webSocketDebuggerUrl,
    instance: chrome
  };
};
