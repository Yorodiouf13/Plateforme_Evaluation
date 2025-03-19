import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc, doc, updateDoc, CollectionReference, DocumentData, getDocs } from '@angular/fire/firestore';
import { Clipboard } from '@angular/cdk/clipboard';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})

export class ClassesComponent {

  // constructor(private router: Router) { }
  
  //   onReviews(): void {
  //     this.router.navigate(['professeur/reviews']);
  //   }
  
  //   // Fonction pour la navigation vers la page des Sujets
  //   onSubject(): void {
  //     this.router.navigate(['professeur/sujets']);
  //   }
  
  //   onClasses(): void {
  //     this.router.navigate(['professeur/classes']);
  //   }

  //   classes: { name: string; studentCount: number; students: { lastName: string; firstName: string; email: string; password: string; }[] }[] = [
  //     // Exemple de données
  //     { name: 'Classe A', studentCount: 25, students: [] },
  //     { name: 'Classe B', studentCount: 30, students: [] }
  //   ];
  
  //   selectedClass: any = null;
  //   showAddClassForm = false;
  //   newClass: { name: string; studentCount: number; students: { lastName: string; firstName: string; email: string; password: string; }[] } = { name: '', studentCount: 0, students: [] };
  
  //   toggleAddClassForm() {
  //     this.showAddClassForm = !this.showAddClassForm;
  //     if (this.showAddClassForm) {
  //       this.newClass = { name: '', studentCount: 0, students: [] };
  //       this.addStudent(); // Ajoute le premier étudiant par défaut
  //     }
  //   }
  
  //   addStudent() {
  //     this.newClass.students.push({ lastName: '', firstName: '', email: '', password: 'default' });
  //   }
  
  //   createClass() {
  //     // Enregistre la nouvelle classe, par exemple via un service ou simplement l'ajoute à la liste
  //     this.newClass.studentCount = this.newClass.students.length;
  //     this.classes.push({ ...this.newClass });
  //     this.showAddClassForm = false;
  //   }
  
  //   selectClasse(classe: any) {
  //     this.selectedClass = classe;
  //   }

    classes: any[] = []; // Stocker les classes récupérées depuis Firebase
    selectedClass: any = null;
    isAddingClass: boolean = false; // Formulaire pour ajouter une classe
    newClass: any = { name: '', students: [] }; // Nouvelle classe
    classLink: string = ''; // Lien de la classe généré

  constructor(private router: Router, private firestore: Firestore, private clipboard: Clipboard) {
    this.loadClasses();
  }

  async loadClasses() {
    const querySnapshot = await getDocs(collection(this.firestore, 'classes'));
    this.classes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  showClassForm() {
    this.isAddingClass = true;
    this.classLink = `https://monapplication.com/inscription/${uuidv4()}`; 
  }

  cancelClassForm() {
    this.isAddingClass = false;
    this.newClass = { name: '', students: [] }; // Réinitialisation
  }

  async addClass() {
    if (this.newClass.name) {
      const newClass = { name: this.newClass.name, students: [], link: this.classLink };
      await addDoc(collection(this.firestore, 'classes'), newClass);
      this.loadClasses();
      this.cancelClassForm();
    }
  }

  copyLink() {
    navigator.clipboard.writeText(this.classLink);
    alert('Lien copié dans le presse-papiers');
  }
  // async addClass() {
  //   const className = prompt("Entrez le nom de la nouvelle classe :");
  //   if (className) {
  //     const newClass = { name: className, students: [] };
  //     const docRef = await addDoc(collection(this.firestore, 'classes'), newClass);
  //     this.classes.push({ id: docRef.id, ...newClass });
  //   }
  // }

  async generateInviteLink(classId: string) {
    const inviteLink = `https://mon-site.com/join/${classId}`;
    await updateDoc(doc(this.firestore, 'classes', classId), { inviteLink });
    this.classes.find(c => c.id === classId)!.inviteLink = inviteLink;
  }

  copyInviteLink(link: string) {
    this.clipboard.copy(link);
    alert("Lien copié !");
  }

  viewClassDetails(classId: string) {
    this.router.navigate(['/professeur/classe-details', classId]);
  }

  selectClass(classe: any) {
    this.selectedClass = classe;
  }

  onDashboard(): void {
    this.router.navigate(['dashboard/professeur']);
  }
  onClasses(): void {
    this.router.navigate(['professeur/classes']);
    }

     onReviews(): void {
      this.router.navigate(['professeur/reviews']);
    }
  
    // Fonction pour la navigation vers la page des Sujets
    onSubject(): void {
      this.router.navigate(['professeur/sujets']);
    }

    onHome(): void {
      this.router.navigate(['']);
    }

    onClassDetails(): void {
      this.router.navigate(['professeur/correction']);
    }

}
// Removed the incorrect getDocs function definition

