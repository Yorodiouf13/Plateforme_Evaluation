import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';
import { provideStorage, getStorage } from '@angular/fire/storage';




export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(),
    provideFirebaseApp(
      () => initializeApp(
    {
      apiKey: "AIzaSyB1OH1pTFbUhqRoyefgNgcyYnj2_pW7e8Y",
      authDomain: "piee-317f8.firebaseapp.com",
      projectId: "piee-317f8",
      storageBucket: "piee-317f8.firebasestorage.app",
      messagingSenderId: "432163968860",
      appId: "1:432163968860:web:597f0dc5b78a41f5251399",
      measurementId: "G-6SLL349L2R"
    }
    )
  ), provideAuth(() => getAuth()),  provideFirestore(() => getFirestore()), provideStorage(() => getStorage())]
  
};
