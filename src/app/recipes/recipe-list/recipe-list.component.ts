import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes : Recipe[] =[
    new Recipe('Pasta','A delicious noodle dish',
    'https://g6t8s5u9.rocketcdn.me/wp-content/uploads/2016/02/Easy-Tomato-Pasta-Sauce-1-1.jpg')
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
