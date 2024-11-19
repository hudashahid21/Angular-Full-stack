import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink , CommonModule , FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  myProducts: any[] = [];
  searchQuery: string = '';

  constructor(private http: HttpClient) {
    this.getAllProducts();
  }

  // Fetch all products from the backend
  getAllProducts() {
    this.http.get("https://localhost:7099/api/Products/AllProducts").subscribe({
      next: (result: any) => {
        this.myProducts = result;
        console.log('Fetched products:', result);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        alert('Unable to load products. Please try again later.');
      }
    });
  }

  // Search products based on query
  searchProducts() {
    const url = `https://localhost:7099/api/Products/Search/${this.searchQuery}`;
    this.http.get(url).subscribe({
      next: (result: any) => {
        this.myProducts = this.setDefaultValues(result);
        console.log('Search results:', result);
      },
      error: (err) => {
        console.error('Error fetching search results:', err);
        this.myProducts = []; // Clear product list if search fails
        alert('No products found for your search.');
      }
    });
  }

  // Function to set default values for missing product properties
  setDefaultValues(products: any[]): any[] {
    return products.map(product => ({
      name: product.name || 'Not available',
      description: product.description || 'Not available',
      price: product.price ?? 'Not available',
      brands: {
        name: product.brands?.name || 'Not available'
      }
    }));
  }

  // Delete product by ID
  DeleteProduct(item: any) {
    console.log(item);
    this.http.delete("https://localhost:7099/api/Products/Delete/"+item.id).subscribe((result: any) => {
        alert("Successfully deleted");
        this.getAllProducts(); // Reload products after deletion
        console.log(result);
    });
  }
}