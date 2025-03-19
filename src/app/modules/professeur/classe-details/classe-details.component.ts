import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CorrectionService } from '../../../services/correction.service';
import {FileUploadService} from '../../../services/file-upload.service';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc, collectionData, CollectionReference, DocumentData, getDocs } from '@angular/fire/firestore';
import { doc, deleteDoc } from '@angular/fire/firestore';



@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-classe-details',
  templateUrl: './classe-details.component.html',
  styleUrls: ['./classe-details.component.css']
})
export class ClasseDetailsComponent {

  corrections: any[] = [];
  correctionForm: FormGroup;
  selectedFile: File | null = null;
  exerciceId = '123'; 

  constructor(
    private correctionService: CorrectionService,
    private fileUploadService: FileUploadService,
    private fb: FormBuilder,
    private router: Router,
    private firestore: Firestore
  ) {
    this.correctionForm = this.fb.group({
      texteCorrection: ['', Validators.required],
      fichier: ['']
    });
  }

  ngOnInit(): void {
    this.loadCorrections();
  }

  async loadCorrections(): Promise<void> {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, 'corrections'));
      this.corrections = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erreur lors du chargement des corrections: ', error);
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Stocker l'URL du fichier ou gérer l'upload si nécessaire
      this.correctionForm.patchValue({
        fichier: file.name  // Par exemple, juste le nom ici, mais tu pourrais gérer l'upload du fichier
      });
    }
  }

  async submitCorrection(): Promise<void> {
    if (this.correctionForm.valid) {
      const formData = this.correctionForm.value;
      
      // Ajouter une nouvelle correction dans Firestore
      const correctionData = {
        texteCorrection: formData.texteCorrection,
        fichierUrl: formData.fichier ? formData.fichier : null
      };

      try {
        await addDoc(collection(this.firestore, 'corrections'), correctionData);
        // Rafraîchir la liste des corrections après l'ajout
        this.loadCorrections();
        this.correctionForm.reset();
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la correction: ', error);
      }
    }
  }

  async deleteCorrection(id: string): Promise<void> {
    try {
      await deleteDoc(doc(this.firestore, 'corrections', id));
      // Rafraîchir la liste après la suppression
      this.loadCorrections();
    } catch (error) {
      console.error('Erreur lors de la suppression de la correction: ', error);
    }
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



