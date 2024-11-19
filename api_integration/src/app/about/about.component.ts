import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  Title:string= "Search and Discover Products"
  AboutDescription:string="Quickly find your desired products by searching for their name or brand. Whether you're looking for the latest gadgets, trendy fashion, or daily essentials, our search bar helps you discover what you need. If a product isn't available, we'll let you know immediately"
  btnClass:string="btn btn-warning";
  Aboutimage="./asset/image/search.jpg";

  private isFirstContent: boolean = true;

  
  ShowDetails(){
    if(this.isFirstContent){
      this.Title= "Stay Connected with the Latest Smartphones"
      this.AboutDescription="Modern smartphones offer seamless connectivity, high-speed processors, and stunning cameras, all in a sleek design. From powerful 5G support to long-lasting batteries and immersive displays, these devices are built to meet both personal and professional needs."
      this.btnClass="btn btn-warning";
      this.Aboutimage="./asset/image/about.jpg";
    }else{
       this.Title= "Search and Discover Products"
       this.AboutDescription="Quickly find your desired products by searching for their name or brand. Whether you're looking for the latest gadgets, trendy fashion, or daily essentials, our search bar helps you discover what you need. If a product isn't available, we'll let you know immediately"
       this.btnClass="btn btn-danger";
       this.Aboutimage="./asset/image/search.jpg";
    }
    this.isFirstContent= !this.isFirstContent;

  }

}

