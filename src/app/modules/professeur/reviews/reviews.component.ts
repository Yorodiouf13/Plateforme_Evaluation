import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {

  nomModele: string = '';
  criteres: string = '';
  modeles: { nom: string; criteres: string }[] = [];

  ajouterModele() {
    if (!this.nomModele || !this.criteres) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    this.modeles.push({ nom: this.nomModele, criteres: this.criteres });

    alert('Modèle ajouté !');
    this.nomModele = '';
    this.criteres = '';
  }

   constructor(private router: Router) { }
    
      onDashboard(): void {
        this.router.navigate(['dashboard/professeur']);
      }
    
      onReviews(): void {
        this.router.navigate(['professeur/reviews']);
      }
    
      // Fonction pour la navigation vers la page des Sujets
      onSubject(): void {
        this.router.navigate(['professeur/sujets']);
      }
    
      onClasses(): void {
        this.router.navigate(['professeur/classes']);
      }

      onHome(): void {
        this.router.navigate(['']);
      }

      onClassDetails(): void {
        this.router.navigate(['professeur/correction']);
      }
  
}
