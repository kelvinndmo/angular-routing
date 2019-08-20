import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';
import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductResolver } from './product-resover.service';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditGuard } from './product-edit/product-edit.guard';

const routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: ':id',
    component: ProductDetailComponent,
    resolve: { resolvedData: ProductResolver }
  },
  {
    path: ':id/edit',
    component: ProductEditComponent,
    canDeactivate: [ProductEditGuard],
    resolve: {
      resolvedData: ProductResolver
    },
    children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full'
      },
      {
        path: 'info',
        component: ProductEditInfoComponent
      },
      {
        path: 'tags',
        component: ProductEditTagsComponent
      }
    ]
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditTagsComponent,
    ProductEditInfoComponent
  ]
})
export class ProductModule {}
