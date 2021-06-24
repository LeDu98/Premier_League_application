import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {Team} from '../../teams/team.model';
import {TeamService} from '../../teams/team.service';


@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.component.html',
  styleUrls: ['./player-modal.component.scss'],
})
export class PlayerModalComponent implements OnInit {
  @ViewChild('f', {static: true}) form: NgForm;
  @Input() title: string;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  teams: Team[];

  constructor(private modalCtrl: ModalController, private teamService: TeamService) {
    this.getTeams();}

  ngOnInit() {}

  ionViewWillEnter(){
    this.getTeams();
  }

  onAddPlayer(){
    if (!this.form.valid){
      return;
    }
    this.modalCtrl.dismiss({
      playerData: {
        name: this.form.value.name,
        surname: this.form.value.surname,
        team: this.form.value.team,
        nationality: this.form.value.nationality,
        position: this.form.value.position,
        goals: this.form.value.goals,
        imageUrl: this.form.value.imageUrl
      }}, 'confirm');
  }
  onCancel(){
    this.modalCtrl.dismiss();
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


}
