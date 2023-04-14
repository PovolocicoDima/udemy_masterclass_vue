import { createPinia, setActivePinia } from "pinia";

import { useUserStore } from "@/stores/user";

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("keeps track of if user is logged in", () => {
    const store = useUserStore();
    expect(store.isLoggedIn).toBe(false);
  });

  it("stores organizations that the user would like to filter jobs by", () => {
    const store = useUserStore();
    expect(store.selectedOrganizations).toEqual([]);
  });

  it("stores job types that th user would like to filter jobs by", () => {
    const store = useUserStore();
    expect(store.selectedJobTypes).toEqual([]);
  });

  it("stores degrees that the user would like to filter jobs by", () => {
    const store = useUserStore();
    expect(store.selectedDegrees).toEqual([]);
  });

  it("stores user's search term for skills and qualification", () => {
    const store = useUserStore();
    expect(store.skillsSearchTerm).toBe("");
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("LOGIN_USER", () => {
    it("logs the user in", () => {
      const store = useUserStore();
      store.LOGIN_USER();
      expect(store.isLoggedIn).toBe(true);
    });
  });

  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    it("adds an organization to the list of selected organizations", () => {
      const store = useUserStore();
      store.ADD_SELECTED_ORGANIZATIONS(["org1", "org2"]);
      expect(store.selectedOrganizations).toEqual(["org1", "org2"]);
    });
  });

  describe("ADD_SELECTED_JOB_TYPES", () => {
    it("updates job types the user has chosen to filter jobs by", () => {
      const store = useUserStore();
      store.ADD_SELECTED_JOB_TYPES(["full-time", "part-time"]);
      expect(store.selectedJobTypes).toEqual(["full-time", "part-time"]);
    });
  });

  describe("ADD_SELECTED_DEGREES", () => {
    it("updates degrees the user has chosen to filter jobs by", () => {
      const store = useUserStore();
      store.ADD_SELECTED_DEGREES(["Master's"]);
      expect(store.selectedDegrees).toEqual(["Master's"]);
    });
  });

  describe("CLEAR_USER_JOB_FILTERS_SELECTED", () => {
    it("removes all job filters that user has chosen", () => {
      const store = useUserStore();
      store.selectedDegrees = ["Random Degree"];
      store.selectedJobTypes = ["Random Job type"];
      store.selectedOrganizations = ["Random Organization"];
      store.skillsSearchTerm = "vue developer";

      store.CLEAR_USER_JOB_FILTERS_SELECTED();

      expect(store.selectedDegrees).toEqual([]);
      expect(store.selectedJobTypes).toEqual([]);
      expect(store.selectedOrganizations).toEqual([]);
      expect(store.skillsSearchTerm).toBe("");
    });
  });

  describe("UPDATE_SKILLS_SEARCH_TERM", () => {
    it("receives search term for skills the user has entered", () => {
      const store = useUserStore();
      store.skillsSearchTerm = "";
      store.UPDATE_SKILLS_SEARCH_TERM("Vue");
      expect(store.skillsSearchTerm).toBe("Vue");
    });
  });
});
