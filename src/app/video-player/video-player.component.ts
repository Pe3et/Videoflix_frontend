import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-video-player',
  imports: [],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.sass'
})

export class VideoPlayerComponent {
  videoId: string | null = null;
  router = inject(Router);
  apiService = inject(ApiService);
  token: string | null = sessionStorage.getItem('token');

  constructor(private route: ActivatedRoute) { }

  /**
   * Stores the videoId from URL-param in a variable and starts the database request.
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.videoId = params.get('videoID');
      if (!this.videoId) {
        this.router.navigate(['video-offer'])
      } else {
        this.getVideo();
      }
    });
  }

  /** Single GET from Database containing the video data (including links to different resolutions) */
  async getVideo(){
    const videoJSON = await this.apiService.get('videos/' + this.videoId, this.token);
  }
}
