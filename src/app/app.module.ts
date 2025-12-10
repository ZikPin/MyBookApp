import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {RouterModule, provideRouter} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {providePrimeNG} from "primeng/config";
import {Noir} from "./theme-preset";
import {StoryGalleryModule} from './story/story-gallery/story-gallery.module';
import { provideHttpClient } from "@angular/common/http";
import { routes } from './app.routes';
import { HomeModule } from "./home/home.module";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgIf } from '@angular/common';
import { MenuModule } from "primeng/menu";
import { BadgeModule } from "primeng/badge";
import { AvatarModule } from "primeng/avatar";
import { AboutModule } from './about/about.module';
import { StoryPageModule } from "./story/story-page.module";
import { ButtonModule } from "primeng/button";

@NgModule({
    declarations: [AppComponent],
    imports: [
        RouterModule,
        BrowserModule,
        StoryGalleryModule,
        HomeModule,
        MenuModule,
        BadgeModule,
        AvatarModule,
        NgIf,
        StoryPageModule,
        AboutModule,
        ButtonModule
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
