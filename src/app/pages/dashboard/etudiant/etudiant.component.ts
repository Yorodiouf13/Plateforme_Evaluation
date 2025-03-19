import { Component, AfterViewInit, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-etudiant',
  standalone: true,
  imports: [],
  templateUrl: './etudiant.component.html',
  styleUrl: './etudiant.component.css'
})
export class EtudiantComponent {

  // user: any = null;

    constructor(private router: Router, private authService: AuthService ) { }

  ngAfterViewInit() {
      new Chart('performanceChart', {
        type: 'line',
        data: {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai'],
          datasets: [{ label: 'Ma Note', data: [12, 14, 15, 16, 17], borderColor: 'blue' }]
        }
      });
  
      new Chart('comparisonChart', {
        type: 'bar',
        data: {
          labels: ['Ex1', 'Ex2', 'Ex3'],
          datasets: [
            { label: 'Ma note', data: [15, 16, 14], backgroundColor: 'blue' },
            { label: 'Moyenne classe', data: [13, 15, 13], backgroundColor: 'green' }
          ]
        }
      });
    }

    onDashboard(): void {
      this.router.navigate(['dashboard/etudiant']);
    }

    onExercices(): void {
      this.router.navigate(['etudiant/exercices']);
    }

    onCorrection(): void{
      this.router.navigate(['etudiant/correction']);
    }

    onSubmit(): void{
      this.router.navigate(['etudiant/submit']);
    }

    onPerformance(): void{
      this.router.navigate(['etudiant/performance']);
    }

    onHome(): void{
      this.router.navigate(['']);
    }

    // ngOnInit(): void {
    //   this.authService.getUser().then(user => {
    //     this.user = user;
    //   });
    // }
}
