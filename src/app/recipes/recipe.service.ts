import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient, HttpHeaders,HttpParams } from "@angular/common/http";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import { exhaustMap, map,tap,take, subscribeOn } from "rxjs/operators"
import { Subject } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class RecipeService implements OnDestroy{
   
    recipesChanged = new Subject<Recipe[]>()
    recipesloaded = false;
    id : string

    constructor(private slService : ShoppingListService, 
                private http : HttpClient,
                private authService : AuthService){}

    private recipes : Recipe[] =[
        // new Recipe(
        // 'ajsdbjafbiafha',
        // 'Pasta',
        // 'A delicious noodle dish',
        // 'https://natashaskitchen.com/wp-content/uploads/2015/01/spaghetti-and-meatballs.jpg',
        // [ 
        //     new Ingredient('Pasta',10),
        //     new Ingredient('Tomato sauce',20)
        // ]
        // ),

        // new Recipe(
        // 'hsdbuafiafasfia',
        // 'Pasta',
        // 'A delicious noodle dish',
        // 'https://images.indulgexpress.com/uploads/user/imagelibrary/2021/2/17/original/1mae-mu-I7A_pHLcQK8-unsplash_revised.jpg?w=576&dpr=2.0',
        // [
        //     new Ingredient('Pasta',1),
        //     new Ingredient('Tomato sauce',2)
        // ]
        // )
      ];

      getRecipes(){
          
          return this.recipes.slice()
      }

      getRecipe(index:number){
          return this.recipes[index]

      }
      onAddIngredients(ingredients : Ingredient[]){
          this.slService.addIngredients(ingredients)

      }

      updateRecipe(index:number, newRecipe:Recipe){
          this.id = this.recipes[index]._id
          this.recipes[index] = newRecipe;
          this.recipes[index]._id = this.id
          
          this.http.put('http://localhost:3000/recipes/',this.recipes[index])
                        .subscribe(
                                (responseData=>{
                                        console.log(responseData)
                                })
                            )

          this.recipesChanged.next(this.recipes.slice())
      }

      addRecipe(recipe){
         
          this.http.post('http://localhost:3000/recipes/',recipe)
                        .pipe(tap(responseData =>{
                            console.log(responseData['data'].rec)
                            this.recipes.push(responseData['data'].rec)
                        }))
                        .subscribe(() =>{
                            this.recipesChanged.next(this.recipes.slice())
                        })
          
      }

      deleteRecipe(index:number){
          
        this.http.delete('http://localhost:3000/recipes/'+this.recipes[index]._id  )
                        .subscribe(
                                (responseData=>{
                                        console.log(responseData)
                                })
                            )
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice())
      }

    fetchRecipe(){
        
            return this.http
                    .get('http://localhost:3000/recipes/')
            .pipe(
            map(response => {
                const returnArray = []
                console.log(response)
                response['data'].rec.forEach(element => {
                  returnArray.push(element)
                });
                return returnArray;
            }),
            tap(responseData =>{
                console.log(responseData)
                if(!this.recipesloaded){
                responseData.forEach(element => {
                    
                    this.recipes.push(
                       element
                    )
                    
                })
                this.recipesloaded = true
                this.recipesChanged.next(this.recipes.slice())
                }
            }))
        
        }

      ngOnDestroy(): void {
          
          this.recipesloaded = false
      }

}