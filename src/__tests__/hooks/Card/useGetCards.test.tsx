import { expect, test, afterEach, beforeAll } from "vitest";
import { renderHook, waitFor, cleanup } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetCards } from "../../../hooks/Card/useGetCards";
import { axiosClient } from "../../../services";
import MockAdapter from "axios-mock-adapter";

const TEST_ID = "test";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
    },
  },
});

const mock = new MockAdapter(axiosClient, { onNoMatch: "throwException" });

const res = {
  data: [
    {
      _id: "65dcb13dc48d601931fdbc31",
      question: "Question",
      answer: "Answer",
      groupId: "65dcb127c48d601931fdbc25",
      references: [
        {
          type: "text",
          text: "Test text reference",
          _id: "65dcb1b9c48d601931fdbc4c",
        },
      ],
      tags: [
        {
          name: "Test Tag",
          description: "This is a test tag.",
          _id: "65dcb13dc48d601931fdbc33",
        },
      ],
      __v: 0,
    },
  ],
  page: 0,
  limit: 20,
  total: 1,
};

beforeAll(() => {
  mock.reset();
});

afterEach(() => {
  cleanup();
});

test("it fetches cards", async () => {
  mock.onGet(`/api/group/${TEST_ID}/cards`).reply(200, res);
  const { result, unmount } = renderHook(
    () => useGetCards({ page: "0", limit: "5", groupId: TEST_ID }),
    {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    },
  );

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  expect(result.current.data).toEqual(res);

  unmount();
});

test("it returns an error if the group ID is not provided", async () => {
  const { result, unmount } = renderHook(
    () => useGetCards({ page: "0", limit: "5" }),
    {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    },
  );

  await waitFor(() => expect(result.current.isError).toBe(true));

  expect(result?.current?.error?.toString?.()).includes(
    "Cannot fetch cards without a group ID",
  );

  unmount();
});
