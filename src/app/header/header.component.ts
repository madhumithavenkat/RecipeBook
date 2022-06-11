import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { RecipeService } from "../recipes/recipe.service";

@Component({
    selector : 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
    collapsed = false
    isAuthenticated = false;
    private userSub : Subscription
    constructor(private recipeService:RecipeService,
                private authService : AuthService){}

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user
        })
    }
    fetchData(){
        this.recipeService.fetchRecipe()
    }

    logout(){
        this.authService.logout()
    }
}
