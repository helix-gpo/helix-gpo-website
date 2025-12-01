import { Project } from "../projects/project";

export class TestimonialResponse {
    id!: number;
    title!: string;
    description!: string;
    result!: number;
    imageUrl!: string;
    creationDate!: Date;
    lastUpdate!: Date;
    showOnWebsite!: boolean;
    websiteProjectDto!: Project;
}
