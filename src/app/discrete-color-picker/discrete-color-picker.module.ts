import { NgModule } from "@angular/core";
import { DiscreteColorPickerComponent } from "./discrete-color-picker.component";
import { ButtonModule } from "primeng/button";
import { PopoverModule } from 'primeng/popover';

@NgModule({
    declarations: [DiscreteColorPickerComponent],
    imports: [ButtonModule, PopoverModule],
    exports: [DiscreteColorPickerComponent]
})
export class DiscreteColorPickerModule {

}