import { expect, test } from "vitest";
import { render } from "@testing-library/react";
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
});
