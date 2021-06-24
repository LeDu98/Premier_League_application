import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSearchbar, MenuController, ModalController} from '@ionic/angular';
import {PlayerModalComponent} from '../player-modal/player-modal.component';
import {PlayersService} from '../players.service';
import {Player} from '../player.model';
import {Subscription} from 'rxjs';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

  @ViewChild('search',{static:false}) search: IonSearchbar;

  adminLogged = false;
  players: Player[];
  private playerSub: Subscription;

  constructor(private menuCtrl: MenuController,private playerService: PlayersService,
              private modalCtrl: ModalController, private authService: AuthService) {}

  ngOnInit() {
    this.adminLogged = this.authService.isAdminLogged();
    this.playerSub = this.playerService.players.subscribe((players)=>{
      this.players=players;
    });
  }

  getPlayers(){
    this.playerService.getPlayers().subscribe((players)=>{
      //this.players=players;
    });
  }

  ionViewWillEnter(){
      this.getPlayers();
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
      this.players.sort(function(a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      //this.players.sort((a, b) => a.surname.localeCompare(b.surname));
  }

  openModal() {
    this.modalCtrl.create({
      component: PlayerModalComponent,
      componentProps: {title: 'Add player'}
    })
      .then((modal) => {
        modal.present();
  return modal.onDidDismiss();
      }).then((resultData) => {
        if(resultData.role === 'confirm'){
          const goals = parseInt(resultData.data.playerData.goals, 10);
          // @ts-ignore
          // eslint-disable-next-line max-len
          this.playerService.addPlayer(resultData.data.playerData.name,resultData.data.playerData.surname,
            resultData.data.playerData.team.id, resultData.data.playerData.nationality,
            resultData.data.playerData.position, goals,
            resultData.data.playerData.imageUrl).subscribe((res) =>
              this.getPlayers()
          );
        }
    });
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy(){
    if(this.playerSub){
      this.playerSub.unsubscribe();
    }
  }

  ionViewDidEnter(){
    setTimeout(()=>{
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.search.setFocus;
    });
  }

  _ionChange(event) {
    const val = event.target.value;
    if (val === '') {
      this.getPlayers();
    }
    if (val && val.trim() !== '') {
      this.players = this.players.filter((item: any) =>
        (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.surname.toLowerCase().indexOf(val.toLowerCase()) > -1));
    }
  }
}
