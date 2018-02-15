import { Component,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
 // styleUrls: ['./app.component.css']
 styleUrls:['./assets/bootstrap/animate-custom.css'
,'./assets/bootstrap/styles.css'
,'./assets/bootstrap/font-awesome.css'],
 encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'app';
}
