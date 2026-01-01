# Requisitos do Projeto - Recipes App

## 1 - TELA DE LOGIN

### Elementos da Interface

Crie todos os elementos que devem respeitar os atributos descritos no protótipo para a tela de login:

**Elementos obrigatórios:**

- Input de e-mail
- Input de senha
- Botão "Enter"

### Funcionalidade dos Inputs

Desenvolva a tela de maneira que a pessoa consiga escrever:

- Seu e-mail no input de email
- Sua senha no input de senha

### Validação do Formulário

O formulário só deve ser válido após o preenchimento correto:

**Regras de validação:**

- E-mail válido (formato correto)
- Senha com mais de 6 caracteres

**Comportamento do botão:**

- ❌ **Formulário inválido**: O botão de submeter deve estar desativado, contendo a propriedade `disabled`
- ✅ **Formulário válido**: O botão de submeter deve estar ativado, não contendo a propriedade `disabled`

### Salvar Dados no LocalStorage

Após a submissão do formulário:

- Salve no `localStorage` o e-mail da pessoa usuária na chave `user`

**Exemplo:**

```javascript
localStorage.setItem('user', JSON.stringify({ email: 'usuario@email.com' }));
```

### Redirecionamento

Após a submissão e validação com sucesso do login:

- Redirecione a pessoa usuária para a tela principal de receitas de comidas

---

### ⚠️ Observações Técnicas

- Todos os elementos devem respeitar os atributos descritos no protótipo
- A validação deve ser feita em tempo real
- O formulário só deve ser submetido quando válido
- O redirecionamento só ocorre após validação bem-sucedida

---

## 2 - HEADER

### Elementos do Header

O Header deve ter os seguintes elementos:

- **Ícone de perfil**: deverá estar sempre presente
- **Ícone de pesquisa**: deverá estar presente somente em algumas páginas
- **Título da página**: deverá estar sempre presente

### Configuração do Header por Rota

Cada página deverá ter seu próprio título, que será renderizado pelo header:

- Rota `/`: **não** tem header
- Rota `/meals`: tem o header com o título "Meals" e os ícones de perfil e pesquisa
- Rota `/drinks`: tem o header com o título "Drinks" e os ícones de perfil e pesquisa
- Rota `/meals/:id`: **não** tem header
- Rota `/drinks/:id`: **não** tem header
- Rota `/meals/:id/in-progress`: **não** tem header
- Rota `/drinks/:id/in-progress`: **não** tem header
- Rota `/profile`: tem o header com o título "Profile" e o ícone de perfil, mas **sem** o ícone de pesquisa
- Rota `/done-recipes`: tem o header com o título "Done Recipes" e o ícone de perfil, mas **sem** o ícone de pesquisa
- Rota `/favorite-recipes`: tem o header com o título "Favorite Recipes" e o ícone de perfil, mas **sem** o ícone de pesquisa

### Funcionalidade do Botão de Perfil

Redirecione a pessoa usuária para a tela de perfil ao clicar no botão de perfil:

- A rota muda para a tela de perfil `/profile`
- O título do header muda para "Profile"

### Funcionalidade do Botão de Busca

Desenvolva o botão de busca que, ao ser clicado, permita a visualização da barra de busca ou a esconda:

**Comportamento esperado:**

- ✅ Ao clicar no botão de busca pela **primeira vez**: a barra de busca aparece
- ❌ Ao clicar no botão de busca pela **segunda vez**: a barra de busca desaparece
