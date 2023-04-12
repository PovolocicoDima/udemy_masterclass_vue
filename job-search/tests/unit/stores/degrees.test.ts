import { createPinia, setActivePinia } from "pinia";
import { useDegreeStore } from "@/stores/degrees";
import axios from "axios";
import { createDegree } from "@/utils/createDegree";
import type { Mock } from "vitest";
vi.mock("axios");

const axiosGetMock = axios.get as Mock;

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("stores all degrees that may require", () => {
    const store = useDegreeStore();
    expect(store.degrees).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("FETCH_DEGREES", () => {
    it("makes API request and stores received degrees", async () => {
      axiosGetMock.mockResolvedValue({
        data: [
          {
            id: 1,
            degree: "Associate",
          },
        ],
      });

      const store = useDegreeStore();
      await store.FETCH_DEGREES();
      expect(store.degrees).toEqual([
        {
          id: 1,
          degree: "Associate",
        },
      ]);
    });
  });
});

describe("getters", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("UNIQUE_DEGREES", () => {
    it("finds the unique degrees from collection of degrees", () => {
      const store = useDegreeStore();
      store.degrees = [
        createDegree({ degree: "Master's" }),
        createDegree({ degree: "Bachelor's" }),
      ];

      const result = store.UNIQUE_DEGREES;
      expect(result).toEqual(["Master's", "Bachelor's"]);
    });
  });
});
