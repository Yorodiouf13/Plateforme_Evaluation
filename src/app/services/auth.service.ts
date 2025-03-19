import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Firestore, collection, setDoc, doc, CollectionReference, DocumentData } from '@angular/fire/firestore';
import { getDoc, addDoc } from '@angular/fire/firestore';
import { GithubAuthProvider } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  selectedRole: string = '';

  constructor(private router: Router, private auth: Auth, private firestore: Firestore) {}


  register(email: string, password: string, role: 'professeur' | 'etudiant') {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log('Utilisateur inscrit avec succès:', user);
  
        // Enregistrer le rôle dans Firestore
        const userDocRef = doc(this.firestore, `users/${user.uid}`);
        await setDoc(userDocRef, {
          email: email,
          role: role,
        });
  
        console.log('Rôle enregistré dans Firestore');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Erreur d\'inscription:', error.code, error.message);
      });
  }

  googleLogin() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
      .then(async (result) => {
        // Vérifie que 'result' a bien une propriété 'user' avant de l'utiliser
        const user = result.user;
        if (user) {
          console.log('Utilisateur connecté avec Google:', user);
          
          // 🔹 Récupérer le rôle depuis Firestore
          const userRef = doc(this.firestore, `users/${user.uid}`);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            const role = userSnap.data()?.['role'];
            console.log('Rôle récupéré:', role);
            this.redirectUser(role); // Redirige l'utilisateur selon son rôle
          } else {
            console.warn("Utilisateur non enregistré dans Firestore !");
            this.router.navigate(['/']); // Redirige vers l'accueil par défaut
          }
        } else {
          console.error('Aucun utilisateur trouvé dans le résultat de la connexion');
        }
  
        return result; // Retourne le résultat final
      })
      .catch((error) => {
        console.error('Erreur de connexion Google:', error.code, error.message);
      });
  }
  

  // Connexion par Email et Mot de Passe
  signInWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log('Utilisateur connecté:', user);
  
        // Récupérer le rôle depuis Firestore
        const userDocRef = doc(this.firestore, `users/${user.uid}`);
        const userDoc = await getDoc(userDocRef);

        // const token = await user.getIdToken();

        // // Envoyer le token au backend Django
        // this.verifyFirebaseTokenWithBackend(token);
  
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const role = userData['role'];
          console.log('Rôle récupéré:', role);

          if (role === 'professeur') {
            this.router.navigate(['/dashboard/professeur']);
          } else {
            this.router.navigate(['/dashboard/etudiant']);
          }
        } else {
          console.warn('Aucun rôle trouvé pour cet utilisateur');
        }
      })
      .catch(error => {
        console.error('Erreur de connexion:', error);
      });
  }
  
  

  signUpWithEmail(email: string, password: string, role: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log('Utilisateur inscrit:', user);
  
        // 🔹 Enregistrer l'utilisateur dans Firestore avec son rôle
        const userRef = doc(this.firestore, `users/${user.uid}`);
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          role: role,  // Stocke le rôle choisi (professeur/étudiant)
        });
  
        console.log('Utilisateur ajouté à Firestore avec rôle:', role);
        this.redirectUser(role); // Redirige vers le bon dashboard
      })
      .catch((error) => {
        console.error('Erreur d\'inscription', error);
        throw error;
      });
  }
  


  // Déconnexion
  signOutUser() {
    return signOut(this.auth)
      .then(() => {
        console.log('Utilisateur déconnecté');
        this.router.navigate(['/']); // Rediriger l'utilisateur après la déconnexion
      })
      .catch(error => {
        console.error('Erreur de déconnexion', error);
        throw error;
      });
  }

  // Vérification de l'état de connexion de l'utilisateur
  isAuthenticated() {
    return new Promise<boolean>((resolve) => {
      this.auth.onAuthStateChanged(user => {
        resolve(user ? true : false);
      });
    });
  }

  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(this.auth, provider);
      const user = userCredential.user;
  
      const userRef = doc(this.firestore, `users/${user.uid}`);
      const userSnap = await getDoc(userRef);

  
      if (userSnap.exists()) {
        const role = userSnap.data()?.['role'];
        console.log('Utilisateur connecté avec rôle:', role);
        this.redirectUser(role);  // Redirige l'utilisateur immédiatement
      } else {
        console.error("L'utilisateur n'existe pas dans Firestore !");
      }
  
    } catch (error) {
      console.error("Erreur lors de la connexion avec Google", error);
    }
  }

   signUpWithGoogle(selectedRole: string) {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
      .then(async (result) => {
        const user = result.user;
        console.log('Utilisateur connecté avec Google:', user);
  
        // Récupérer le rôle depuis Firestore
        const userRef = doc(this.firestore, `users/${user.uid}`);
        const userSnap = await getDoc(userRef);
  
        if (!userSnap.exists()) {
          // Si l'utilisateur n'existe pas, on le crée avec le rôle sélectionné
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            role: selectedRole,  // Le rôle assigné est celui choisi par l'utilisateur
            createdAt: new Date()
          });
        }
  
        console.log('Utilisateur inscrit avec Google:', user);
  
        // Redirection en fonction du rôle
        this.redirectUser(selectedRole);
      })
      .catch((error) => {
        console.error('Erreur de connexion Google:', error.code, error.message);
      });
  }

  // Méthode pour rediriger l'utilisateur selon son rôle
  redirectUser(role: string) {
    if (role === 'professeur') {
      this.router.navigate(['/dashboard/professeur']);
    } else if (role === 'etudiant') {
      this.router.navigate(['/dashboard/etudiant']);
    } else {
      this.router.navigate(['/']);
    }
  }
   
  async getUserRole(uid: string): Promise<string | null> {
    try {
      const userRef = doc(this.firestore, `users/${uid}`);
      const userSnap = await getDoc(userRef);
  
      if (userSnap.exists()) {
        return userSnap.data()?.['role'] || null;
      }
      return null;
    } catch (error) {
      console.error("Erreur lors de la récupération du rôle", error);
      return null;
    }
  }

  // Méthode pour récupérer l'ID de l'utilisateur actuellement connecté
  getCurrentUserId() {
    const user = this.auth.currentUser;
    return user ? user.uid : null;
  }


  // Connexion via GitHub
  // loginWithGitHub(): Promise<any> {
  //   return signInWithPopup(this.auth, new GithubAuthProvider());
  // }

  async loginWithGitHub() {
    try {
      const provider = new GithubAuthProvider();
      const userCredential = await signInWithPopup(this.auth, provider);
      const user = userCredential.user;
  
      const userRef = doc(this.firestore, `users/${user.uid}`);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const role = userSnap.data()?.['role'];
        console.log('Utilisateur connecté avec rôle:', role);
        this.redirectUser(role);  // Redirige l'utilisateur immédiatement
      } else {
        console.error("L'utilisateur n'existe pas Veuillez vous inscrire!");
      }
  
    } catch (error) {
      console.error("Erreur lors de la connexion avec Github", error);
    }
  }

  // Méthode pour récupérer le user
  getUser() {
    return new Promise<any>((resolve) => {
      this.auth.onAuthStateChanged(user => {
        resolve(user);
      });
    });
  }
}



