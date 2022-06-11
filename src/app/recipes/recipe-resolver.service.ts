import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private recipeService : RecipeService){}

    resolve(route : ActivatedRouteSnapshot, state:RouterStateSnapshot){
        return this.recipeService.fetchRecipe()
    }

}