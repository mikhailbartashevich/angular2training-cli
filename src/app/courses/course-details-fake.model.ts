export class CourseDetailsFake {
  idFake: number;
  titleFake: string;
  durationMsFake: number;
  creationDateMsFake: number;
  descriptionFake: string;
  topRatedFake: boolean;

  constructor(
    idFake: number,
    titleFake: string,
    durationMsFake: number,
    creationDateMsFake: number,
    descriptionFake: string,
    topRatedFake: boolean
  ) {
    this.idFake = idFake;
    this.titleFake = titleFake;
    this.durationMsFake = durationMsFake;
    this.creationDateMsFake = creationDateMsFake;
    this.descriptionFake = descriptionFake;
    this.topRatedFake = topRatedFake;
  }
}
