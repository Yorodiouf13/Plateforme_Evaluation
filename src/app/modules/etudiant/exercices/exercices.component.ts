import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercices.component.html',
  styleUrl: './exercices.component.css'
})
export class ExercicesComponent {

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

  exercices = [
    { id: 1, titre: "Sujet 1 : SQL Avancé", date: "2025-03-17", corrige: true },
    { id: 2, titre: "Sujet 2 : Normalisation", date: "2025-03-15", corrige: false },
    { id: 3, titre: "Sujet 3 : Indexation", date: "2025-03-10", corrige: true }
  ];

  selectedExercice: any = null;

  afficherDetails(exercice: any) {
    this.selectedExercice = exercice;
  }

}
