import { stringify } from "querystring";
import { Ingredient } from "../shared/ingredient.model";

export class Recipe{
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];
    public _id:string
    

    constructor(_id:string,name :string, desc : string, imagePath:string, ingredientArray:Ingredient[]){
        this._id = _id;
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = ingredientArray

    }
}