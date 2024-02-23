import { expect, test, vi } from "vitest";
import { render } from "@testing-library/react";
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
