import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Produits} from "../../../model/model.produits";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {


  constructor(private http: HttpClient) { }
  getProduct(page: number=1, size : number=3){
    return this.http.get(`http://localhost:3000/produits?_page=${page}&_limit=${size}`, {observe: 'response'});
  }
  checkProduct(produit:Produits){
    return this.http.patch<Produits>("http://localhost:3000/produits/"+produit.id,
        {active:!produit.active});
  }
  deleteProduct(produit:Produits){
    return this.http.delete<any>("http://localhost:3000/produits/"+produit.id)

  }

  saveProduit(produit:Produits):Observable<Produits> {
    return this.http.post<Produits>("http://localhost:3000/produits/",
        produit);
  }
  public researchProduct(keyword:string):Observable<Array<Produits>>{
    return this.http.get<any>(`http://localhost:3000/produits?nom_like=${keyword}`);
  }

}
