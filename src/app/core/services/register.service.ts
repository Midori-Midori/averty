import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { RegisterForm } from '../models/register-form.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api-averty.onrender.com/api/register';

  registerUser(formData: RegisterForm): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(this.apiUrl, formData).pipe(
      catchError(err => {
        console.error('Registration error:', err);
        return of({
          success: false,
          message: 'Could not connect to the server. Please try again.'
        });
      })
    );
  }
}
