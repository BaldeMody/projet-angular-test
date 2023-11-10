import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  actions : Array<any> = [
  {title:"Home", route:"/home", icon : "house"},
  {title:"Produits", route:"/produits", icon : "list-task"},
  {title:"Nouveau produit", route:"/newProduit", icon : "plus-circle"}
  ];
  currentAction:any;
  setCurrentAction(action:any){
    this.currentAction=action;
  }
}
