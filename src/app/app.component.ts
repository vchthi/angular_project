import { Component } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})




export class AppComponent {
  title = 'asm';
  routerUrl: string='';



constructor(private router: Router){}

  ngOnInit(){
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd){
        this.routerUrl=event.url;
      }
    })
  }
}

