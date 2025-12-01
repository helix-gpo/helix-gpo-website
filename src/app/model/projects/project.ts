import { Partner } from '../partners/partner';
import { Tag } from './tag';

export class Project {
  id!: number;
  title!: string;
  description!: string;
  startDate!: Date;
  endDate!: Date;
  imageUrl!: string;
  tags!: Tag[];
  showOnWebsite!: boolean;
  websitePartnerDto!: Partner;
}
