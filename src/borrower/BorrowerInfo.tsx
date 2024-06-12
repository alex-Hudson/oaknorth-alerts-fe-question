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
import { useParams } from "react-router-dom";
import "../style.css";

export const BorrowerInfo = () => {
  const [data, setData] = useState<any | undefined>([]);
  const borrower_id = useParams().id;

  const getData = async () => {
    const results = await fetchBorrower(borrower_id);
    setData(results);
  };

  useEffect(() => {
    getData();
  }, []);

  const fetchBorrower = async (borrower_id: string) => {
    const response = await fetch(`http://localhost:8000/api/v1/borrowers`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();
    return data[0] || [];
  };

  return (
    <div>
      <div className="BorrowerInfo__name">{data.name}</div>
      <div>
        <div className="BorrowerInfo__container">
          <div className="BorrowerInfo__cell">{data.total_revenue}</div>
          <div className="BorrowerInfo__cell">{data.ebitda}</div>
        </div>
        <div className="BorrowerInfo__container">
          <div className="BorrowerInfo__cell">{data.dscr}</div>
          <div className="BorrowerInfo__cell">{data.debt_to_ebitda}</div>
        </div>
      </div>
    </div>
  );
};
