import dotenv from "dotenv";

dotenv.config(); // load environment

export const Headers = {
  Authorization: `Bearer ${process.env.API_KEY}`,
  "Content-Type": "application/json",
  "User-Agent": "Qmulos <david.ishmael@qmulos.com>",
};

export const Status = ["Draft", "Tentative", "Confirmed", "Complete"];