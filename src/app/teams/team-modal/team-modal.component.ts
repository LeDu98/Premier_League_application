import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-team-modal',
  templateUrl: './team-modal.component.html',
  styleUrls: ['./team-modal.component.scss'],
})
export class TeamModalComponent implements OnInit {
  @ViewChild('f', {static: true}) form: NgForm;
  @Input() title: string;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  onCancel(){
    this.modalController.dismiss();
  }

  onAddTeam(){
     if (!this.form.valid){
       return;
     }
     this.modalController.dismiss({teamData: {
       name: this.form.value.team,
         wins: this.form.value.wins,
         losses: this.form.value.losses,
         draws: this.form.value.draws,
         imageURL: this.form.value.imageURL
       }}, 'confirm');

  }

}
