import { NgModule } from "@angular/core";
import { BookGalleryPanelComponent } from "./book-gallery-panel.component";
import { CardModule } from 'primeng/card';

@NgModule({
    declarations: [BookGalleryPanelComponent],
    imports: [
    CardModule,
],
    exports: [
        BookGalleryPanelComponent
    ]
})
export class BookGalleryPanelModule {
}