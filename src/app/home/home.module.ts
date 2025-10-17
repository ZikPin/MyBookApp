import { NgModule } from "@angular/core";
import { NgIf } from '@angular/common';
import { HomeComponent } from "./home.component";
import { MenuModule } from "primeng/menu";
import { BadgeModule } from "primeng/badge";
import { AvatarModule } from "primeng/avatar";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [HomeComponent],
    imports: [MenuModule, BadgeModule, AvatarModule, NgIf, RouterModule],
    exports: [HomeComponent]
})
export class HomeModule {
}