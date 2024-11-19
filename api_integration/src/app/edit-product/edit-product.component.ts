import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  id:any=0;
  product:any={
   id:0,
    name: "",
    description: "",
    price: 0,
    brandId: 0,
  }

  myBrands:any[]=[];

constructor(private http:HttpClient,private route:ActivatedRoute){//dependency injection
this.getBrands();
this.getproductDetails();
}

getBrands(){
this.http.get("https://localhost:7099/api/Brand/AllBrands").subscribe((result:any)=>{
this.myBrands=result;
console.log(result);
})
}
  getproductDetails(){
    this.id=this.route.snapshot.paramMap.get("id");
    this.http.get("https://localhost:7099/api/Products/GetUpdatedata /"+this.id).subscribe((result:any)=>{
    this.product.id=this.id;
    this.product.name=result.name;
    this.product.description=result.description;
    this.product.price=result.price;
    this.product.brandId=result.brandId;               
    console.log(result);
    })
    }
    editProduct(product:any){
      this.http.put("https://localhost:7099/api/Products/Update/",product).subscribe((result:any)=>{
      if(result !=null){
        alert("Product edit successfully.");
        location.href ="/Products";
      }
      })
    }
}


