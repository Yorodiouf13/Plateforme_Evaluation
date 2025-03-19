import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, deleteDoc, getDocs, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CorrectionService {
  private collectionName = 'corrections';

  constructor(private firestore: Firestore) {}

  // Ajouter une correction
  addCorrection(exerciceId: string, texteCorrection: string, fichierUrl: string | null) {
    const correctionRef = collection(this.firestore, `${this.collectionName}/${exerciceId}/correctionList`);
    return addDoc(correctionRef, {
      texteCorrection: texteCorrection,
      fichierUrl: fichierUrl,
      dateAjout: new Date()
    });
  }

  // Récupérer les corrections d’un exercice
  getCorrections(exerciceId: string): Observable<any[]> {
    const correctionRef = collection(this.firestore, `${this.collectionName}/${exerciceId}/correctionList`);
    return collectionData(correctionRef, { idField: 'id' });
  }

  // Supprimer une correction
  deleteCorrection(exerciceId: string, correctionId: string) {
    const correctionDocRef = doc(this.firestore, `${this.collectionName}/${exerciceId}/correctionList/${correctionId}`);
    return deleteDoc(correctionDocRef);
  }
}
