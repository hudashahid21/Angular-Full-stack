import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { Component } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    {
        path:"Products",
        component:ProductComponent
    },
    {
        path:"addproduct",
        component:AddProductComponent
    },
    {
        path:"editproduct/:id",
        component:EditProductComponent
    },
    {
        path:"home",
        component:HomeComponent
    },
    {
        path:"about",
        component:AboutComponent
    },
    {
        path:"contact",
        component:ContactComponent
    },
];

