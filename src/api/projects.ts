import axios from "axios";

import { Headers } from "../common";

export type Project = {
  project_id: number;
  client_id: number;
  name: string;
}

/**
 * Fetches Projects from Float API
 *
 * @returns {Promise<Project[]>} Projects
 */
export const fetchProjects = async (): Promise<Project[]> => {
  let projects: Project[] = [];

  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/projects?active=1&per-page=1000&fields=project_id,client_id,name`,
      {
        headers: Headers,
      }
    );

    projects = response.data;
  } catch (error:any) {
    console.error("Error fetching Projects: ", error.message);
  }

  return projects;
};