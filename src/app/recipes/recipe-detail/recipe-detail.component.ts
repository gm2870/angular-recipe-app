import { Component, OnInit, Input } from "@angular/core";
import { Recipe } from "../recipe.model";
import { ShoppingListService } from "src/app/shopping-list/shopping-list.service";
import { Ingredient } from "src/app/shared/ingredient.model";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"]
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit() {}
  addToShoppingList() {
    console.log(this.recipe.ingredients);
    this.recipe.ingredients.forEach(element => {
      this.shoppingService.addIngredient(element);
    });
  }
}
