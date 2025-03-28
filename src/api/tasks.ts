import axios from "axios";

import { Headers } from "../common";

export type Task = {
  task_id: number;
  project_id: number;
  people_id: number;
  people_ids: number[];
  phase_id: number;
  name: string;
  start_date: string;
  end_date: string;
  status: number;
  billable: number;
};

/**
 * Fetches all tasks
 *
 * @returns {Promise<Task[]>} - List of tasks
 */
export const fetchTasks = async (): Promise<Task[]> => {
  const fields =
    "task_id,project_id,people_id,people_ids,phase_id,name,start_date,end_date,status,billable";

  let tasks: Task[] = [];

  try {
    const getTentative = async () => {
      return axios.get(
        `${process.env.BASE_URL}/tasks?status=1&per-page=100&sort=end_date&fields=${fields}`,
        {
          headers: Headers,
        }
      );
    };

    const getConfirmed = async () => {
      return axios.get(
        `${process.env.BASE_URL}/tasks?status=2&per-page=100&sort=end_date&fields=${fields}`,
        {
          headers: Headers,
        }
      );
    };

    // Fetch tenative and confirmed
    const [tentative, confirmed] = await Promise.all([
      getTentative(),
      getConfirmed(),
    ]);

    // Combine them
    tasks = [...confirmed.data, ...tentative.data];
  } catch (error:any) {
    console.error("Error fetching Tasks: ", error.message);
  }

  return tasks;
};
