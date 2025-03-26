import { stringify } from "csv-stringify";

export type ColumnHeader = {
  key: string;
  header: string; 
}

// This function is used to output the content in CSV format
export const printCSV = (rows: any[], columns: ColumnHeader[]) => {
  stringify(
    rows,
    {
      header: true,
      columns: columns,
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
