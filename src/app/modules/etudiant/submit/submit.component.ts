import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PdfService } from '../../../services/pdf.service';

@Component({
  selector: 'app-submit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './submit.component.html',
  styleUrl: './submit.component.css'
})
export class SubmitComponent {

  file: File | null = null;
  errorMessage = '';

  onFileDropped(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length) {
      this.handleFile(event.target.files[0]);
    }
  }

  handleFile(file: File) {
    if (file.type !== 'application/pdf') {
      this.errorMessage = '❌ Seuls les fichiers PDF sont autorisés !';
      this.file = null;
    } else {
      this.errorMessage = '';
      this.file = file;
    }
  }

  // Submit() {
  //   if (this.file) {
  //     console.log('Fichier soumis :', this.file.name);
  //     alert('📤 Fichier soumis avec succès !');
  //     this.file = null;
  //   }
  // }

  constructor(private router: Router, private pdfService: PdfService) { }
  
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
  
    onFileSubmit() {
      if (this.file) {
        this.pdfService.uploadPdf(this.file).then((downloadURL) => {
          console.log('Fichier téléchargé à :', downloadURL);
          // Ici, tu peux enregistrer l'URL du fichier dans Firestore si nécessaire
        }).catch((error) => {
          console.error('Erreur de téléchargement :', error);
        });
      }
    }

}
