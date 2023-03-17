<template>
  <section class="mb-16">
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
      <span :class="actionClases">{{ action }}</span>
      <br />
      for everyone
    </h1>
    <h2 class="text-3xl font-light">Find your next job at Dima's Corp.</h2>
  </section>
</template>

<script>
import nextElementList from "@/utils/nextElementList.js";

export default {
  data() {
    return {
      action: "Build",
      interval: null,
    };
  },
  computed: {
    actionClases() {
      return {
        [this.action.toLowerCase()]: true,
      };
    },
  },
  created() {
    this.changeTitle();
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    changeTitle() {
      this.interval = setInterval(() => {
        const actions = ["Build", "Design", "Code", "Create"];
        this.action = nextElementList(actions, this.action);
      }, 3000);
    },
  },
};
</script>

<style scoped>
.build {
  color: #1a73e8;
}

.design {
  color: #f9ab00;
}

.code {
  color: #d93025;
}

.create {
  color: #34a853;
}
</style>
