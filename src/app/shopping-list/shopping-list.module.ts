
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppinglistRoutingModule } from "./shopping-list-routing.module";
import { ShoppingListComponent } from "./shopping-list.component";



@NgModule({
    declarations :[
        ShoppingListComponent,
        ShoppingListEditComponent,
    ],
    imports : [
        RouterModule,
        ReactiveFormsModule,
        ShoppinglistRoutingModule,
        FormsModule,
        SharedModule
    ]
})
export class ShoppinglistModule{

}