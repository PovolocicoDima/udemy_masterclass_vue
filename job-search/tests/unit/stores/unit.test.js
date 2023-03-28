import { createPinia, setActivePinia } from "pinia";
import { useUserStore } from "@/stores/user";

describe("state", () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  it("keeps track of if user logged in", () => {
    const store = useUserStore();

    expect(store.isLoggedIn).toBe(false);
  });
});

describe("actions", () => {
  describe("loginUser", () => {
    it("logs user in", () => {
      const store = useUserStore();

      store.loginUser();

      expect(store.isLoggedIn).toBe(true);
    });
  });
});
