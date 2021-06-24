import {Component, Input, OnInit} from '@angular/core';
import {Team} from '../../teams/team.model';


interface TeamsPreview{
  position: number;
  team: Team;
}


@Component({
  selector: 'app-team-element-standing',
  templateUrl: './team-element-standing.component.html',
  styleUrls: ['./team-element-standing.component.scss'],
})
export class TeamElementStandingComponent implements OnInit {

  @Input() teamsPreview: TeamsPreview;

  constructor() { }

  ngOnInit() {}

}
