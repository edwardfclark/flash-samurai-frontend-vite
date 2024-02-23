import { expect, test, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { GroupForm } from "../../../components/forms/GroupForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

test("it autofills with default values", async () => {
  const groupForm = render(
    <QueryClientProvider client={queryClient}>
      <GroupForm
        defaultValues={{
          name: "test name",
          description: "test description",
        }}
        onSubmit={() => {}}
        onCancel={() => {}}
        isLoading={false}
      />
    </QueryClientProvider>,
  );
  const { getByTestId } = groupForm;
  expect(getByTestId("group-form-name").innerHTML).includes("test name");
  expect(getByTestId("group-form-description").innerHTML).includes(
    "test description",
  );
  groupForm.unmount();
});

test("the submit button is disabled if the form is loading", async () => {
  const groupForm = render(
    <QueryClientProvider client={queryClient}>
      <GroupForm
        defaultValues={{
          name: "test name",
          description: "test description",
        }}
        onSubmit={() => {}}
        onCancel={() => {}}
        isLoading={true}
      />
    </QueryClientProvider>,
  );
  const { getByTestId } = groupForm;

  expect(
    getByTestId("group-form-submit-button").getAttribute("disabled"),
  ).not.toBe(null);

  groupForm.unmount();
});

test("it fires the onSubmit function when the form is submitted", async () => {
  const mockOnSubmit = vi.fn();
  const groupForm = render(
    <QueryClientProvider client={queryClient}>
      <GroupForm
        defaultValues={{
          name: "test name",
          description: "test description",
        }}
        onSubmit={mockOnSubmit}
        onCancel={() => {}}
        isLoading={false}
      />
    </QueryClientProvider>,
  );
  const { getByTestId } = groupForm;

  getByTestId("group-form-submit-button").click();

  await waitFor(() => {
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  groupForm.unmount();
});

test("it calls the onCancel function when the cancel button is clicked", async () => {
  const mockOnCancel = vi.fn();
  const groupForm = render(
    <QueryClientProvider client={queryClient}>
      <GroupForm
        defaultValues={{
          name: "test name",
          description: "test description",
        }}
        onSubmit={() => {}}
        onCancel={mockOnCancel}
        isLoading={false}
      />
    </QueryClientProvider>,
  );
  const { getByTestId } = groupForm;

  getByTestId("group-form-cancel-button").click();

  await waitFor(() => {
    expect(mockOnCancel).toHaveBeenCalled();
  });

  groupForm.unmount();
});
