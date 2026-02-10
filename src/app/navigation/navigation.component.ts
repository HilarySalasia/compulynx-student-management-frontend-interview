import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
constructor(@Inject(DOCUMENT) private document: Document) {
    console.log('This is DOCUMENT:', this.document);
  }
}
