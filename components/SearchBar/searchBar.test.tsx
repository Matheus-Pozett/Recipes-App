import { render, screen, waitFor } from '@testing-library/react';
import { SearchBar } from '.';
import userEvent from '@testing-library/user-event';
import { fetchRecipes } from '@/services/api';
import toast from 'react-hot-toast';

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  usePathname: jest.fn().mockReturnValue('/meals'),
}));
jest.mock('@/services/api');
jest.mock('react-hot-toast');

describe('Teste de integração: Componente SearchBar', () => {
  afterEach(() => {
    pushMock.mockClear();
    jest.clearAllMocks();
  });
  describe('Elementos estão na tela', () => {
    test('Input de busca', () => {
      render(<SearchBar />);
      const searchInput = screen.getByPlaceholderText(/Buscar receita/i);
      expect(searchInput).toBeInTheDocument();
    });

    test('Radio button de busca por ingrediente', () => {
      render(<SearchBar />);
      const ingredientRadio = screen.getByRole('radio', {
        name: /ingredient/i,
      });
      expect(ingredientRadio).toBeInTheDocument();
    });

    test('Radio button de busca por nome', () => {
      render(<SearchBar />);
      const nameRadio = screen.getByRole('radio', { name: /name/i });
      expect(nameRadio).toBeInTheDocument();
    });
    test('Radio button de busca pela primeira letra', () => {
      render(<SearchBar />);
      const firstLetterRadio = screen.getByRole('radio', {
        name: /first Letter/i,
      });
      expect(firstLetterRadio).toBeInTheDocument();
    });
    test('Botão de busca', () => {
      render(<SearchBar />);
      const searchButton = screen.getByRole('button', { name: /search/i });
      expect(searchButton).toBeInTheDocument();
    });
  });

  describe('É possivel interagir com os elementos', () => {
    test('Verifica se é possivel digitar no input', async () => {
      render(<SearchBar />);
      const searchInput = screen.getByPlaceholderText(/Buscar receita/i);
      await userEvent.type(searchInput, 'Bread');
      expect(searchInput).toHaveValue('Bread');
    });

    test('Verifica se é possivel selecionar radio Ingredient', async () => {
      render(<SearchBar />);
      const ingredientRadio = screen.getByRole('radio', {
        name: /ingredient/i,
      });
      await userEvent.click(ingredientRadio);

      expect(ingredientRadio).toBeChecked();
    });

    test('Verifica se é possivel selecionar radio Name', async () => {
      render(<SearchBar />);
      const nameRadio = screen.getByRole('radio', {
        name: /name/i,
      });
      await userEvent.click(nameRadio);

      expect(nameRadio).toBeChecked();
    });

    test('Verifica se é possivel selecionar radio First Letter', async () => {
      render(<SearchBar />);
      const firstLetterRadio = screen.getByRole('radio', {
        name: /First Letter/i,
      });
      await userEvent.click(firstLetterRadio);

      expect(firstLetterRadio).toBeChecked();
    });
  });

  test('Deve impedir a busca e mostrar alerta se "First Letter" tiver mais de 1 caractere', async () => {
    render(<SearchBar />);
    const searchInput = screen.getByPlaceholderText(/Buscar receita/i);
    const firstLetterRadio = screen.getByRole('radio', {
      name: /First Letter/i,
    });
    const searchButton = screen.getByRole('button', { name: /search/i });

    await userEvent.type(searchInput, 'as');
    await userEvent.click(firstLetterRadio);
    await userEvent.click(searchButton);

    expect(toast.error).toHaveBeenCalledWith(
      'Sua busca deve conter apenas 1 (um) caractere'
    );

    expect(fetchRecipes).not.toHaveBeenCalled();
  });

  test('Deve mostrar toast de erro no caso de nenhuma receita encontrada', async () => {
    (fetchRecipes as jest.Mock).mockResolvedValue([]);
    render(<SearchBar />);
    const searchInput = screen.getByPlaceholderText(/Buscar receita/i);
    const nameRadio = screen.getByRole('radio', {
      name: /name/i,
    });
    const searchButton = screen.getByRole('button', { name: /search/i });

    await userEvent.type(searchInput, 'notFound');
    await userEvent.click(nameRadio);
    await userEvent.click(searchButton);

    expect(toast.error).toHaveBeenCalledWith(
      'Nenhuma receita encontrada para esses filtros.'
    );
  });

  test('Deve redirecionar para pagina de detalhes quando encontra apenas uma receita', async () => {
    const mealMock = [{ idMeal: '52771', strMeal: 'Spicy Arrabiata' }];

    (fetchRecipes as jest.Mock).mockResolvedValue(mealMock);

    render(<SearchBar />);
    const searchInput = screen.getByPlaceholderText(/Buscar receita/i);
    const nameRadio = screen.getByRole('radio', {
      name: /name/i,
    });
    const searchButton = screen.getByRole('button', { name: /search/i });

    await userEvent.type(searchInput, 'Spicy Arrabiata');
    await userEvent.click(nameRadio);
    await userEvent.click(searchButton);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/meals/52771');
    });
  });
});
