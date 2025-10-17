import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {RouterModule, provideRouter} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {providePrimeNG} from "primeng/config";
import {Noir} from "./theme-preset";
import {BookGalleryModule} from './book-gallery/book-gallery.module';
import { provideHttpClient } from "@angular/common/http";
import { routes } from './app.routes';
import { HomeModule } from "./home/home.module";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgIf } from '@angular/common';
import { MenuModule } from "primeng/menu";
import { BadgeModule } from "primeng/badge";
import { AvatarModule } from "primeng/avatar";
import { AboutModule } from './about/about.module';
import { BookPageModule } from "./book-page/book-page.module";

@NgModule({
    declarations: [AppComponent],
    imports: [
        RouterModule,
        BrowserModule,
        BookGalleryModule,
        HomeModule,
        MenuModule,
        BadgeModule,
        AvatarModule,
        NgIf,
        BookPageModule,
        AboutModule
    ],
    providers: [
        provideAnimationsAsync(),
        provideHttpClient(),
        providePrimeNG({
            /* specify the theme preset you want */
            theme: {
                preset: Noir,
                options: {
                    darkModeSelector: false
                }
            },
            ripple: true  // if you want ripple effects
        }),
        provideRouter(routes)
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
