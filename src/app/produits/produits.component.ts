import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProduitsService} from "../services/produits.service";
import {Produits} from "../../../model/model.produits";
import {Observable} from "rxjs";


@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit{

public produits : Array<Produits>=[];
public keyword:string="";
public pageSize:number=3;
public currentPage : number=1;
public totalPage: number=0;

constructor(private produitService: ProduitsService){}
ngOnInit(): void {
  this.getProduits();
}
getProduits(){

    this.produitService.getProduct(this.currentPage,this.pageSize)
        .subscribe({
            next: (resp) => {
                this.produits=resp.body as Produits[];
                let totalProduits : number=parseInt(resp.headers.get('x-total-count')!);
                this.totalPage = Math.floor(totalProduits / this.pageSize);
                if (totalProduits % this.pageSize != 0){
                    this.totalPage = this.totalPage + 1;
                }
            },
            error : err => {
                console.log(err);
            }
        })


    //this.produits = this.produitService.getProduct();
}
disponible(produit:Produits){
  this.produitService.checkProduct(produit).subscribe({
    next: updatedProduit => {
      produit.active =! produit.active;
      //this.getProduits();
    }
  })

}

    productDelete(produit: Produits) {
        if (confirm("Attention !!"))
        this.produitService.deleteProduct(produit).subscribe({
            next : value => {
                //this.getProduits();
               this.produits = this.produits.filter(p=>p.id!=produit.id);
            }
        })
    }

    searchProduct() {
        this.produitService.researchProduct(this.keyword).subscribe({
            next:value => {
                this.produits=value;
            }
        })
    }

    pageCourant(page: number) {
        this.currentPage=page;
        this.getProduits()
    }
}
