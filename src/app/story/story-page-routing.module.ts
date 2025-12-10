import { NgModule } from "@angular/core";
import { StoryPageEditComponent } from "./story-page-edit/story-page-edit.component";
import { StoryPageViewComponent } from "./story-page-view/story-page-view.component";
import { Route, RouterModule } from "@angular/router";

export const routes: Route[] = [
    {
        path: 'book-page/:id/edit',
        component: StoryPageEditComponent
    },
    {
        path: 'book-page/:id/view',
        component: StoryPageViewComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StoryPageRoutingModule {
}