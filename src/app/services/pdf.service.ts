import { Injectable } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor(private storage: Storage) {}

  uploadPdf(file: File) {
    const filePath = `submissions/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress (facultatif, pour afficher la barre de progression)
        },
        (error) => reject(error),
        () => {
          // Une fois téléchargé, obtenir l'URL du fichier
          finalize(() => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          });
        }
      );
    });
  }
}
