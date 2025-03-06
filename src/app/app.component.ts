import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastMessagesService } from './services/toast-messages.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'Videoflix_frontend';

  toastMessage: string | null = null;

  /**
   * Connection to the toast-message service, so toast messages can be
   * called from every other child component.
   */
  constructor(private toastService: ToastMessagesService) {
    this.toastService.toastMessage$.subscribe((message) => {
      this.toastMessage = message;
    });
  }
}
