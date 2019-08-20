import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProductResolved } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductResolved> {
  constructor(private ProductService: ProductService) {}

  // in the resolve function, the activated route snapshot contains information about the current activated route
  // Router state snapshot contains the state of a route a state of application route at a moment in time.The router state snapshot is a tree of activated routes
  // resolve can return an observable, promise or then
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ProductResolved> {
    const id = route.paramMap.get('id');
    if (isNaN(+id)) {
      const message = `product id was not a number ${id}`;
      console.log(message);
      return of({ product: null, error: message });
    }
    return this.ProductService.getProduct(+id).pipe(
      map(product => ({ product: product })),
      catchError(error => {
        const message = `Retrieval Error: ${error}`;
        console.log(error);
        return of({ product: null, error: message });
      })
    );
  }
}
