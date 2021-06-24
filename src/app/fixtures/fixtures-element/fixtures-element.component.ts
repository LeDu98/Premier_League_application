import {Component, Input, OnInit} from '@angular/core';
import {Fixtures} from '../fixtures.model';

@Component({
  selector: 'app-fixtures-element',
  templateUrl: './fixtures-element.component.html',
  styleUrls: ['./fixtures-element.component.scss'],
})
export class FixturesElementComponent implements OnInit {

  @Input() fixture: Fixtures;
  @Input() time: string;

  constructor() { }

  ngOnInit() {}

}
