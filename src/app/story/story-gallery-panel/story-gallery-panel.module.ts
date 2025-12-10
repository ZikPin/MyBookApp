import { NgModule } from "@angular/core";
import { StoryGalleryPanelComponent } from "./story-gallery-panel.component";
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from "@angular/router";

@NgModule({
    declarations: [StoryGalleryPanelComponent],
    imports: [
        CardModule,
        ButtonModule,
        RouterLink
    ],
    exports: [
        StoryGalleryPanelComponent
    ]
})
export class StoryGalleryPanelModule {
}