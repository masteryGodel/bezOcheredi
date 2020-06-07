import { Component, OnInit } from '@angular/core';




export interface Card {
  title: string;
  category: string;
  description: string;
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

}
