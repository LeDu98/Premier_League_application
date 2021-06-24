import {Component, Input, OnInit} from '@angular/core';
import {Results} from '../results.model';

@Component({
  selector: 'app-results-element',
  templateUrl: './results-element.component.html',
  styleUrls: ['./results-element.component.scss'],
})
export class ResultsElementComponent implements OnInit {

  @Input() result: Results;

  constructor() { }

  ngOnInit() {}

}
