import { NgModule } from "@angular/core";
import { BookPageEditComponent } from "./book-page-edit/book-page-edit.component";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { BookPageViewComponent } from "./book-page-view/book-page-view.component";
import { BookPageRoutingModule } from "./book-page-routing.module";

@NgModule({
    declarations: [BookPageEditComponent, BookPageViewComponent],
    exports: [BookPageEditComponent, BookPageViewComponent, BookPageRoutingModule],
    imports: [AsyncPipe, JsonPipe, BookPageRoutingModule]
})
export class BookPageModule {
}