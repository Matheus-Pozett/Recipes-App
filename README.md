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
