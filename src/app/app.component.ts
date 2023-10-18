import { Component } from '@angular/core';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EcoUbica';
  userEmail:boolean = false;

  constructor(private userService: UserService){
    if(this.userService.userEmail){
      console.log(this.userEmail);
    }else{
      this.userEmail = false;
    }
    console.log(this.userEmail);
  }

  ngOnInit() {
  }

}
