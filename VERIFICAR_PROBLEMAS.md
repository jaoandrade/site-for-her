# 🔍 Verificar Problemas - Site Vazio

Se o localhost:3000 está mostrando uma tela em branco, siga estes passos:

## 1. Verificar Console do Navegador

1. Abra o navegador (Chrome/Edge/Firefox)
2. Pressione **F12** para abrir as ferramentas de desenvolvedor
3. Vá para a aba **"Console"**
4. Veja se há erros em vermelho
5. **Copie e me envie os erros** se houver

## 2. Verificar se o Servidor Está Rodando

No terminal, você deve ver algo como:
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:3000/
```

Se não estiver rodando:
```bash
npm run dev
```

## 3. Limpar Cache e Reinstalar

```bash
# Parar o servidor (Ctrl+C)

# Limpar node_modules
Remove-Item -Recurse -Force node_modules

# Limpar cache do npm
npm cache clean --force

# Reinstalar dependências
npm install

# Iniciar novamente
npm run dev
```

## 4. Verificar Porta

Se a porta 3000 estiver ocupada, o Vite pode usar outra porta (3001, 3002, etc.)
- Veja no terminal qual porta está sendo usada
- Ou force a porta 3000 no `vite.config.js`

## 5. Verificar Arquivos

Certifique-se de que estes arquivos existem:
- ✅ `src/main.jsx`
- ✅ `src/App.jsx`
- ✅ `src/index.css`
- ✅ `index.html`
- ✅ `package.json`

## 6. Erro Comum: "Cannot find module"

Se aparecer erro de módulo não encontrado:
```bash
npm install
```

## 7. Verificar HTML

Abra `index.html` e certifique-se de que tem:
```html
<div id="root"></div>
```

---

**Me envie os erros do console do navegador (F12) para eu ajudar melhor!** 🔧
