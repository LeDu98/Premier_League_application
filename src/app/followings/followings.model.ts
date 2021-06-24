import {Team} from '../teams/team.model';

export interface Follow{
  id: string;
  userId: string;
  teams: string[];
}
