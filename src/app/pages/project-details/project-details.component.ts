import { Component, inject, OnInit } from '@angular/core';
import { Project } from '../../model/projects/project';
import { IconComponent } from '../../util/icon/icon.component';
import { UtilService } from '../../services/util.service';
import { NgStyle } from '@angular/common';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-details',
  imports: [IconComponent, NgStyle],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css',
})
export class ProjectDetailsComponent implements OnInit {
  private utilService: UtilService = inject(UtilService);
  private projectService: ProjectsService = inject(ProjectsService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  private projectId: number = 0;

  loadingProject = false;

  project: Project = {
    id: 0,
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    imageUrl: '',
    tags: [],
    showOnWebsite: true,
    websitePartnerDto: {
      id: 0,
      name: '',
      job: '',
      websiteCompanyDto: {
        id: 0,
        name: '',
      },
    },
  };

  constructor() {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['projectId'];
    this.loadProject();
  }

  private loadProject() {
    this.loadingProject = true;
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (response) => {
        this.project = response;
        this.loadingProject = false;
      },
      error: () => {
        this.loadingProject = false;
        this.utilService.showToastr(
          'Fehler!',
          'Das Projekt konnte nicht geladen werden!',
          'error'
        );
      },
    });
  }

  formatMonthYear(dateString: string): string {
    return this.utilService.formatMonthYear(dateString);
  }

  handleBackButtonClick() {
    this.router.navigate(['/']);
  }
}
