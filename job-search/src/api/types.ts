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

export interface Spotlight {
  id: number;
  img: string;
  title: string;
  description: string;
}

export interface Degree {
  id: number;
  degree: string;
}
