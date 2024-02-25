import { expect, test, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { CardForm } from "../../../components/forms/CardForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

test("it autofills with default values", async () => {
  const cardForm = render(
    <QueryClientProvider client={queryClient}>
      <CardForm
        defaultValues={{
          question: "test question",
          answer: "test answer",
          references: [{ type: "text", text: "test reference" }],
          tags: [
            {
              _id: "test",
              name: "test name",
              description: "test description",
              groupId: "test_group_id",
            },
          ],
        }}
        onSubmit={() => {}}
        onCancel={() => {}}
        isLoading={false}
      />
    </QueryClientProvider>,
  );
  const { getByTestId } = cardForm;

  expect(getByTestId("card-form-tags-autocomplete").innerHTML).includes(
    "test name",
  );
  expect(getByTestId("card-form-question").innerHTML).includes("test question");
  expect(getByTestId("card-form-answer").innerHTML).includes("test answer");
  expect(getByTestId("card-form-reference").innerHTML).includes(
    "test reference",
  );

  cardForm.unmount();
});

test("the submit button is disabled if the form is loading", async () => {
  const cardForm = render(
    <QueryClientProvider client={queryClient}>
      <CardForm
        defaultValues={{
          question: "test question",
          answer: "test answer",
          reference: "test reference",
          tags: [
            {
              _id: "test",
              name: "test name",
              description: "test description",
              groupId: "test_group_id",
            },
          ],
        }}
        onSubmit={() => {}}
        onCancel={() => {}}
        isLoading={true}
      />
    </QueryClientProvider>,
  );

  const { getByTestId } = cardForm;
  const submitButton = getByTestId("card-form-submit-button");

  expect(submitButton.getAttribute("disabled")).not.toBe(null);

  cardForm.unmount();
});

test("it fires the onSubmit function when the form is submitted", async () => {
  const onSubmit = vi.fn();
  const cardForm = render(
    <QueryClientProvider client={queryClient}>
      <CardForm
        defaultValues={{
          question: "test question",
          answer: "test answer",
          reference: "test reference",
          tags: [
            {
              _id: "test",
              name: "test name",
              description: "test description",
              groupId: "test_group_id",
            },
          ],
        }}
        onSubmit={onSubmit}
        onCancel={() => {}}
        isLoading={false}
      />
    </QueryClientProvider>,
  );

  const { getByTestId } = cardForm;
  const submitButton = getByTestId("card-form-submit-button");

  submitButton.click();

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalled();
  });

  cardForm.unmount();
});

test("it fires the onCancel function when the cancel button is clicked", async () => {
  const onCancel = vi.fn();
  const cardForm = render(
    <QueryClientProvider client={queryClient}>
      <CardForm
        defaultValues={{
          question: "test question",
          answer: "test answer",
          reference: "test reference",
          tags: [
            {
              _id: "test",
              name: "test name",
              description: "test description",
              groupId: "test_group_id",
            },
          ],
        }}
        onSubmit={() => {}}
        onCancel={onCancel}
        isLoading={false}
      />
    </QueryClientProvider>,
  );

  const { getByTestId } = cardForm;
  const cancelButton = getByTestId("card-form-cancel-button");

  cancelButton.click();

  expect(onCancel).toHaveBeenCalled();

  cardForm.unmount();
});
