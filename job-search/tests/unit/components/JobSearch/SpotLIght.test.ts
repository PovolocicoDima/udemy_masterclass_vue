import { screen, render } from "@testing-library/vue";
import axios from "axios";
import type { Mock } from "vitest";
import SpotLight from "@/components/JobSearch/SpotLight.vue";

vi.mock("axios");

const axiosGetMock = axios.get as Mock;

describe("SpotLight.vue", () => {
  const mockSpotlightsResponse = (spotlight = {}) => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "some_title",
          description: "some_description",
          img: "some_image.jpg",
          ...spotlight,
        },
      ],
    });
  };

  it("provides image to parent component", async () => {
    const spotlight = { img: "another_image.jpg" };
    mockSpotlightsResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
                    <h1>{{ slotProps.img }}</h1>
                  </template>`,
      },
    });

    const text = await screen.findByText("another_image.jpg");
    expect(text).toBeInTheDocument();
  });

  it("provides title to parent component", async () => {
    const spotlight = { title: "another_title" };
    mockSpotlightsResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
                    <h1>{{ slotProps.title }}</h1>
                  </template>`,
      },
    });

    const text = await screen.findByText("another_title");
    expect(text).toBeInTheDocument();
  });

  it("provides description to parent component", async () => {
    const spotlight = { description: "another_description" };
    mockSpotlightsResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
                    <h1>{{ slotProps.description }}</h1>
                  </template>`,
      },
    });

    const text = await screen.findByText("another_description");
    expect(text).toBeInTheDocument();
  });
});
