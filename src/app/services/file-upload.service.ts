import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private storage: Storage) {}

  // Téléverse un fichier et renvoie son URL
  async uploadFile(file: File, path: string): Promise<string> {
    try {
      const fileRef = ref(this.storage, path);
      await uploadBytes(fileRef, file);
      return await getDownloadURL(fileRef);
    } catch (error) {
      console.error('Erreur lors du téléversement du fichier:', error);
      throw error;
    }
  }
}
