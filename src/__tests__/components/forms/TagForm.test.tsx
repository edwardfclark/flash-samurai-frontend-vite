import { expect, test, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { TagForm } from "../../../components/forms/TagForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

test("it autofills with default values", async () => {
  const tagForm = render(
    <QueryClientProvider client={queryClient}>
      <TagForm
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
  const { getByTestId } = tagForm;
  expect(getByTestId("tag-form-name").innerHTML).includes("test name");
  expect(getByTestId("tag-form-description").innerHTML).includes(
    "test description",
  );
  tagForm.unmount();
});

test("the submit button is disabled if the form is loading", async () => {
  const tagForm = render(
    <QueryClientProvider client={queryClient}>
      <TagForm
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
  const { getByTestId } = tagForm;

  expect(
    getByTestId("tag-form-submit-button").getAttribute("disabled"),
  ).not.toBe(null);

  tagForm.unmount();
});

test("it fires the onSubmit function when the form is submitted", async () => {
  const mockOnSubmit = vi.fn();
  const tagForm = render(
    <QueryClientProvider client={queryClient}>
      <TagForm
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
  const { getByTestId } = tagForm;

  getByTestId("tag-form-submit-button").click();

  await waitFor(() => {
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  tagForm.unmount();
});

test("it calls the onCancel function when the cancel button is clicked", async () => {
  const mockOnCancel = vi.fn();
  const tagForm = render(
    <QueryClientProvider client={queryClient}>
      <TagForm
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
  const { getByTestId } = tagForm;

  getByTestId("tag-form-cancel-button").click();

  await waitFor(() => {
    expect(mockOnCancel).toHaveBeenCalled();
  });

  tagForm.unmount();
});
