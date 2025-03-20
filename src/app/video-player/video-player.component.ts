import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-video-player',
  imports: [],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.sass'
})

export class VideoPlayerComponent {
  videoId: string | null = null;
  router = inject(Router)

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

  getVideo(){
    // TODO: implement the database request
  }
}
