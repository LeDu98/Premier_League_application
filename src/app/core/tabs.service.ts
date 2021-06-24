import { Injectable } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {Platform} from "@ionic/angular";
import {filter} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  private hideTabBarPages: string[] = [
    'log-in','register'
  ];
  constructor(private router: Router, private platform: Platform) {
    this.platform.ready().then(() => {
      this.navEvents();
    });
  }

  private navEvents() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.showHideTabs(e);
      });
  }

  private showHideTabs(e: NavigationEnd) {
    const urlArray = e.url.split('/');
    const pageUrl = urlArray[urlArray.length - 1];
    const shouldHide = this.hideTabBarPages.indexOf(pageUrl) > -1;
    try {
      setTimeout(() => shouldHide ? this.hideTabs() : this.showTabs(), 300);
    } catch (err) {}
  }
  public hideTabs() {
    const tabBar = document.getElementById('myTabBar');
    if (tabBar !== null && tabBar.style.display !== 'none') tabBar.style.display = 'none';
  }

  public showTabs() {
    const tabBar = document.getElementById('myTabBar');
    if (tabBar !== null && tabBar.style.display !== 'flex') tabBar.style.display = 'flex';
  }
}
