import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: 'professeur' | 'etudiant' = 'etudiant'; 
  selectedRole: string = '';

  constructor(private authService: AuthService, private router: Router, private auth: Auth, private firestore: Firestore ) {}

  onRegister() {
    if (this.password === this.confirmPassword) {
      this.authService.register(this.email, this.password, this.role)
        .then(() => this.router.navigate(['/login']))
        .catch(error => console.error('Erreur d\'inscription:', error));
    } else {
      alert('Les mots de passe ne correspondent pas!');
    }
  }
  

  onGoogleSignUp() {
    if (!this.selectedRole) {
      alert("Veuillez choisir un rôle avant de continuer !");
      return;
    }
  
    this.authService.signUpWithGoogle(this.selectedRole).catch(error => {
      console.error('Erreur lors de l\'inscription Google:', error);
    });
  }
  
  onLogin() {
    this.router.navigate(['/login']);
  }

}