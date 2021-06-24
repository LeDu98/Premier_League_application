import { Component, OnInit } from '@angular/core';
import {Fixtures} from './fixtures.model';
import {FixturesService} from './fixtures.service';
import {FixturesModalComponent} from './fixtures-modal/fixtures-modal.component';
import {ModalController} from '@ionic/angular';
import {AuthService} from "../auth/auth.service";



@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.page.html',
  styleUrls: ['./fixtures.page.scss'],
})
export class FixturesPage implements OnInit {

  fixtures: Fixtures[];
  awayTeamUrl: string;
  homeTeamUrl: string;
  time: string;
  adminLogged = false;

  constructor(private fixtureService: FixturesService,
              private modalController: ModalController, private authService: AuthService) {
    this.fixtures = this.fixtureService.fixtures;
  }

  ngOnInit() {
      this.adminLogged = this.authService.isAdminLogged();
      this.getFixtures();
  }

  ionViewWillEnter(){
    this.getFixtures();
  }

  getFixtures(){
    this.fixtureService.getFixtures().subscribe((fixtureData) =>{
      this.fixtures = fixtureData;
      this.fixtures.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });
  }

  openModal(){
    this.modalController.create({
      component: FixturesModalComponent,
      componentProps: {title: 'Add fixture'}
    })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      }).then((resultData) => {
      if (resultData.role === 'confirm') {

        const homeTeam = resultData.data.teamData.homeTeam.id;
        const awayTeam = resultData.data.teamData.awayTeam.id;
        console.log(resultData.data.teamData.homeTeam + ' ' + resultData.data.teamData.awayTeam);
        const date = resultData.data.teamData.date;
        const  homeTeamUrl = resultData.data.teamData.homeTeam.imageUrl;
        const  awayTeamUrl = resultData.data.teamData.awayTeam.imageUrl;

        this.fixtureService.addFixture(homeTeam, awayTeam, date, homeTeamUrl, awayTeamUrl).subscribe((res) =>
          this.getFixtures());
      }
    });
  }

}
