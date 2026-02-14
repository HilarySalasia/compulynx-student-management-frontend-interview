import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import { LoadingScreenService } from './loading-screen.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.scss'
})
export class LoadingScreenComponent {
  public faSpinner = faSpinner;
  isLoading: Subject<boolean>;
  constructor(private loaderService: LoadingScreenService) { 
    this.isLoading = this.loaderService.isLoading;
  }
  

  ngOnInit(): void {
  }
}
