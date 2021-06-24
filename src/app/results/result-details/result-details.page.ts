import { Component, OnInit } from '@angular/core';
import {Results} from '../results.model';
import {ResultsService} from '../results.service';
import {ActivatedRoute} from '@angular/router';
import {PlayersService} from '../../players/players.service';

@Component({
  selector: 'app-result-details',
  templateUrl: './result-details.page.html',
  styleUrls: ['./result-details.page.scss'],
})
export class ResultDetailsPage implements OnInit {

  result: Results;
  constructor(private resultsService: ResultsService, private route: ActivatedRoute,
              private playerService: PlayersService) { }

  ngOnInit() {
    // this.playerService.getPlayers().subscribe((players)=>{
    //
    // });
    const id = this.route.snapshot.paramMap.get('resultId');
    this.result = this.resultsService.getResult(id);
    console.log(this.result);
  }

}
