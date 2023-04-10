export interface Job {
  id: number;
  title: string;
  organization: string;
  degree: string;
  jobType: string;
  locations: string[];
  description: string[];
  minimumQualifications: string[];
  preferredQualifications: string[];
  dateAdded: string;
}
