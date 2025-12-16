import { NgModule } from "@angular/core";
import { StoryGalleryComponent } from "./story-gallery.component";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { StoryGalleryPanelModule } from "../story-gallery-panel/story-gallery-panel.module";

@NgModule({
    declarations: [StoryGalleryComponent],
    imports: [
        AsyncPipe,
        JsonPipe,
        CardModule,
        StoryGalleryPanelModule,
        DataViewModule,
        SelectButtonModule,
    ],
    exports: [
        StoryGalleryComponent
    ]
})
export class StoryGalleryModule {
}