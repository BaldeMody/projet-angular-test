import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProduitsService} from "../services/produits.service";
import {Produits} from "../../../model/model.produits";

@Component({
  selector: 'app-nouveau-produit',
  templateUrl: './nouveau-produit.component.html',
  styleUrls: ['./nouveau-produit.component.css']
})
export class NouveauProduitComponent implements OnInit{

  produitForm!:FormGroup;

  constructor(private fb: FormBuilder, private productService:ProduitsService) {
  }
  ngOnInit(): void {
    this.produitForm = this.fb.group({
      nom : this.fb.control(''),
      marque : this.fb.control(''),
      prix : this.fb.control(''),
      active: this.fb.control(false)
    })
  }

  saveProduct() {
    let produit :Produits = this.produitForm.value;
    this.productService.saveProduit(produit).subscribe({
      next : data => {
        alert(JSON.stringify(data));
      },
      error : err => {
        console.log(err);
      }
    })

  }
}
