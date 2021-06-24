import { Component, OnInit } from '@angular/core';
import {Player} from '../../player.model';
import {PlayersService} from '../../players.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../auth/auth.service';
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.page.html',
  styleUrls: ['./player-details.page.scss'],
})
export class PlayerDetailsPage implements OnInit {
  adminLogged = false;
  players: Player[];

  player: Player;

  constructor(private playerService: PlayersService, private route: ActivatedRoute,
              private authService: AuthService,private alertController: AlertController) { }

  ngOnInit() {
    this.adminLogged = this.authService.isAdminLogged();
    const id = this.route.snapshot.paramMap.get('playerId');
    this.player = this.playerService.getPlayer(id);
    console.log(this.player);

  }

  // ionViewDidEnter(){
  //   console.log(this.players.find( p => p.id === id));
  //   const id = this.route.snapshot.paramMap.get('playerId');
  //   this.player = this.players.find( p => p.id === id);
  //   console.log(this.player);
  // }

  onDelete(){

    const alert = this.presentAlertConfirm().then(res => {
      if (res === 'yes') {
        const id = this.route.snapshot.paramMap.get('playerId');
        this.playerService.deletePlayer(id).subscribe((ret)=>{
          window.history.back();
        });
      }
    });
  }

  async presentAlertConfirm() {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Are you sure to delete this item?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (cancel) => {
              resolve('no');
            }
          }, {
            text: 'Yes',
            handler: (ok) => {
              resolve('yes');
            }
          }
        ]
      });
      alert.present();
    });
  }

}
