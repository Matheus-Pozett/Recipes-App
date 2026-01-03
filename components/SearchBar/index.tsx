import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';

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

  const handleOnSubmit = (data: SearchFormType) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <input type="text" {...register('search')} />
      <div>
        <div>
          <input type="radio" value="ingredient" {...register('searchType')} />
          <label>Ingredient</label>
        </div>

        <div>
          <input type="radio" value="name" {...register('searchType')} />
          <label>Name</label>
        </div>

        <div>
          <input type="radio" value="firstLetter" {...register('searchType')} />
          <label>First Letter</label>
        </div>
      </div>
      <button>SEARCH</button>
    </form>
  );
}
