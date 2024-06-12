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
  const response = await fetch("http://localhost:8000/api/v1/borrowers", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const data = await response.json();
  return data || [];
}

export const BorrowerTable = () => {
  const [data, setData] = useState<any | undefined>([]);

  const getData = async () => {
    const results = await fetchBorrowers();
    setData(results);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDeleteBorrower = async (borrower_id: number) => {
    await fetch(`http://localhost:8000/api/v1/borrowers/${borrower_id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    });
  };

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>List of borrowers</TableCaption>
        <Thead>
          <Tr>
            <Th>borrower_id</Th>
            <Th>name</Th>
            <Th>last_modified</Th>
            <Th>total_revenue</Th>
            <Th>ebitda</Th>
            <Th>dscr</Th>
            <Th>debt_to_ebitda</Th>
            <Th>Delete borrower</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row: any) => (
            <Tr>
              <Td><Link href={`/borrower/${row.borrower_id}`}>{row.borrower_id}</Link></Td>
              <Td>{row.name}</Td>
              <Td> {row.last_modified}</Td>
              <Td> {row.total_revenue}</Td>
              <Td> {row.ebitda}</Td>
              <Td> {row.dscr}</Td>
              <Td> {row.debt_to_ebitda}</Td>
              <Td>
                <Button onClick={() => handleDeleteBorrower(row.borrower_id)}>
                  Delete Borrower
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
