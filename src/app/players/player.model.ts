import {Team} from '../teams/team.model';

export interface Player{
  id: string;
  name: string;
  surname: string;
  team: Team;
  nationality: string;
  position: string;
  goals: number;
  imageUrl: string;
}
