import {Component, OnInit, ViewChild} from '@angular/core';
import {TeamService} from '../team.service';
import {Team} from '../team.model';
import {IonSearchbar, MenuController, ModalController} from '@ionic/angular';
import {TeamModalComponent} from '../team-modal/team-modal.component';
import {Subscribable, Subscription} from 'rxjs';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

  @ViewChild('search',{static:false}) search: IonSearchbar;

  adminLogged = false;
  teams: Team[];
  private teamSub: Subscription;

  constructor(private menuCtrl: MenuController, private teamService: TeamService,
              private modalController: ModalController, private authService: AuthService) {}

  ngOnInit() {
    this.adminLogged = this.authService.isAdminLogged();
    this.teamSub = this.teamService.teams.subscribe((teams) => {
      this.teams = teams;
    });
  }

  getTeams(){
    this.teamService.getTeams().subscribe((teams) =>{
      //this.teams = teams;
    });
  }

  ionViewWillEnter() {
    this.getTeams();
  }

  ionViewDidEnter(){
    setTimeout(()=>{
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.search.setFocus;
    });
  }

  openModal(){
    this.modalController.create({
      component: TeamModalComponent,
      componentProps: {title: 'Add team'}
    })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      }).then((resultData) => {
      if (resultData.role === 'confirm') {
        console.log(resultData);

        const wins = parseInt(resultData.data.teamData.wins, 10);
        const losses = parseInt(resultData.data.teamData.losses, 10);
        const draws = parseInt(resultData.data.teamData.draws, 10);

        const played = wins + losses + draws;
        const points = 3 * wins + draws;

        console.log('Wins ' + wins +
        ' losses: ' + losses +
          ' Drawn: ' + draws + ' Played: ' + played + ' Points: ' + points);

        this.teamService.addTeam(resultData.data.teamData.name,
          played, points, wins, losses, draws, resultData.data.teamData.imageURL).subscribe((res) =>
          console.log(res)
        );
      }
    });
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy(){
    if(this.teamSub){
      this.teamSub.unsubscribe();
    }
  }

  _ionChange(event) {
    console.log(event.target.value);
    const val=event.target.value;
    if(val===''){
      this.getTeams();
    }
    if(val && val.trim()!==''){
      this.teams=this.teams.filter((item: any)=>
        (item.name.toLowerCase().indexOf(val.toLowerCase())>-1));
    }

  }

}
