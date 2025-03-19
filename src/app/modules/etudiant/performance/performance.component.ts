import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { SubmissionService } from '../../../services/submission.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './performance.component.html',
  styleUrl: './performance.component.css'
})
export class PerformanceComponent {
  chart: any;
  userId: string = '';
  grades: number[] = [];
  user: any = null;

  constructor(private router: Router, private submissionService: SubmissionService, private authService: AuthService) { }
  
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

    nngOnInit(): void {
      this.authService.getUser().then(user => {
        this.user = user;
      });
    }

    ngOnInit() {
      this.userId = this.authService.getCurrentUserId() || '';
      this.submissionService.getSubmissionsByStudent(this.userId).then((querySnapshot) => {
        querySnapshot.docs.forEach(doc => {
          this.grades.push(doc.data()['grade']);
        });
      
    // ngAfterViewInit() {
    //   this.chart = new Chart("performanceChart", {
    //     type: 'line',
    //     data: {
    //       labels: ["SQL Avancé", "Normalisation", "Indexation"],
    //       datasets: [{
    //         label: "Évolution des notes",
    //         data: [16, 14, 18],
    //         borderColor: "blue",
    //         fill: false
    //       }]
    //     }
    //   });
    // }

      // Créer le graphique avec les notes récupérées
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: Array(this.grades.length).fill(''),  // Étiquettes pour chaque soumission
          datasets: [{
            label: 'Note',
            data: this.grades,
            borderColor: '#42A5F5',
            fill: false,
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }
}
