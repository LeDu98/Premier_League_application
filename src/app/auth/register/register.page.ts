import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {AlertController, LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";
import {TeamService} from "../../teams/team.service";
import {Team} from "../../teams/team.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  isLoading=false;
  registerForm: FormGroup;
  //teams: Team[];

  constructor(private authService: AuthService,private loadingCtrl: LoadingController,
              private router: Router, private teamService: TeamService,private alertCtrl: AlertController) { }


  ngOnInit() {
    //this.getTeams();
    this.registerForm=new FormGroup({
      name:new FormControl(null,Validators.required),
      surname: new FormControl(null,Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null,[Validators.required, Validators.minLength(8)])
    });
  }

  onRegister() {
    this.isLoading=true;

    this.loadingCtrl
      .create({message: 'Registering...'})
      .then((loadingEl)=>{
        loadingEl.present();

        this.authService.register(this.registerForm.value).subscribe(resData=>{
          console.log('Registracija uspela');
          console.log(resData);
          loadingEl.dismiss();
          this.router.navigateByUrl('/standings');
        },

          errRes=>{
          this.loadingCtrl.dismiss();
            console.log(errRes);
            this.isLoading=false;
            const message='Invalid email';
            this.alertCtrl.create({
              header: 'Registering failed',
              message,
              buttons: ['Okay']
            }).then((alert)=>{
              alert.present();
            });
          });
      });

  }
/*
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
*/
}
