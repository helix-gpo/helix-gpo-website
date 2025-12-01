import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TestimonialResponse } from '../model/testimonials/testimonial-response';

@Injectable({
  providedIn: 'root',
})
export class TestimonialsService {
  private readonly baseUrl = environment.TESTIMONIAL_SERVICE_BASE_URL;

  private httpClient: HttpClient = inject(HttpClient);

  getAllTestimonials(): Observable<TestimonialResponse[]> {
    return this.httpClient.get<TestimonialResponse[]>(this.baseUrl);
  }

  getTestimonialsAverage(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/average`);
  }

  sendTestimonialRequest(formData: FormData): Observable<TestimonialResponse> {
    return this.httpClient
      .post<TestimonialResponse>(this.baseUrl, formData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const body = error.error;
          return throwError(() => body);
        })
      );
  }
}
