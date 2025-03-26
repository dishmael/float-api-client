import axios from "axios";

import { Headers } from "../common";

export type Client = {
  client_id: number;
  name: string;
};

/**
 * Fetch Clients from Float API
 *
 * @returns {Promise<Client[]>} - List of Clients
 */
export const fetchClients = async (): Promise<Client[]> => {
  let clients: Client[] = [];

  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/clients?per-page=1000`,
      {
        headers: Headers,
      }
    );

    clients = response.data;
  } catch (error: any) {
    console.error("Error fetching Clients: ", error.message);
  }

  return clients;
};
