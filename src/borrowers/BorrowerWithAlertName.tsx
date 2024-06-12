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
} from "@chakra-ui/react";

interface Borrower {
  borrower_id: number;
  name: string;
  last_modified: Date;
  total_revenue: number | undefined;
  ebitda: number | undefined;
  dscr: number | undefined;
  debt_to_ebitda: number | undefined;
}

async function fetchBorrowers(): Promise<Borrower[]> {
  // return []
  const response = await fetch("http://localhost:8000/api/v1/borrowers", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const data = await response.json();

  for (const row of data) {
    row.alert_name = "alert name";
    row.alert_id = 1;
  }
  return data || [];
}

export const BorrowerWithAlertName = () => {
  const [data, setData] = useState<any | undefined>([]);

  const getData = async () => {
    const results = await fetchBorrowers();
    setData(results);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDismissAlert = async (alert_id: number)=> {
    const response = await fetch(`http://localhost:8000/api/v1/alerts/${alert_id}/dismiss`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
        },
      });
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>List of borrowers</TableCaption>
        <Thead>
          <Tr>
            <Th>name</Th>
            <Th>ebitda</Th>
            <Th>dscr</Th>
            <Th>alert name</Th>
            <Th>action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row: any) => (
            <Tr>
              <Td>{row.name}</Td>
              <Td> {row.ebitda}</Td>
              <Td> {row.dscr}</Td>
              <Td> {row.alert_name}</Td>
              <Td>
                {" "}
                <Button onClick={() => handleDismissAlert(row.alert_id)}>
                  Dismiss
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
