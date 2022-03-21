import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product = {
    name : '',
    price : 0
  }

  constructor(
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = ""+this.route.snapshot.paramMap.get('id')
    this.productService.readById(id)
      .subscribe(p => {
        this.product = p
      })
  }

  updateProduct(): void {
    this.productService.update(this.product)
    .subscribe(p => {
      this.router.navigate(['/products'])
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
