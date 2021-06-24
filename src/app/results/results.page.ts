import { Component, OnInit } from '@angular/core';
import {Results} from './results.model';
import {ResultsService} from './results.service';
import {PlayersService} from "../players/players.service";

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  results: Results[];

  constructor(private resultsService: ResultsService, private playerService: PlayersService) {
    //this.results = resultsService.results;
  }

  ngOnInit() {
    this.getResults();
  }

  ionViewWillEnter(){
    this.getResults();
  }

  getResults(){
    this.playerService.getPlayers().subscribe((players)=>{
      this.resultsService.getResults().subscribe((resultsData) => {
        this.results = resultsData;
      });
    });
  }

}
