import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from "./navigation/navigation.component";
import { ContentComponent } from "./content/content.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { DOCUMENT } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ErrorPopupComponent } from "./error-popup/error-popup.component";
import { LoadingScreenComponent } from "./loading-screen/loading-screen.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NavigationComponent, FooterComponent, HeaderComponent, ErrorPopupComponent, LoadingScreenComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  
  title = 'compulynxExcelApp';
}
