import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastMessagesService {
  private toastMessage = new BehaviorSubject<string | null>(null);
  toastMessage$ = this.toastMessage.asObservable();

  showToast(message: string, duration: number = 3000) {
    this.toastMessage.next(message);
    setTimeout(() => {
      this.toastMessage.next(null);
    }, duration);
  }
}
