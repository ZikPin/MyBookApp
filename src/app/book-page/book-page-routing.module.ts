import { NgModule } from "@angular/core";
import { BookPageEditComponent } from "./book-page-edit/book-page-edit.component";
import { BookPageViewComponent } from "./book-page-view/book-page-view.component";
import { Route, RouterModule } from "@angular/router";

export const routes: Route[] = [
    {
        path: 'book-page/:id/edit',
        component: BookPageEditComponent
    },
    {
        path: 'book-page/:id/view',
        component: BookPageViewComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BookPageRoutingModule {
}