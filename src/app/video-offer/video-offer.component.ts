import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastMessagesService } from '../services/toast-messages.service';

@Component({
  selector: 'app-video-offer',
  imports: [FooterComponent, CommonModule, RouterLink],
  templateUrl: './video-offer.component.html',
  styleUrls: ['./video-offer.component.sass']
})
export class VideoOfferComponent implements OnInit {
  token: string | null = null;
  videoTitle: string = 'White Cat';
  videoDescription: string = 'What does this white cat see out of the window?';
  videoThumbnailPath: string = 'assets/img/white_cat.png';


  apiService = inject(ApiService);
  messageService = inject(ToastMessagesService);
  videosJSON: any;

  constructor(private router: Router) { }

  /** Checks session storage for the auth token and stores it in a variable.
   * If the token is found, it is used to populate the video offer component.
   * If there is no token, there's redirection to login page.
   */
  async ngOnInit(): Promise<void> {
    this.token = sessionStorage.getItem('token');
    if (!this.token) {
      this.router.navigate(['/login']);
    } else {
      this.videosJSON = await this.apiService.get('videos/', this.token)
    }
  }
}
