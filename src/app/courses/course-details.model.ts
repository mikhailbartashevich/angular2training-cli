export class CourseDetails {
  id: number;
  title: string;
  durationMs: number;
  creationDateMs: number;
  description: string;
  topRated: boolean;
  authors: string[];

  constructor(
    id: number,
    title: string,
    durationMs: number,
    creationDateMs: number,
    description: string,
    topRated: boolean
  ) {
    this.id = id;
    this.title = title;
    this.durationMs = durationMs;
    this.creationDateMs = creationDateMs;
    this.description = description;
    this.topRated = topRated;
  }
}
