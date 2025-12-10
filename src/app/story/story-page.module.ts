import { NgModule } from "@angular/core";
import { StoryPageEditComponent } from "./story-page-edit/story-page-edit.component";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { StoryPageViewComponent } from "./story-page-view/story-page-view.component";
import { StoryPageRoutingModule } from "./story-page-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from "primeng/button";

@NgModule({
    declarations: [StoryPageEditComponent, StoryPageViewComponent],
    exports: [StoryPageEditComponent, StoryPageViewComponent, StoryPageRoutingModule],
    imports: [
        AsyncPipe, 
        JsonPipe, 
        StoryPageRoutingModule, 
        ReactiveFormsModule, 
        InputTextModule, 
        FloatLabelModule,
        ButtonModule
    ]
})
export class StoryPageModule {
}