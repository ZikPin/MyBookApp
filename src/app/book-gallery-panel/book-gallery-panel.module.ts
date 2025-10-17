import { NgModule } from "@angular/core";
import { BookGalleryPanelComponent } from "./book-gallery-panel.component";
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from "@angular/router";

@NgModule({
    declarations: [BookGalleryPanelComponent],
    imports: [
        CardModule,
        ButtonModule,
        RouterLink
    ],
    exports: [
        BookGalleryPanelComponent
    ]
})
export class BookGalleryPanelModule {
}