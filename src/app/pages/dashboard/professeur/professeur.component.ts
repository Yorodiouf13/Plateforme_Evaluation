import { Component, AfterViewInit} from '@angular/core';
import Chart from 'chart.js/auto';
import { Router } from '@angular/router';
import { SubmissionService } from '../../../services/submission.service';
import { ExamService } from '../../../services/exam.service';
import { OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import { doc, updateDoc } from 'firebase/firestore';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-professeur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './professeur.component.html',
  styleUrl: './professeur.component.css'
})

// ajouer AfterViewInit à implements
export class ProfesseurComponent implements OnInit {
  exams: any[] = [];
  submissions: any[] = [];
  selectedExamId: string = '';
  user: any;

  // ngAfterViewInit(): void {
    
  //   // Graphique des soumissions
  //   new Chart('submissionChart', {
  //     type: 'bar',
  //     data: {
  //       labels: ['Ex1', 'Ex2', 'Ex3', 'Ex4'],
  //       datasets: [{
  //         label: 'Soumissions',
  //         data: [50, 60, 55, 70],
  //         backgroundColor: '#64b5f6'
  //       }]
  //     }
  //   });

  //   // Graphique des questions mal comprises
  //   new Chart('incorrectQuestionsChart', {
  //     type: 'pie',
  //     data: {
  //       labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  //       datasets: [{
  //         label: 'Questions mal comprises',
  //         data: [4, 2, 6, 8],
  //         backgroundColor: ['#f44336', '#ff9800', '#ffc107', '#8bc34a']
  //       }]
  //     }
  //   });

  //   // Graphique des tendances d'apprentissage
  //   new Chart('trendChart', {
  //     type: 'line',
  //     data: {
  //       labels: ['Jan', 'Feb', 'Mar', 'Apr'],
  //       datasets: [{
  //         label: 'Progression des étudiants',
  //         data: [60, 70, 80, 90],
  //         borderColor: '#4caf50',
  //         fill: false
  //       }]
  //     }
  //   });
  // }

  constructor(private router: Router, private submissionService: SubmissionService,
    private examService: ExamService, private firestore: Firestore, private authService: AuthService) { }

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

  ngOnInit() {
    this.loadExams();
  }

  loadExams() {
    this.examService.getExamsForProfessor().then((querySnapshot) => {
      this.exams = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
  }

  async loadSubmissions() {
    if (this.selectedExamId) {
      this.submissions = await this.submissionService.getSubmissionsByExam(this.selectedExamId);
    }
  }


  saveGrade(submission: any) {
    // Logique pour enregistrer la note dans Firestore
    // Par exemple, mettre à jour le champ 'grade' dans la collection des soumissions
    const submissionRef = doc(this.firestore, 'submissions', submission.id);
    updateDoc(submissionRef, { grade: submission.grade })
      .then(() => {
        alert('Note enregistrée avec succès');
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de la note:', error);
        alert('Une erreur est survenue.');
      });
  }
  
  nngOnInit(): void {
    this.authService.getUser().then(user => {
      this.user = user;
    });
  }
}
