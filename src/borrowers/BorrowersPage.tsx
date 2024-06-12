import { BorrowerTable } from "./BorrowerList";
import { AddNewBorrower } from "./AddNewBorrower";
import { BorrowerWithAlertName } from "./BorrowerWithAlertName";

export const BorrowerPage = () => {
  return (
    <div>
      <BorrowerTable />
      <AddNewBorrower />
      <BorrowerWithAlertName />
    </div>
  );
};
