export const fetchRecipes = async (
  path: string,
  search: string,
  searchType: string
) => {
  let result;

  const isMeal = path === '/meals';

  const baseUrl = isMeal
    ? 'https://www.themealdb.com/api/json/v1/1'
    : 'https://www.thecocktaildb.com/api/json/v1/1';

  switch (searchType) {
    case 'ingredient':
      const fetchRecipeIngredient = await fetch(
        `${baseUrl}/filter.php?i=${search}`
      );
      result = await fetchRecipeIngredient.json();
      break;
    case 'name':
      const fetchRecipeName = await fetch(`${baseUrl}/search.php?s=${search}`);
      result = await fetchRecipeName.json();
      break;
    case 'firstLetter':
      const fetchRecipeFirstLetter = await fetch(
        `${baseUrl}/search.php?f=${search}`
      );
      result = await fetchRecipeFirstLetter.json();
      break;
  }

  if (result.drinks === 'no data found') return [];

  return result.meals || result.drinks || [];
};
