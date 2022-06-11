import {  Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService {
    startEditing = new Subject<number>()
    ingredientsChanged = new Subject<Ingredient[]>()
    private ingredients = [
        new Ingredient('apple', 10),
        new Ingredient('orange',20)
    
      ]

      getIngredient(index){
          return this.ingredients[index]
      }

      getIngredients(){
          return this.ingredients.slice();
      }

      addIngredient(ingredient :Ingredient){
          this.ingredients.push(ingredient)
          this.ingredientsChanged.next(this.ingredients.slice())
      }

      addIngredients(ingredientArray : Ingredient[]){
          this.ingredients.push(...ingredientArray);
          this.ingredientsChanged.next(this.ingredients.slice())
      }

      updateIngredient(index:number , newIngredient : Ingredient){
          this.ingredients[index] = newIngredient;
          this.ingredientsChanged.next(this.ingredients.slice())
      }

      deleteIngredient(index:number){
          this.ingredients.splice(index)
          this.ingredientsChanged.next(this.ingredients.slice())

      }

}