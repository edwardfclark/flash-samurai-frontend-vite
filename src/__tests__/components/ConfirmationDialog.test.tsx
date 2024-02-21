import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";

test("it renders a dialog with the passed text", async () => {
  const title = "Are you sure?";
  const description = "This action cannot be undone.";
  const confirmationDialog = render(
    <ConfirmationDialog
      isOpen={true}
      onClose={() => {}}
      onConfirm={() => {}}
      title={title}
      description={description}
    />,
  );

  const { getByText } = confirmationDialog;

  expect(getByText(title).textContent).toEqual(title);
  expect(getByText(description).textContent).toEqual(description);
  expect(getByText("Cancel").textContent).toEqual("Cancel");
  expect(getByText("Confirm").textContent).toEqual("Confirm");

  confirmationDialog.unmount();
});

test("it does not show the spinner if isLoading is false", async () => {
  const confirmationDialog = render(
    <ConfirmationDialog
      isOpen={true}
      onClose={() => {}}
      onConfirm={() => {}}
      title="Are you sure?"
    />,
  );

  const { queryByTestId } = confirmationDialog;

  expect(queryByTestId("confirmation-dialog-loading-spinner")).toBeNull();

  confirmationDialog.unmount();
});

test("shows a loading spinner if the request is loading", async () => {
  const confirmationDialog = render(
    <ConfirmationDialog
      isOpen={true}
      onClose={() => {}}
      onConfirm={() => {}}
      title="Are you sure?"
      isLoading={true}
    />,
  );

  const { getByTestId } = confirmationDialog;

  expect(getByTestId("confirmation-dialog-loading-spinner")).toBeTruthy();

  confirmationDialog.unmount();
});
