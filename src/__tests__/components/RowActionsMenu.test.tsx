import { expect, test, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { RowActionsMenu } from "../../components/RowActionsMenu";

test("it renders the row actions menu with the given actions", async () => {
  const options = [
    { name: "Edit", action: () => {} },
    { name: "Delete", action: () => {} },
  ];

  const rowActionsMenu = render(<RowActionsMenu options={options} />);

  const { getByTestId } = rowActionsMenu;
  expect(getByTestId("row-actions-menu-wrapper")).toBeTruthy();
  expect(getByTestId("row-actions-menu-button")).toBeTruthy();

  // It renders the correct number of menu items
  const editAction = getByTestId("row-actions-menu-item0");
  const deleteAction = getByTestId("row-actions-menu-item1");
  expect(editAction).toBeTruthy();
  expect(deleteAction).toBeTruthy();
  expect(editAction.textContent).toBe("Edit");
  expect(deleteAction.textContent).toBe("Delete");

  rowActionsMenu.unmount();
});

test("it opens the menu when the button is clicked", async () => {
  const options = [
    { name: "Edit", action: () => {} },
    { name: "Delete", action: () => {} },
  ];

  const rowActionsMenu = render(<RowActionsMenu options={options} />);

  const { getByTestId } = rowActionsMenu;
  const button = getByTestId("row-actions-menu-button");
  const menu = getByTestId("menu-appbar");

  expect(menu.getAttribute("aria-hidden")).toBe("true");

  button.click();

  await waitFor(() => {
    expect(menu.getAttribute("aria-hidden")).toBe(null);
  });

  rowActionsMenu.unmount();
});

test("it fires the action when a menu item is clicked", async () => {
  const mockEditAction = vi.fn();
  const mockDeleteAction = vi.fn();
  const options = [
    { name: "Edit", action: mockEditAction },
    { name: "Delete", action: mockDeleteAction },
  ];

  const rowActionsMenu = render(<RowActionsMenu options={options} />);

  const { getByTestId } = rowActionsMenu;
  const button = getByTestId("row-actions-menu-button");
  const editAction = getByTestId("row-actions-menu-item0");
  const deleteAction = getByTestId("row-actions-menu-item1");

  button.click();
  editAction.click();
  deleteAction.click();

  expect(mockEditAction).toHaveBeenCalledTimes(1);
  expect(mockDeleteAction).toHaveBeenCalledTimes(1);

  rowActionsMenu.unmount();
});
