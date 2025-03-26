import { stringify } from "csv-stringify";

// Prepare and output the content in CSV format
export const printCSV = (schedules: any[]) => {
  stringify(
    schedules,
    {
      header: true,
      columns: [
        { key: "resource", header: "RESOURCE" },
        { key: "client", header: "CLIENT" },
        { key: "project", header: "PROJECT" },
        { key: "name", header: "NAME" },
        { key: "rate", header: "RATE" },
        { key: "start", header: "START" },
        { key: "end", header: "END" },
        { key: "status", header: "STATUS" },
      ],
    },
    (err, output) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      process.stdout.write(output);
    }
  );
};
