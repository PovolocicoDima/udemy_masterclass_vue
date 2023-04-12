import type { Job } from "@/api/types";

export const createJob = (job: Partial<Job> = {}): Job => ({
  id: 1,
  title: "Angular Developer",
  organization: "Vue and Me",
  degree: "Master's",
  jobType: "Intern",
  locations: ["Lisbon"],
  minimumQualifications: ["Embrace sticky infrastructures"],
  preferredQualifications: ["Envisioneer b2b web services"],
  description: ["Author act increase"],
  dateAdded: "2021-07-04",
  ...job,
});
