import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Clipboard } from '@angular/cdk/clipboard';


@Component({
  selector: 'app-classe-details',
  templateUrl: './classe-details.component.html',
  styleUrls: ['./classe-details.component.css']
})
export class ClasseDetailsComponent {
  className: string = '';
  inviteLink: string = '';
  students: any[] = [];

  constructor(private route: ActivatedRoute, private firestore: Firestore, private clipboard: Clipboard, private router: Router) {
    const classId = this.route.snapshot.paramMap.get('id');
    if (classId) this.loadClassDetails(classId);
  }

  async loadClassDetails(classId: string) {
    const docRef = doc(this.firestore, 'classes', classId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const classData = docSnap.data();
      this.className = classData['name'];
      this.inviteLink = classData['inviteLink'];
      this.students = classData['students'];
    }
  }

  copyInviteLink() {
    this.clipboard.copy(this.inviteLink);
    alert("Lien copié !");
  }
      
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
