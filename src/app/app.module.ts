import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {RouterModule, RouterOutlet} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {providePrimeNG} from "primeng/config";
import {Noir} from "./theme-preset";

@NgModule({
    declarations: [AppComponent],
    imports: [
        RouterModule,
        BrowserModule],
    providers: [
        providePrimeNG({
            /* specify the theme preset you want */
            theme: {
                preset: Noir,
                options: {
                    darkModeSelector: false
                }
            },
            ripple: true  // if you want ripple effects
        })
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
