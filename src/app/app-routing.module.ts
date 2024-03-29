import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path:'', redirectTo:'/recipes', pathMatch: 'full'},  
  { path :'recipes', loadChildren : () => import('./recipes/recipes.module').then(m=> m.RecipeModule) },
  { path : 'shoppingList' , loadChildren : () => import('./shopping-list/shopping-list.module').then(m=> m.ShoppinglistModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
