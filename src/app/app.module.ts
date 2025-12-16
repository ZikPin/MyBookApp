import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { RouterModule, provideRouter } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { providePrimeNG } from "primeng/config";
import { Noir } from "./theme-preset";
import { StoryGalleryModule } from './story/story-gallery/story-gallery.module';
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
import { DialogModule } from "primeng/dialog";
import { FloatLabel } from "primeng/floatlabel";
import { ReactiveFormsModule } from "@angular/forms";
import { InputText } from "primeng/inputtext";
import { ToastModule } from 'primeng/toast';
import { MessageService } from "primeng/api";

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
        ButtonModule,
        DialogModule,
        FloatLabel,
        ReactiveFormsModule,
        InputText,
        ToastModule
    ],
    providers: [
        provideAnimationsAsync(),
        provideHttpClient(),
        providePrimeNG({
            theme: {
                preset: Noir,
                options: {
                    darkModeSelector: false
                }
            },
            ripple: true
        }),
        provideRouter(routes),
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
