import { Component, EventEmitter, OnInit,Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('f',{static:false}) slForm : NgForm;
  subscription : Subscription;  
  editMode = false;
  editedItem : Ingredient;
  editedItemIndex :number;

  constructor(private slService : ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startEditing.
                              subscribe(
                                (index:number) =>{
                                  this.editedItemIndex = index;
                                  this.editMode = true;
                                  this.editedItem = this.slService.getIngredient(index)
                                  this.slForm.setValue({
                                    name : this.editedItem.name,
                                    amount : this.editedItem.amount
                                  })
                                }
                              )

  }

  onSubmitClicked(form : NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount)
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex,newIngredient)
    }else{
      this.slService.addIngredient(newIngredient)
    }
    this.editMode = false;
    form.reset()
  }

  onClearMode(){
    this.slForm.reset();
    this.editMode = false
  }

  onDeleteMode(){
    this.slService.deleteIngredient(this.editedItemIndex)
    this.editMode = false
  }

}
