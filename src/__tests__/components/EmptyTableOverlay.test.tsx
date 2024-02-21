import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { EmptyTableOverlay } from "../../components/EmptyTableOverlay";
import { GridColDef, GridRowsProp, DataGrid } from "@mui/x-data-grid";

test("it renders the empty table overlay when there are no rows present on the data grid", async () => {
  const table = render(
    <div style={{ width: "500px", height: "500px" }}>
      <DataGrid
        rows={[]}
        columns={[]}
        slots={{
          noRowsOverlay: () => <EmptyTableOverlay text="No rows found" />,
        }}
      />
      ,
    </div>,
  );

  const { getByTestId } = table;
  expect(getByTestId("empty-table-overlay-wrapper")).toBeTruthy();
  expect(getByTestId("empty-table-overlay-wrapper").textContent).toBe(
    "No rows found",
  );

  table.unmount();
});

test("it does not render the empty table overlay when there are rows present on the data grid", async () => {
  const rows: GridRowsProp = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "Foo", col2: "Bar" },
  ];
  const columns: GridColDef[] = [
    { field: "col1", headerName: "Column 1", flex: 1 },
    { field: "col2", headerName: "Column 2", flex: 1 },
  ];

  const table = render(
    <div style={{ width: "500px", height: "500px" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{
          noRowsOverlay: () => <EmptyTableOverlay text="No rows found" />,
        }}
      />
    </div>,
  );

  const { queryByTestId } = table;
  expect(queryByTestId("empty-table-overlay-wrapper")).toBeNull();

  table.unmount();
});
