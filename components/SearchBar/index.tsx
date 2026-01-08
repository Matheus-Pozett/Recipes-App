import { fetchRecipes } from '@/services/api';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type SearchFormType = {
  search: string;
  searchType: string;
};

export function SearchBar() {
  const { register, handleSubmit } = useForm<SearchFormType>({
    defaultValues: {
      searchType: 'ingredient',
    },
  });

  const path = usePathname();
  const router = useRouter();

  const handleOnSubmit = async (data: SearchFormType) => {
    if (data.searchType === 'firstLetter' && data.search.length !== 1) {
      toast.error('Sua busca deve conter apenas 1 (um) caractere');
      return;
    }

    const recipes = await fetchRecipes(path, data.search, data.searchType);

    if (!recipes || recipes.length === 0) {
      toast.error('Nenhuma receita encontrada para esses filtros.');
      return;
    }

    if (recipes.length === 1) {
      const recipe = recipes[0];
      let id = '';

      if ('idMeal' in recipe) {
        id = recipe.idMeal;
        router.push(`/meals/${id}`);
      } else {
        id = recipe.idDrink;
        router.push(`/drinks/${id}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <input type="text" placeholder="Buscar receita" {...register('search')} />
      <div>
        <div>
          <input
            type="radio"
            value="ingredient"
            id="ingredient"
            {...register('searchType')}
          />
          <label htmlFor="ingredient">Ingredient</label>
        </div>

        <div>
          <input
            type="radio"
            value="name"
            id="name"
            {...register('searchType')}
          />
          <label htmlFor="name">Name</label>
        </div>

        <div>
          <input
            type="radio"
            value="firstLetter"
            id="firstLetter"
            {...register('searchType')}
          />
          <label htmlFor="firstLetter">First Letter</label>
        </div>
      </div>
      <button>SEARCH</button>
    </form>
  );
}
