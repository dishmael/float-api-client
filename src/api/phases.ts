import axios from "axios";

import { Headers } from "../common";

export type Phase = {
  phase_id: number;
  name: string;
  phase_team: any[];
};

/**
 * Fetches all Phases
 *
 * @returns {Promise<Phase[]>} Phases
 */
export const fetchPhases = async (): Promise<Phase[]> => {
  let phases: Phase[] = [];

  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/phases?active=1&per-page=1000&expand=phase_team&fields=phase_id,name,phase_team`,
      {
        headers: Headers,
      }
    );

    phases = response.data;
  } catch (error: any) {
    console.error("Error fetching Phases: ", error.message);
  }

  return phases;
};
