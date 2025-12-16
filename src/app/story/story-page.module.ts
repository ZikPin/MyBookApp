import { NgModule } from "@angular/core";
import { StoryPageEditComponent } from "./story-page-edit/story-page-edit.component";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { StoryPageViewComponent } from "./story-page-view/story-page-view.component";
import { StoryPageRoutingModule } from "./story-page-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from "primeng/button";
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { TextareaModule } from 'primeng/textarea';
import { CardModule } from 'primeng/card';
import { DiscreteColorPickerModule } from "../discrete-color-picker/discrete-color-picker.module";

@NgModule({
    declarations: [
        StoryPageEditComponent, 
        StoryPageViewComponent,
    ],
    exports: [
        StoryPageEditComponent, 
        StoryPageViewComponent, 
        StoryPageRoutingModule,
    ],
    imports: [
        AsyncPipe, 
        JsonPipe, 
        StoryPageRoutingModule, 
        ReactiveFormsModule, 
        InputTextModule, 
        FloatLabelModule,
        ButtonModule,
        DialogModule,
        DividerModule,
        TextareaModule,
        CardModule,
        DiscreteColorPickerModule
    ]
})
export class StoryPageModule {
}