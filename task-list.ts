import { Status } from "./src/common";
import { printCSV } from "./src/utils";
import { fetchClients, Client } from "./src/api/clients";
import { fetchTasks, Task } from "./src/api/tasks";
import { fetchProjects, Project } from "./src/api/projects";
import { fetchPhases, Phase } from "./src/api/phases";
import { fetchPeople, People } from "./src/api/people";

/**
 * Main entry point
 *
 * Invoke as: npm --silent start > float-projects.csv
 */
(async () => {
  const [clients, projects, phases, people, tasks] = await Promise.all([
    fetchClients(),
    fetchProjects(),
    fetchPhases(),
    fetchPeople(),
    fetchTasks(),
  ]);

  const schedules: any[] = [];

  const findPersonDetails = (person_id: number, phase: any) => {
    const person = people.find((p: People) => p.people_id === person_id);
    const rate = phase.phase_team.find(
      (p: People) => p.people_id === person_id
    ) || {
      hourly_rate: 0.0,
    };
    return { person, rate };
  };

  tasks.forEach((task: Task) => {
    const project = projects.find(
      (p: Project) => p.project_id === task.project_id
    );
    const client = clients.find(
      (c: Client) => c.client_id === project?.client_id
    ) || {
      name: "",
    };
    const phase = phases.find((ph: Phase) => ph.phase_id === task.phase_id) || {
      name: task.name,
      phase_team: [],
    };

    const peopleIds = task.people_ids || [task.people_id];
    peopleIds.forEach((person_id: number) => {
      const { person, rate } = findPersonDetails(person_id, phase);

      if (person) {
        schedules.push({
          resource: person.name,
          client: client.name,
          project: project?.name || "",
          name: phase.name,
          rate: rate.hourly_rate,
          start: task.start_date,
          end: task.end_date,
          status: Status[task.status],
        });
      }
    });
  });

  printCSV(schedules);
})();
