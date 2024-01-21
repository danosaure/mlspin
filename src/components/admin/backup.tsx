import { Button } from "@mui/material";
import Persistence from "../../persistence";
import downloadFile from "../../utils/download-file";

export default () => {

  const createBackup = async (): Promise<void> => {
    const persistence = new Persistence();
    const content = await persistence.createBackup();
    await downloadFile(content, 'db-backup');
  }

  return (
    <Button onClick={createBackup}>Create a backup</Button>
  );
};
