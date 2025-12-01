import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ImpressumComponent } from './pages/impressum/impressum.component';
import { DatenschutzComponent } from './pages/datenschutz/datenschutz.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'impressum',
    component: ImpressumComponent,
  },
  {
    path: 'datenschutz',
    component: DatenschutzComponent,
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
  },
  {
    path: 'project-details/:projectId',
    component: ProjectDetailsComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: '**',
    redirectTo: '/error',
    pathMatch: 'full',
  },
];
