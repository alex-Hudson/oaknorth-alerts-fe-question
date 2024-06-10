import { AlertsTable } from "./AlertsList";
import { TriggeredBorrowerTable } from "../borrowers/TriggeredBorrowersList";
import { useState } from "react";

export const AlertsPage = () => {
  const [selectedAlert, setSelectedAlert] = useState<any>(null);

  return (
    <div>
      <AlertsTable setSelectedAlert={setSelectedAlert} />
      <TriggeredBorrowerTable selectedAlert={selectedAlert} />
    </div>
  );
};
