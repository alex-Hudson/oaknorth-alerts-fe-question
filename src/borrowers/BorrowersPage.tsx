import { BorrowerTable } from "./BorrowerList";
import { AddNewBorrower } from "./AddNewBorrower";

export const BorrowerPage = () => {
  return (
    <div>
      <BorrowerTable />
      <AddNewBorrower />
    </div>
  );
};
