<template>
  <div>Job page</div>
</template>

<script>
export default {
  name: "JobView",
  computed: {
    jobId() {
      return this.$route.params.id;
    },
  },
};
</script>
