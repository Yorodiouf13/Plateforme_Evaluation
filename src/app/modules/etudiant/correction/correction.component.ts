import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-correction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './correction.component.html',
  styleUrl: './correction.component.css'
})
export class CorrectionComponent {
  corrections = [
    { id: 1, sujet: "SQL Avancé", note: 16, commentaires: "Bon travail, quelques erreurs mineures." },
    { id: 2, sujet: "Normalisation", note: 14, commentaires: "Attention aux redondances inutiles." }
  ];
  constructor(private router: Router) { }
    
      onExercices(): void {
        this.router.navigate(['etudiant/exercices']);
      }
    
      onCorrection(): void {
        this.router.navigate(['etudiant/correction']);
      }
    
      onSubmit(): void{
        this.router.navigate(['etudiant/submit']);
      }
    
      onPerformance(): void{
        this.router.navigate(['etudiant/performance']);
      }

      onHome(): void {
        this.router.navigate(['']);
      }
  
}
