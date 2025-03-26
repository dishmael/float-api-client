import { fetchProjects, Project } from "./src/api/projects";
import { fetchTasks, Task } from "./src/api/tasks";

// Main function
(async () => {
  const [tasks, projects] = await Promise.all([fetchTasks(), fetchProjects()]);

  const output = new Map<string, any>();
  tasks.forEach((task: Task) => {
    let pname = task.name;
    if (pname === "") {
      pname =
        projects.find((p: Project) => p.project_id === task.project_id)?.name ||
        "";
    }

    output.set(pname, task);
  });

  console.log(output);

  // output.forEach((value, key) => {
  //   console.log(`${key},${value.start_date},${value.end_date}`);
  // })
})();
