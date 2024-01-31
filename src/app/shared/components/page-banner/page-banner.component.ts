import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-banner',
  templateUrl: './page-banner.component.html',
  styleUrls: ['./page-banner.component.css']
})
export class PageBannerComponent {

  @Input() bannerTitle! : string;

  constructor(){}

}
