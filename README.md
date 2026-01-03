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

---

## 3 - BARRA DE BUSCA - HEADER

### Elementos da Barra de Busca

Implemente os elementos da barra de busca respeitando os atributos descritos no protótipo:

**Elementos obrigatórios:**

- Input de busca (search input)
- Radio button de busca por ingrediente (Ingredient)
- Radio button de busca por nome (Name)
- Radio button de busca pela primeira letra (First letter)
- Botão de busca (Search)

### Funcionalidade dos Radio Buttons

Implemente três radio buttons na barra de busca que, em conjunto com o input de busca, devem mudar a forma como serão filtradas as receitas após a pessoa usuária clicar no botão Search.

**APIs de Referência:**

- (https://www.themealdb.com/api.php)
- (https://www.thecocktaildb.com/api.php)

#### Busca por Ingrediente (Ingredient)

- Se o radio selecionado for `Ingredient`, a busca na API é feita corretamente pelo ingrediente
- **Endpoint para comidas**: `https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}`
- **Endpoint para bebidas**: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i={ingrediente}`

#### Busca por Nome (Name)

- Se o radio selecionado for `Name`, a busca na API é feita corretamente pelo nome
- **Endpoint para comidas**: `https://www.themealdb.com/api/json/v1/1/search.php?s={nome}`
- **Endpoint para bebidas**: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s={nome}`

#### Busca pela Primeira Letra (First letter)

- Se o radio selecionado for `First letter`, a busca na API é feita corretamente pela primeira letra
- **Endpoint para comidas**: `https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra}`
- **Endpoint para bebidas**: `https://www.thecocktaildb.com/api/json/v1/1/search.php?f={primeira-letra}`

⚠️ **Validação importante**: Se o radio selecionado for `First letter` e a busca na API for feita com mais de uma letra, deve-se exibir um `alert` com a mensagem:

```
"Your search must have only 1 (one) character"
```

### Seleção da API por Contexto

Busque na API de comidas caso a pessoa esteja na página de comidas (`/meals`) e na API de bebidas caso a pessoa esteja na página de bebidas (`/drinks`):

- **Tela de comidas** (`/meals`): utilizar endpoints do TheMealDB
- **Tela de bebidas** (`/drinks`): utilizar endpoints do TheCocktailDB

### Redirecionamento para Detalhes

Redirecione a pessoa usuária para a tela de detalhes da receita caso apenas uma receita seja encontrada:

**Comportamento esperado:**

- Se apenas **uma comida** for encontrada: ir para sua rota de detalhes `/meals/:id`
- Se apenas **uma bebida** for encontrada: ir para sua rota de detalhes `/drinks/:id`

💡 O ID da receita deve constar na URL
