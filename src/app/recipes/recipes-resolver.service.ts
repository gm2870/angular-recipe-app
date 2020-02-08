import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorateService: DataStorageService,
    private recipeService: RecipeService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorateService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
