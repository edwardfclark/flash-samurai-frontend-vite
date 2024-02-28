import { expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetCards } from "../../hooks/Card/useGetCards";
import createFetchMock from "vitest-fetch-mock";

const fetchMocker = createFetchMock(vi);
