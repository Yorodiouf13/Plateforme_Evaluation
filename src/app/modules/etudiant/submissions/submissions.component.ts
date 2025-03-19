import { Component } from '@angular/core';
import { SubmissionService } from '../../../services/submission.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-submissions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './submissions.component.html',
  styleUrl: './submissions.component.css'
})
export class SubmissionsComponent {

  submissions: any[] = [];
  userId: string = '';

  constructor(
    private submissionService: SubmissionService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Récupérer l'ID de l'utilisateur connecté
    this.userId = this.authService.getCurrentUserId()!;

    // Charger les soumissions de l'étudiant
    this.submissionService.getSubmissionsByStudent(this.userId).then((querySnapshot) => {
      this.submissions = querySnapshot.docs.map(doc => doc.data());
    });
  }

    
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
