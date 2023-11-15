import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropDownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceHolderDirective } from "./placeHolder.component";


@NgModule({
    declarations :[
        DropDownDirective,
        LoadingSpinnerComponent,
        AlertComponent,
        PlaceHolderDirective
    ],
    exports :[
        DropDownDirective,
        LoadingSpinnerComponent,
        AlertComponent,
        PlaceHolderDirective,
        CommonModule
    ],
    imports :[
        CommonModule
    ]
})

export class SharedModule{

}