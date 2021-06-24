import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../player.model';

@Component({
  selector: 'app-player-element',
  templateUrl: './player-element.component.html',
  styleUrls: ['./player-element.component.scss'],
})
export class PlayerElementComponent implements OnInit {

  @Input() player: Player;

  constructor() { }

  ngOnInit() {}

}
