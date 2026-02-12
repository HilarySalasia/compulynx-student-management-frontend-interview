import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {
constructor(@Inject(DOCUMENT) private document: Document) {
    console.log('This is DOCUMENT:', this.document);
  }
}
