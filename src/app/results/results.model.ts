import {Team} from '../teams/team.model';
import {Player} from '../players/player.model';

export interface Results{
  id: string;
  clubHome: Team;
  clubAway: Team;
  goalsHome: number;
  goalsAway: number;
  homeScorers: Player[];
  awayScorers: Player[];
  date: Date;
  datePreview: string;
}
