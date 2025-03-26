/**
 * @fileoverview Common constants and functions
 */

// axios headers
export const Headers = {
  Authorization: `Bearer ${process.env.API_KEY}`,
  "Content-Type": "application/json",
  "User-Agent": `${process.env.USER_AGENT}`, 
};

// used for decoding the status code in Float
export const Status = ["Draft", "Tentative", "Confirmed", "Complete"];