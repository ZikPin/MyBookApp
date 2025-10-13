import { NgModule } from "@angular/core";
import { BookGalleryComponent } from "./book-gallery.component";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { BookGalleryPanelModule } from "../book-gallery-panel/book-gallery-panel.module";

@NgModule({
    declarations: [BookGalleryComponent],
    imports: [
    AsyncPipe,
    JsonPipe,
    CardModule,
    BookGalleryPanelModule,
    DataViewModule,
    SelectButtonModule
],
    exports: [
        BookGalleryComponent
    ]
})
export class BookGalleryModule {
}