import { useState, useEffect } from "react";
import {
  Link,
  Box,
  Flex,
  FlexProps,
  Text,
  TextProps,
  Button,
  Stack,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Table,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { toNumber } from "lodash";

interface Borrower {
  borrower_id: number;
  name: string;
  last_modified: Date;
  total_revenue: number | undefined;
  ebitda: number | undefined;
  dscr: number | undefined;
  debt_to_ebitda: number | undefined;
}

async function postBorrower(body: Borrower): Promise<Borrower[]> {
  const response = await fetch("http://localhost:8000/api/v1/borrowers", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data || [];
}

export const AddNewBorrower = () => {
  const [newBorrower, setNewBorrower] = useState<any | undefined>({
    name: "",
    total_revenue: 0,
    ebitda: 0,
    dscr: 0,
    debt_to_ebitda: 0,
  });

  const handleChange = (key, value) => {
    newBorrower[key] = value;
  };

  async function handlePostNewBorrower() {
    console.log(newBorrower);
    postBorrower(newBorrower);
  }
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Add new borrower</TableCaption>
        <Thead>
          <Tr>
            <Th>name</Th>
            <Th>total_revenue</Th>
            <Th>ebitda</Th>
            <Th>dscr</Th>
            <Th>debt_to_ebitda</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <Input
                placeholder="name"
                onChange={(event) => handleChange("name", event.target.value)}
              ></Input>
            </Td>
            <Td>
              <Input
                placeholder="total_revenue"
                onChange={(event) =>
                  handleChange("total_revenue", toNumber(event.target.value))
                }
              ></Input>
            </Td>
            <Td>
              <Input
                placeholder="ebitda"
                onChange={(event) =>
                  handleChange("ebitda", toNumber(event.target.value))
                }
              ></Input>
            </Td>
            <Td>
              <Input
                placeholder="dscr"
                onChange={(event) =>
                  handleChange("dscr", toNumber(event.target.value))
                }
              ></Input>
            </Td>
            <Td>
              <Input
                placeholder="debt_to_ebitda"
                onChange={(event) =>
                  handleChange("debt_to_ebitda", toNumber(event.target.value))
                }
              ></Input>
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Button onClick={handlePostNewBorrower}>Submit</Button>
    </TableContainer>
  );
};
