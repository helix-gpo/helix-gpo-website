import { Component, inject, OnInit } from '@angular/core';
import { IconComponent } from '../../util/icon/icon.component';
import { WebsiteTestimonialRequest } from '../../model/testimonials/website-testimonial-request';
import { FormsModule } from '@angular/forms';
import { TestimonialsService } from '../../services/testimonials.service';
import { UtilService } from '../../services/util.service';
import { NgStyle } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  imports: [IconComponent, FormsModule, NgStyle],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class FeedbackComponent implements OnInit {
  private testimonialService: TestimonialsService = inject(TestimonialsService);
  private utilService: UtilService = inject(UtilService);
  private router: Router = inject(Router);

  websiteTestimonialRequest: WebsiteTestimonialRequest = {
    testimonialDtoRequest: {
      id: 0,
      title: '',
      description: '',
      result: 0,
      showOnWebsite: false,
    },
    authTokenValue: '',
  };

  selectedFile: File | null = null;

  ratingArray = [1, 2, 3, 4, 5];
  ratingResult = 0;
  authTokenValue = '';
  description = '';

  showTitleWarning = false;
  showDescriptionWarning = false;
  showRatingWarning = false;
  showAuthTokenWarning = false;

  sendingProcessing = false;

  ngOnInit(): void {
    this.websiteTestimonialRequest.testimonialDtoRequest.result =
      this.ratingResult;
    this.websiteTestimonialRequest.authTokenValue = this.authTokenValue;
    this.websiteTestimonialRequest.testimonialDtoRequest.description =
      this.description;
  }

  handleRatingResultClick(rating: number) {
    this.ratingResult = rating;
    this.websiteTestimonialRequest.testimonialDtoRequest.result =
      this.ratingResult;
  }

  handleSendButtonClick() {
    if (this.validateFeedbackFormInputs()) {
      const formData = this.fillFormData();
      this.sendingProcessing = true;

      this.testimonialService.sendTestimonialRequest(formData).subscribe({
        next: (response) => {
          this.showSuccess('Dein Feedback wurde erfolgreich versendet!');
          this.sendingProcessing = false;
          this.resetForm();
        },
        error: (errorBody) => {
          console.log(errorBody);
          this.sendingProcessing = false;
          this.showError(errorBody.message);
        },
      });
    } else {
      this.showWarning('Du hast nicht alle Pflichtfelder ausgefüllt!');
    }
  }

  private validateFeedbackFormInputs(): boolean {
    this.showTitleWarning =
      !this.websiteTestimonialRequest.testimonialDtoRequest.title;
    this.showDescriptionWarning =
      !this.websiteTestimonialRequest.testimonialDtoRequest.description;

    this.showRatingWarning = this.ratingResult < 1 || this.ratingResult > 5;
    this.showAuthTokenWarning = !this.websiteTestimonialRequest.authTokenValue;

    return (
      !this.showAuthTokenWarning &&
      !this.showDescriptionWarning &&
      !this.showRatingWarning &&
      !this.showTitleWarning
    );
  }

  private fillFormData(): FormData {
    const formData = new FormData();

    const jsonBlob = new Blob(
      [JSON.stringify(this.websiteTestimonialRequest)],
      {
        type: 'application/json',
      }
    );
    formData.append('payload', jsonBlob);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    return formData;
  }

  private showError(message: string) {
    this.utilService.showToastr('Fehler!', message, 'error');
  }

  private showWarning(message: string) {
    this.utilService.showToastr('Achtung!', message, 'warning');
  }

  private showSuccess(message: string) {
    this.utilService.showToastr('Vielen Dank!', message, 'success');
  }

  private resetForm(): void {
    this.websiteTestimonialRequest.testimonialDtoRequest.title = '';
    this.websiteTestimonialRequest.testimonialDtoRequest.description = '';
    this.ratingResult = 0;
    this.websiteTestimonialRequest.authTokenValue = '';

    this.selectedFile = null;
  }

  handleOnFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  handleBackButtonClick() {
    this.router.navigate(['/']);
  }
}
