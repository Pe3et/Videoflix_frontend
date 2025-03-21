import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VideoOfferComponent } from './video-offer/video-offer.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VideoPlayerComponent } from './video-player/video-player.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent},
    { path: 'legal-notice', component: LegalNoticeComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password/:token', component: ResetPasswordComponent },
    { path: 'video-offer', component: VideoOfferComponent },
    { path: 'video-player/:videoID', component: VideoPlayerComponent },
    { path: '**', redirectTo: ''}
];
