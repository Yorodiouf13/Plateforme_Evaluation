import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, query, where } from '@angular/fire/firestore';
import { CollectionReference } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private examsCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.examsCollection = collection(this.firestore, 'exams');
  }

  // Ajouter un examen
  async addExam(exam: any) {
    try {
      const docRef = await addDoc(this.examsCollection, exam);
      console.log("Examen ajouté avec l'ID: ", docRef.id);
    } catch (e) {
      console.error("Erreur lors de l'ajout de l'examen: ", e);
    }
  }

  // Récupérer tous les examens d'un professeur
  getExamsByProfessor(professorId: string) {
    const q = query(this.examsCollection, where('professor_id', '==', professorId));
    return getDocs(q);
  }

  // fonction getExamsForProfessor
  getExamsForProfessor() {
    return getDocs(this.examsCollection);
  }
}
