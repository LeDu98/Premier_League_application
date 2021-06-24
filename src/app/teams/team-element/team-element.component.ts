import {Component, Input, OnInit} from '@angular/core';
import {Team} from '../team.model';

@Component({
  selector: 'app-team-element',
  templateUrl: './team-element.component.html',
  styleUrls: ['./team-element.component.scss'],
})
export class TeamElementComponent implements OnInit {

  @Input() team: Team;

  constructor() { }

  ngOnInit() {}

}
