import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastMessagesService {
  private toastMessage = new BehaviorSubject<string | null>(null);
  toastMessage$ = this.toastMessage.asObservable();

  /** Fills the toastMessage Variable with a new message
   *  for the given duration. The app-component subscribed
   *  to the toast message, so every other component can
   *  trigger a toast message via this service-method.
   */
  showToast(message: string, duration: number = 3000) {
    this.toastMessage.next(message);
    setTimeout(() => {
      this.toastMessage.next(null);
    }, duration);
  }
}
