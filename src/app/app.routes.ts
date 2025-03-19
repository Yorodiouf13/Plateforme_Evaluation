import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ProfesseurComponent } from './pages/dashboard/professeur/professeur.component';
import { EtudiantComponent } from './pages/dashboard/etudiant/etudiant.component';
import { HomeComponent } from './default/home/home.component';
import { NotFoundComponent } from './default/not-found/not-found.component';
import { provideRouter } from '@angular/router';
import { SujetsComponent } from './modules/professeur/sujets/sujets.component';
import { ReviewsComponent } from './modules/professeur/reviews/reviews.component';
import { ExercicesComponent } from './modules/etudiant/exercices/exercices.component';
import { PerformanceComponent } from './modules/etudiant/performance/performance.component';
import { SubmitComponent } from './modules/etudiant/submit/submit.component';
import { ClassesComponent } from './modules/professeur/classes/classes.component';
import { CorrectionComponent } from './modules/etudiant/correction/correction.component';
import { ClasseDetailsComponent } from './modules/professeur/classe-details/classe-details.component';
import { SubmissionsComponent } from './modules/etudiant/submissions/submissions.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '',  redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard/professeur', component: ProfesseurComponent, canActivate: [AuthGuard]},
    { path: 'dashboard/etudiant', component: EtudiantComponent, canActivate: [AuthGuard]},
    { path: 'professeur/sujets', component: SujetsComponent, canActivate: [AuthGuard]},
    { path: 'professeur/reviews', component: ReviewsComponent, canActivate: [AuthGuard]},
    { path: 'etudiant/exercices', component: ExercicesComponent, canActivate: [AuthGuard]},
    { path: 'etudiant/performance', component: PerformanceComponent, canActivate: [AuthGuard]},
    { path: 'etudiant/submit', component: SubmitComponent, canActivate: [AuthGuard]},
    { path: 'etudiant/correction', component: CorrectionComponent, canActivate: [AuthGuard]},
    { path: 'professeur/classes', component: ClassesComponent, canActivate: [AuthGuard]},
    { path: 'professeur/correction', component: ClasseDetailsComponent, canActivate: [AuthGuard]},
    { path: 'etudiant/submissions', component: SubmissionsComponent, canActivate: [AuthGuard]},

    { path: '**', component: NotFoundComponent }, 
];

export const appRouting = provideRouter(routes);