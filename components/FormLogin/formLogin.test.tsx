import { render, screen } from '@testing-library/react';
import { FormLogin } from '.';
import userEvent from '@testing-library/user-event';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Teste de integração: Componente FormLogin', () => {
  test('Deve renderizar os campos de email, senha e o botão de login', () => {
    render(<FormLogin />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const button = screen.getByRole('button', { name: /enter/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Deve atualizar o valor do input de email ao digitar', async () => {
    render(<FormLogin />);

    const emailInput = screen.getByPlaceholderText('Email');

    await userEvent.type(emailInput, 'test@test.com');

    expect(emailInput).toHaveValue('test@test.com');
  });

  test('Deve atualizar o valor do input de senha ao digitar', async () => {
    render(<FormLogin />);

    const passwordInput = screen.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, 'Test1@test');

    expect(passwordInput).toHaveValue('Test1@test');
  });

  test('Deve exibir mensagem de erro ao inserir um email inválido', async () => {
    render(<FormLogin />);

    const emailInput = screen.getByPlaceholderText('Email');

    await userEvent.type(emailInput, 'emailinvalido');

    const errorMessage = await screen.findByText(/Email inválido/i);

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(/email inválido/i);
  });

  test('Deve exibir erro quando a senha tiver menos de 8 caracteres', async () => {
    render(<FormLogin />);

    const passwordInput = screen.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, 'senha');

    const errorMessage = await screen.findByText(
      /A senha deve ter no mínimo 8 caracteres/i
    );

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(
      /A senha deve ter no mínimo 8 caracteres/i
    );
  });

  test('Deve exibir erro quando a senha não contiver letra maiúscula', async () => {
    render(<FormLogin />);

    const passwordInput = screen.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, 'senha1234');

    const errorMessage = await screen.findByText(
      /A senha deve conter pelo menos uma letra maiúscula/i
    );

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(
      /A senha deve conter pelo menos uma letra maiúscula/i
    );
  });

  test('Deve exibir erro quando a senha não contiver número', async () => {
    render(<FormLogin />);

    const passwordInput = screen.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, 'Senhateste');

    const errorMessage = await screen.findByText(
      /A senha deve conter pelo menos um número/i
    );

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(
      /A senha deve conter pelo menos um número/i
    );
  });

  test('Deve exibir erro quando a senha não contiver caractere especial', async () => {
    render(<FormLogin />);

    const passwordInput = screen.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, 'Senhateste1');

    const errorMessage = await screen.findByText(
      /A senha deve conter pelo menos um caractere especial/i
    );

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(
      /A senha deve conter pelo menos um caractere especial/i
    );
  });

  test('Deve manter o botão desabilitado se o formulário for inválido', () => {
    render(<FormLogin />);

    const button = screen.getByRole('button', { name: /Enter/i });

    expect(button).toBeDisabled();
  });

  test('Deve habilitar o botão quando o formulário for preenchido corretamente', async () => {
    render(<FormLogin />);

    const button = screen.getByRole('button', { name: /Enter/i });
    const passwordInput = screen.getByPlaceholderText('Password');
    const emailInput = screen.getByPlaceholderText('Email');

    await userEvent.type(emailInput, 'test@test.com');
    await userEvent.type(passwordInput, 'Senha@teste1');

    expect(button).not.toBeDisabled();
  });
});
