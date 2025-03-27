import { fetchProjects, Project } from "./src/api/projects";
import { fetchTasks, Task } from "./src/api/tasks";

// Main function
(async () => {
  const [tasks, projects] = await Promise.all([fetchTasks(), fetchProjects()]);

  const output = new Map<string, any>();
  tasks.forEach((task: Task) => {
    // Only consider confirmed tasks
    if (task.status != 2) { return; }

    let pname = task.name;
    if (pname === "") {
      pname =
        projects.find((p: Project) => p.project_id === task.project_id)?.name ||
        "";
    }

    if (output.has(pname)) {
      const t = output.get(pname) as Task;
      t.people_ids = [
        ...(t.people_ids ?? []),
        ...(t.people_ids?.includes(task.people_id) ? [] : [task.people_id])
      ];
    } else {
      task.people_ids = [task.people_id];
      output.set(pname, task);
    }

  });

  //console.log(output);

  output.forEach((value, key) => {
    console.log(`${key},${value.people_ids.length},${value.start_date},${value.end_date}`);
  })
})();
