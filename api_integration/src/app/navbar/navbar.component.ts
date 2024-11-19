import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink , CommonModule , FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
 myProducts: any[] = [];
  searchQuery: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  // Search products based on query
  searchProducts() {
    if (!this.searchQuery.trim()) {
      alert('Please enter a search query.');
      return;
    }

    const url = `https://localhost:7099/api/Products/Search/${encodeURIComponent(this.searchQuery)}`;
    this.http.get(url).subscribe({
      next: (result: any) => {
        this.myProducts = this.setDefaultValues(result);

        if (this.myProducts.length > 0) {
          this.router.navigate(['/Products']);
        } else {
          alert('No products found.');
        }

        console.log('Search results:', result);
      },
      error: (err) => {
        console.error('Error fetching search results:', err);
        this.myProducts = []; // Clear product list if search fails
        alert('No products found for your search.');
      },
    });
  }

  // Set default values for products
  setDefaultValues(products: any[]): any[] {
    return products.map((product) => ({
      name: product.name || 'Not available',
      description: product.description || 'Not available',
      price: product.price ?? 'Not available',
      brand: product.brand?.name || 'Not available',
    }));
  }
}