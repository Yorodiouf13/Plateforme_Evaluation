import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.signInWithEmail(this.email, this.password)
      .then(() => {
        console.log('Utilisateur connecté');
        // Redirection ou autre action après la connexion dependant du role
        this.authService.getUser().then(user => {
          if (user.role === 'professeur') {
            this.router.navigate(['/dashboard/professeur']);
          } else {
            this.router.navigate(['/dashboard/etudiant']);
          }
        });
      })
      .catch(error => {
        console.error('Erreur de connexion', error);
      });
  }
  

  onGoogleLogin() {
    this.authService.signInWithGoogle()
      .then(() => {
        console.log('Utilisateur connecté avec Google');
        // Redirection ou autre action après la connexion
      })
      .catch(error => {
        console.error('Erreur de connexion Google', error);
        // Affichage d'un message d'erreur
      });
  }

  loginWithGitHub() {
    this.authService.loginWithGitHub().then(() => {
      console.log('Utilisateur connecté avec Github');
      // Redirection ou autre action après la connexion
    })
    .catch(error => {
      console.error('Erreur de connexion Github', error);
      // Affichage d'un message d'erreur
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

} 