import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product : Product = {
    name : '',
    price: 0
  }

  constructor(
    private productService : ProductService,
    private router : Router,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    const id = ''+this.route.snapshot.paramMap.get('id')
    this.productService.readById(id)
    .subscribe(p => {
      this.product = p
    })
  }

  deleteProduct(){
    this.productService.delete(''+this.product.id)
      .subscribe(p => {
        this.router.navigate(['/products'])
      })
  }

  cancel(){
    this.router.navigate(['/products'])
  }

}
