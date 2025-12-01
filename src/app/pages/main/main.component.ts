import { Component, inject, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { TestimonialsService } from '../../services/testimonials.service';
import { Project } from '../../model/projects/project';
import { TestimonialResponse } from '../../model/testimonials/testimonial-response';
import { NgStyle } from '@angular/common';
import { UtilService } from '../../services/util.service';
import { IconComponent } from '../../util/icon/icon.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [NgStyle, IconComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  private projectsService: ProjectsService = inject(ProjectsService);
  private testimonialsService: TestimonialsService =
    inject(TestimonialsService);
  private utilService: UtilService = inject(UtilService);
  private router: Router = inject(Router);

  environment = '';

  projects: Project[] = [];
  shownProjects: Project[] = [];

  testimonials: TestimonialResponse[] = [];
  shownTestimonials: TestimonialResponse[] = [];
  shownTestimonialsLeft: TestimonialResponse[] = [];
  shownTestimonialsRight: TestimonialResponse[] = [];

  readonly ratingArray = [1, 2, 3, 4, 5];
  averageRating = 0;

  loadingProjects = true;
  loadingTestimonials = true;

  showAllProjects = false;
  showAllProjectsText = 'Mehr Anzeigen';

  showLeftTestimonials = true;

  ngOnInit(): void {
    this.loadProjects();
    this.loadTestimonials();
    this.getTestimonialsAverage();
  }

  private loadProjects() {
    this.loadingProjects = true;
    this.projectsService.getAllProjects().subscribe({
      next: (projectsResponse) => {
        this.projects = projectsResponse.slice(0, 9);
        this.shownProjects = this.projects.slice(0, 3);
        this.loadingProjects = false;
      },
      error: () => {
        this.projects = [];
        this.loadingProjects = false;
        this.utilService.showToastr(
          'Fehler!',
          'Projekte konnten nicht geladen werden!',
          'error'
        );
      },
    });
  }

  private loadTestimonials() {
    this.loadingTestimonials = true;
    this.testimonialsService.getAllTestimonials().subscribe({
      next: (testimonialsResponse) => {
        this.testimonials = testimonialsResponse;

        this.shownTestimonialsLeft = this.testimonials.slice(0, 3);
        this.shownTestimonialsRight = this.testimonials.slice(3, 6);
        this.shownTestimonials = this.shownTestimonialsLeft;

        this.loadingTestimonials = false;
      },
      error: () => {
        this.testimonials = [];
        this.loadingTestimonials = false;
        this.utilService.showToastr(
          'Fehler!',
          'Referenzen konnten nicht geladen werden!',
          'error'
        );
      },
    });
  }

  private getTestimonialsAverage() {
    this.testimonialsService.getTestimonialsAverage().subscribe({
      next: (average) => {
        this.averageRating = average;
      },
      error: (error) => {
        this.averageRating = 0;
        console.error(
          'Fehler beim Laden der durchschnittlichen Bewertung:',
          error
        );
      },
    });
  }

  scrollToElementByButton(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  shortenText(text: string, maxLength: number, addEllipsis = true): string {
    return this.utilService.shorten(text, maxLength, addEllipsis);
  }

  formatMonthYear(dateString: string): string {
    return this.utilService.formatMonthYear(dateString);
  }

  handleProjectDetailsButtonClick(projectId: number) {
    this.router.navigate(['project-details', projectId]).then(() => {
      this.scrollToElementByButton('header');
    });
  }

  handleToggleShowAllProjectsButton() {
    this.showAllProjects = !this.showAllProjects;

    if (this.showAllProjects) {
      this.shownProjects = this.projects;
      this.showAllProjectsText = 'Weniger Anzeigen';
    } else {
      this.shownProjects = this.projects.slice(0, 3);
      this.showAllProjectsText = 'Mehr Anzeigen';
      this.scrollToElementByButton('projects');
    }
  }

  handleShowLeftPage() {
    this.showLeftTestimonials = true;
    this.shownTestimonials = this.shownTestimonialsLeft;
    this.scrollToElementByButton('testimonials');
  }

  handleShowRightPage() {
    this.showLeftTestimonials = false;
    this.shownTestimonials = this.shownTestimonialsRight;
    this.scrollToElementByButton('testimonials');
  }
}
