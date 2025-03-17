import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-video-offer',
  imports: [FooterComponent, CommonModule, RouterLink],
  templateUrl: './video-offer.component.html',
  styleUrls: ['./video-offer.component.sass']
})
export class VideoOfferComponent implements OnInit {
  token: string | null = null;

  constructor(private router: Router) { }

  /** Checks session storage for the auth token and stores it in a variable.
   * If the token is found, it is used to populate the video offer component.
   * If there is no token, there's redirection to login page.
   */
  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
    if (!this.token) {
      this.router.navigate(['/login']);
    } else {
      //TODO: load videos/thumbails from DB
    }
  }
}
