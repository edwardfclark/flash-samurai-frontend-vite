import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";

test("it renders a dialog with the passed title and description", async () => {
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

  confirmationDialog.unmount();
});
