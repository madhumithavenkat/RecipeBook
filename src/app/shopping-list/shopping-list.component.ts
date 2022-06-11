import { Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

    igSubscription : Subscription;
    ingredients = []
  
  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients()
    this.igSubscription = this.slService.ingredientsChanged
      .subscribe(
        (ing : Ingredient[])=>{
          this.ingredients = ing;
        }
      )

  }


  onEditClicked(index:number){
    this.slService.startEditing.next(index)
  }

  ngOnDestroy(): void {
    this.igSubscription.unsubscribe()
  }

}
