import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../model/projects/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly baseUrl = environment.PROJECT_SERVICE_BASE_URL;

  private httpClient: HttpClient = inject(HttpClient);

  getAllProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${this.baseUrl}`);
  }

  getProjectById(id: number): Observable<Project> {
    return this.httpClient.get<Project>(`${this.baseUrl}/${id}`);
  }
}
