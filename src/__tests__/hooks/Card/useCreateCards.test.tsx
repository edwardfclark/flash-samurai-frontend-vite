import { expect, test, afterEach, beforeAll } from "vitest";
import { renderHook, waitFor, cleanup } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCreateCard } from "../../../hooks/Card/useCreateCard";
import { axiosClient } from "../../../services";
import MockAdapter from "axios-mock-adapter";
import { ICard } from "../../../types/Cards";
import { SnackbarProvider } from "notistack";

const GROUP_TEST_ID = "test";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
    },
  },
});

const mock = new MockAdapter(axiosClient, { onNoMatch: "throwException" });

const card: ICard = {
  question: "Question",
  answer: "Answer",
  references: [
    {
      type: "text",
      text: "Test text reference",
    },
  ],
  tags: [
    {
      _id: "test_tag",
      groupId: GROUP_TEST_ID,
      name: "Test Tag",
      description: "This is a test tag.",
    },
  ],
};

beforeAll(() => {
  mock.reset();
});

afterEach(() => {
  cleanup();
});

test("it creates a card", async () => {
  mock.onPost(`/api/card`).reply(200, card);
  const { result, unmount } = renderHook(
    () => useCreateCard({ groupId: GROUP_TEST_ID }),
    {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>{children}</SnackbarProvider>
        </QueryClientProvider>
      ),
    },
  );

  expect(result?.current?.mutate).toBeDefined();

  result.current.mutate(card);

  await waitFor(() => expect(result?.current?.data).toEqual(card));

  unmount();
});
