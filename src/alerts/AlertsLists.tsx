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

async function fetchAlerts(): Promise<Borrower[]> {
  const response = await fetch("http://localhost:8000/api/v1/alerts", {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  });
  const data = await response.json();
  return data || [];
}

export const AlertsTable = ({ ramps }: { ramps: any[] }) => {
  const [data, setData] = useState<any | undefined>([]);

  const getData = async () => {
    const results = await fetchAlerts();
    setData(results);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>List of alerts</TableCaption>
        <Thead>
          <Tr>
            <Th>alert_id</Th>
            <Th>data_item</Th>
            <Th>operator</Th>
            <Th>value</Th>
            <Th>last_modified</Th>
          </Tr>
        </Thead>
        <Tbody>
        {data.map((row: any) => (
            <Tr>
               <Td>{row.alert_id}</Td>
               <Td>{row.data_item}</Td>
               <Td> {row.operator}</Td>
               <Td> {row.value}</Td>
               <Td> {row.last_modified}</Td>
             </Tr>
        ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
