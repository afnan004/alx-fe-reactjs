import { useState } from "react";

/** Validate form fields and return an errors object */
function validate({ title, ingredients, steps }) {
  const errors = {};

  const titleOk = title.trim().length > 0;
  const ingLines = ingredients
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const stepsLines = steps
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  if (!titleOk) errors.title = "Title is required";
  if (ingLines.length === 0) {
    errors.ingredients = "Ingredients are required";
  } else if (ingLines.length < 2) {
    errors.ingredients = "Include at least 2 ingredients";
  }
  if (stepsLines.length === 0) errors.steps = "Preparation steps are required";

  return { errors, ingLines, stepsLines };
}

export default function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors: nextErrors, ingLines, stepsLines } = validate({
      title,
      ingredients,
      steps,
    });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const newRecipe = {
      id: Date.now(),
      title: title.trim(),
      ingredients: ingLines,
      instructions: stepsLines,
    };

    console.log("New recipe submitted:", newRecipe);
    alert("Recipe submitted successfully! (Check console)");

    // reset
    setTitle("");
    setIngredients("");
    setSteps("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">Add a New Recipe</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-1"
          >
            Recipe Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full rounded-lg px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g., Spaghetti Carbonara"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <p id="title-error" className="text-red-500 text-sm mt-1">
              {errors.title}
            </p>
          )}
        </div>

        {/* Ingredients */}
        <div>
          <label
            htmlFor="ingredients"
            className="block text-gray-700 font-medium mb-1"
          >
            Ingredients <span className="text-gray-500">(one per line)</span>
          </label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className={`w-full rounded-lg px-4 py-2 h-32 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.ingredients ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={"e.g.\n200g spaghetti\n2 eggs\n50g parmesan"}
            aria-invalid={Boolean(errors.ingredients)}
            aria-describedby={errors.ingredients ? "ingredients-error" : undefined}
          />
          {errors.ingredients && (
            <p id="ingredients-error" className="text-red-500 text-sm mt-1">
              {errors.ingredients}
            </p>
          )}
        </div>

        {/* Steps */}
        <div>
          <label
            htmlFor="steps"
            className="block text-gray-700 font-medium mb-1"
          >
            Preparation Steps <span className="text-gray-500">(one per line)</span>
          </label>
          <textarea
            id="steps"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className={`w-full rounded-lg px-4 py-2 h-32 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.steps ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={"e.g.\nBoil pasta until al dente\nCook pancetta\nMix and serve"}
            aria-invalid={Boolean(errors.steps)}
            aria-describedby={errors.steps ? "steps-error" : undefined}
          />
          {errors.steps && (
            <p id="steps-error" className="text-red-500 text-sm mt-1">
              {errors.steps}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Recipe
          </button>
        </div>
      </form>
    </div>
  );
}
