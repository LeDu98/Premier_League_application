import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../../players/player.model';

@Component({
  selector: 'app-scorer-element',
  templateUrl: './scorer-element.component.html',
  styleUrls: ['./scorer-element.component.scss'],
})
export class ScorerElementComponent implements OnInit {

  @Input() scorer: Player;

  constructor() { }

  ngOnInit() {}

}
