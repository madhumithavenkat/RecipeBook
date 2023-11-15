import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";



@NgModule({
    declarations :[
        AuthComponent
    ],
    imports : [
        RouterModule.forChild([{
            path:'auth',
            component:AuthComponent
          }]),
        FormsModule
    ]
    
})

export class AuthModule {

}