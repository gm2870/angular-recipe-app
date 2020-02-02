import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  selectedRecipe = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      "a test Recipe",
      "this is simply is test",
      "https://assets.bonappetit.com/photos/5d7296eec4af4d0008ad1263/master/pass/Basically-Gojuchang-Chicken-Recipe-Wide.jpg",
      [new Ingredient("Meat", 1), new Ingredient("French Fries", 20)]
    ),
    new Recipe(
      "a test Recipe2",
      "this is simply is test2",
      "https://assets.bonappetit.com/photos/5d7296eec4af4d0008ad1263/master/pass/Basically-Gojuchang-Chicken-Recipe-Wide.jpg",
      [new Ingredient("Buns", 2), new Ingredient("Meat", 1)]
    )
  ];
  constructor(private shoppingService: ShoppingListService) {}
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }
  getRecipes() {
    return this.recipes.slice();
  }
  addIngredientsToShopping(ingredients: Ingredient[]) {
    this.shoppingService.addIngredients(ingredients);
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }
}
