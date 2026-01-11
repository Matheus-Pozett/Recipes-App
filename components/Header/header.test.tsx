import { render, screen } from '@testing-library/react';
import { Header } from '.';
import userEvent from '@testing-library/user-event';

jest.mock('next/navigation', () => ({
  usePathname: () => '/meals',
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Teste de integração: Componente Header', () => {
  describe('Elementos são renderizados', () => {
    test('Deve renderizar imagem logo do site', () => {
      render(<Header />);

      const logo = screen.getByRole('link', { name: /logo do site/i });

      expect(logo).toBeInTheDocument();
    });

    test('Deve renderizar imagem com nome do site', () => {
      render(<Header />);

      const name = screen.getByAltText('Nome do site');

      expect(name).toBeInTheDocument();
    });

    test('Deve renderizar botão de pesquisa', () => {
      render(<Header />);

      const buttonSearch = screen.getByRole('button', {
        name: /botão de pesquisa/i,
      });

      expect(buttonSearch).toBeInTheDocument();
    });

    test('Deve renderizar botão de perfil', () => {
      render(<Header />);

      const buttonProfile = screen.getByRole('link', {
        name: /botão para perfil/i,
      });

      expect(buttonProfile).toBeInTheDocument();
    });
  });

  test('Deve mostrar searchBar ao clicar no botão de pesquisa', async () => {
    render(<Header />);

    const buttonSearch = screen.getByRole('button', {
      name: /botão de pesquisa/i,
    });

    await userEvent.click(buttonSearch);

    const form = screen.getByRole('search');

    expect(form).toBeInTheDocument();
  });

  test('Deve redirecionar para pagina de perfil ao clicar no icone Profile', async () => {
    render(<Header />);

    const buttonProfile = screen.getByRole('link', {
      name: /botão para perfil/i,
    });

    expect(buttonProfile).toHaveAttribute('href', '/profile');
  });
});
