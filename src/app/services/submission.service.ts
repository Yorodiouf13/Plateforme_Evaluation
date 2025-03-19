import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDocs, query, where } from '@angular/fire/firestore';
import { CollectionReference, addDoc } from 'firebase/firestore';
import { Storage } from '@angular/fire/storage';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private submissionsCollection: CollectionReference;

  constructor(private firestore: Firestore, private storage: Storage) {
    this.submissionsCollection = collection(this.firestore, 'submissions');
  }

  // Récupère toutes les soumissions d'un étudiant par son ID
  getSubmissionsByStudent(studentId: string) {
    const q = query(this.submissionsCollection, where('student_id', '==', studentId));
    return getDocs(q);
  }

   // Upload du fichier et récupération de l'URL
   async uploadSubmissionFile(file: File, studentId: string, examId: string): Promise<string> {
    try {
      const filePath = `submissions/${studentId}/${examId}_${Date.now()}_${file.name}`;
      const fileRef = ref(this.storage, filePath);
      await uploadBytes(fileRef, file);
      return await getDownloadURL(fileRef);
    } catch (error) {
      console.error('Erreur lors du téléversement du fichier:', error);
      throw error;
    }
  }

  // Enregistrement de la soumission dans Firestore
  async submitResponse(studentId: string, examId: string, fileUrl: string): Promise<void> {
    const submissionsRef = collection(this.firestore, 'submissions');
    await addDoc(submissionsRef, {
      student_id: studentId,
      exam_id: examId,
      file_url: fileUrl,
      submitted_at: new Date()
    });
  }

  // Récupérer les soumissions d'un examen pour un professeur
  async getSubmissionsByExam(examId: string): Promise<any[]> {
    try {
      const submissionsRef = collection(this.firestore, 'submissions');
      const q = query(submissionsRef, where("exam_id", "==", examId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Erreur lors de la récupération des soumissions:', error);
      throw error;
    }
  }

}
