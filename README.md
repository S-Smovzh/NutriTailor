## How to start

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Project structure

- Components
- Enums
- Pages
- Store (Redux)
- Styles (SCSS)
- Translations (EN, UA)
- Types
- Utils

## Pages

1. _**Diet Details**_ \
   Includes the same cards as the Welcome page has, but with a more detailed description. Also, the user can change the plan.
2. _**Diet Planning**_ \
   The user receives AI-suggested meals for a selected period (breakfast, supper, dinner, snack, whole day, three days, five days, week)
   based on what he has now in his Profile Product List and his Diet Plan. If there are not enough products on the list, AI suggests a meal based on the Diet Plan.
3. _**Forgot password**_ \
   Page to reset the password (account becomes blocked, the user logs out programmatically, and an email with a reset link comes to the user email).
4. _**Meal**_ \
   The page with a receipt. Includes name/category/product/estimate cooking time (optional)/complexity (optional), images/videos, step-by-step guide, ingredients, nutrition score,
   link to the original, tags (optional).
5. _**Meals List**_ \
   List of meals with pagination on scroll (it is possible to set the number of dishes per page). Small Cards with dish name and brief description.
   Name/category/product/estimate cooking time (optional)/complexity (optional) filters.
6. _**Profile**_ \
   User profile: registration info, ability to change it, diet plan, link to Diet Planning, has tabs of User Products and User Suggested Meals.
7. _**Reset Password**_ \
   Users can create a new password using an email link with a special token.
8. _**Sign In**_
9. _**Sign Up**_ \
   The form requires user info: email, password, full name, age, weight, and height.
10. _**Welcome**_ \
    The first page, which requires the user to select the diet plan, forwards the user to Sign Up.

ChatGPT prompt:

```
mealType - breakfast, supper, dinner
dietPlan - maintaining a healthy lifestyle, cutting, bulking

1. Give me a receipt of a ${mealType} that will help while ${dietPlan} with any ingredients.
2. Give me a receipt of a ${mealType} meal that will help while ${dietPlan} with the following ingredients: ${amount} ${measurment} of ${name}... . If not enough ingredients, give receipts that include provided ingredients.

IMPORTANT! Provide the response only as a JSON object with such fields:
name: string; - meal name
category: string; - meal category
estimatedCookingTimeMinutes?: number;
complexity?: string;  
images?: string[];
videos?: string[];
stepByStepGuide: string; - write guide as a plain string, if a the next sentence starts a new paragraph add "/p" before it, if starts a new line - add "/n"
ingredients: { name: string; measurement: 'grams' | 'milliliters' | 'units' ; amount: number }[];
nutritionScore: string; - include calories, protein, carbs and fats
linkToOriginal: string;
tags?: string[]
```
