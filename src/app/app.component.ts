import { Component } from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Router} from '@angular/router';
import {TabsService} from './core/tabs.service';
import {ResultsService} from './results/results.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  results: number;

  constructor(private authService: AuthService, private router: Router,
              public tabs: TabsService) {
  }

  onLogOut() {
    this.authService.logOut();
    this.router.navigateByUrl('/log-in');
    location.reload();
  }
}
