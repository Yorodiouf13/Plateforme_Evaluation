import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ExamService } from '../../../services/exam.service';
import { AuthService } from '../../../services/auth.service';
import { getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import { FileUploadService } from '../../../services/file-upload.service';
import { Storage } from '@angular/fire/storage';

@Component({
  selector: 'app-sujets',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sujets.component.html',
  styleUrl: './sujets.component.css'
})
export class SujetsComponent implements OnInit {

  titre: string = '';
  description: string = '';
  fichier: File | null = null;
  exams: any[] = [];
  userId: string = '';

  onFileSelect(event: any) {
    this.fichier = event.target.files[0];
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      this.fichier = event.dataTransfer.files[0];
    }
  }

  submitSujet() {
    if (!this.titre || !this.fichier) {
      alert('Veuillez remplir tous les champs et ajouter un fichier.');
      return;
    }

    console.log("Sujet déposé :", {
      titre: this.titre,
      description: this.description,
      fichier: this.fichier.name
    });

    alert('Sujet ajouté avec succès !');
    this.titre = '';
    this.description = '';
    this.fichier = null;
  }

  constructor(private router: Router,  private examService: ExamService,
    private authService: AuthService, private storage: Storage, private fileUploadService: FileUploadService) { }
  
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
      // Récupérer l'ID du professeur connecté
      this.userId = this.authService.getCurrentUserId()!;
      // Charger les examens du professeur
      this.loadExams();
    }
  
    loadExams() {
      this.examService.getExamsByProfessor(this.userId).then((querySnapshot) => {
        this.exams = querySnapshot.docs.map(doc => doc.data());
      });
    }
  
    addExam() {
      if (!this.titre || !this.description) {
        alert('Veuillez remplir tous les champs !');
        return;
      }
      const newExam = {
        title: this.titre,
        description: this.description,
        professor_id: this.userId,
        questions: [],
        created_at: new Date()
      };
      this.examService.addExam(newExam).then(() => {
        this.loadExams();  // Recharger la liste des examens après ajout
        this.titre = '';
        this.description = '';
      });
    }

    uploadFile(event: any) {
      const file = event.target.files[0];
      const storageRef = ref(this.storage, `uploads/${file.name}`);
  
      uploadBytes(storageRef, file).then(snapshot => {
        getDownloadURL(snapshot.ref).then(url => {
          console.log('File available at', url);
        });
      });
    }

  // Gestion de la sélection du fichier
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.fichier = event.target.files[0];
    }
  }

  async readdExam() {
    if (!this.titre || !this.description) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    let fileUrl = "";
    if (this.fichier) {
      try {
        const filePath = `exams/${this.userId}/${Date.now()}_${this.fichier.name}`;
        fileUrl = await this.fileUploadService.uploadFile(this.fichier, filePath);
      } catch (error) {
        console.error("Erreur lors du téléversement du fichier:", error);
        alert("Erreur lors du téléversement du fichier.");
        return;
      }
    }

    const newExam = {
      title: this.titre,
      description: this.description,
      professor_id: this.userId,
      questions: fileUrl ? [{ file_url: fileUrl, type: "pdf" }] : [],
      created_at: new Date()
    };

    this.examService.addExam(newExam).then(() => {
      this.loadExams();
      this.titre = '';
      this.description = '';
      this.fichier = null;
    });
  }



}
