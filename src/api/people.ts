import axios from "axios";

import { Headers } from "../common";

export type People = {
  people_id: number;
  name: string;
};

/**
 * Fetches all people
 *
 * @returns {Promise<People[]>} List of people
 */
export const fetchPeople = async (): Promise<People[]> => {
  let people: People[] = [];

  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/people?active=1&per-page=1000&fields=people_id,name`,
      {
        headers: Headers,
      }
    );

    people = response.data;
  } catch (error: any) {
    console.error("Error fetching People: ", error.message);
  }

  return people;
};
