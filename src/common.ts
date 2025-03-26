import dotenv from "dotenv";

dotenv.config(); // load environment variables from .env file

export const Headers = {
  Authorization: `Bearer ${process.env.API_KEY}`,
  "Content-Type": "application/json",
  "User-Agent": `${process.env.USER_AGENT}`, 
};

export const Status = ["Draft", "Tentative", "Confirmed", "Complete"];