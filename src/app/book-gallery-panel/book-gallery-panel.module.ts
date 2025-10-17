import { NgModule } from "@angular/core";
import { BookGalleryPanelComponent } from "./book-gallery-panel.component";
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [BookGalleryPanelComponent],
    imports: [
    CardModule,
    ButtonModule
],
    exports: [
        BookGalleryPanelComponent
    ]
})
export class BookGalleryPanelModule {
}