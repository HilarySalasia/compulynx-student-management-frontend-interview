import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GlobalServiceService } from '../service/global-service.service';

@Component({
  selector: 'app-error-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-popup.component.html',
  styleUrl: './error-popup.component.scss'
})
export class ErrorPopupComponent {
  constructor(public globalService: GlobalServiceService) {}

  closePopup() {
    this.globalService.errorPopupVisible = false;
  }
}
