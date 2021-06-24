import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {TeamService} from '../../teams/team.service';
import {isEmpty} from "rxjs/operators";

interface Team {
  id: string;
  name: string;
  played: number;
  points: number;
  wins: number;
  losses: number;
  draws: number;
  imageUrl: string;
}

@Component({
  selector: 'app-fixtures-modal',
  templateUrl: './fixtures-modal.component.html',
  styleUrls: ['./fixtures-modal.component.scss'],
})
export class FixturesModalComponent implements OnInit {

  @ViewChild('f1', {static: true}) form: NgForm;
  @Input() title: string;


  teams: Team[];

  constructor(private modalController: ModalController, private teamService: TeamService) {
    this.getTeams();
  }

  ngOnInit() {}

  onCancel(){
    this.modalController.dismiss();
  }

  onAddFixture(){
    if (!this.form.valid){
      return;
    }
    if((this.form.value.homeTeam.id!==this.form.value.awayTeam.id) && this.form.value.date!==''){
    this.modalController.dismiss({teamData: {
        homeTeam: this.form.value.homeTeam,
        awayTeam: this.form.value.awayTeam,
        date: this.form.value.date
      }}, 'confirm');
  }
    else{
      console.log('NEMA');
    }
  }


  getTeams(){
    this.teamService.getTeams().subscribe((teamData) =>{
      const teams: Team[] = [];

      for (const key in teamData){
        if(teamData.hasOwnProperty(key)){
          teams.push({
            id: teamData[key].id,
            name: teamData[key].name,
            wins: teamData[key].wins,
            losses: teamData[key].losses,
            draws: teamData[key].draws,
            played: teamData[key].played,
            points: teamData[key].points,
            imageUrl: teamData[key].imageUrl
          });

        }
      }

      this.teams = teams;
    });
  }

  compareWith(o1: Team, o2: Team | Team[]) {
    if (!o1 || !o2) {
      return o1 === o2;
    }

    if (Array.isArray(o2)) {
      return o2.some((t: Team) => t.id === o1.id);
    }

    return o1.id === o2.id;
  }
}
