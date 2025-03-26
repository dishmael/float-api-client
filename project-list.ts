import { fetchProjects } from "./src/api/projects.ts";
import { fetchTasks } from "./src/api/tasks.ts";

// Entrypoint
(async () => {
  const [tasks, projects] = await Promise.all([
    fetchTasks(),
    fetchProjects(),
  ]);

  const output = new Map<string, any>();
  tasks.forEach((task) => {
    let pname = task.name;
    if (pname === "") {
      pname = projects.find((p) => p.project_id === task.project_id)?.name || "";
    }
    
    output.set(pname, task);
  })

  console.log(output)

  // output.forEach((value, key) => {
  //   console.log(`${key},${value.start_date},${value.end_date}`);
  // })

})();