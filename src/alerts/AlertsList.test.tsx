import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { AlertsTable } from "./AlertsList"; // Adjust the import path accordingly

const mockSetSelectedAlert = jest.fn();

const mockData = [
  {
    alert_id: 1,
    data_item: "Revenue",
    operator: ">",
    value: 1000,
    last_modified: "2023-06-01T12:34:56Z",
  },
  {
    alert_id: 2,
    data_item: "EBITDA",
    operator: "<",
    value: 500,
    last_modified: "2023-06-02T12:34:56Z",
  },
];

beforeEach(() => {
  global.fetch = (): any => {
    return Promise.resolve({
      json: () => Promise.resolve(mockData),
    });
  };
});

test("renders AlertsTable component", async () => {
  render(<AlertsTable setSelectedAlert={mockSetSelectedAlert} />);

  expect(screen.getByText("List of alerts")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText("alert_id")).toBeInTheDocument();
    expect(screen.getByText("data_item")).toBeInTheDocument();
  });
});