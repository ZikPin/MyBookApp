import { NgModule } from "@angular/core";
import { StoryPageViewComponent } from "./story-page-view/story-page-view.component";
import { Route, RouterModule } from "@angular/router";

export const routes: Route[] = [
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