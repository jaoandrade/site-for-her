# 📚 Guia Passo a Passo Completo - Site For Her

Este guia vai te levar do zero até ter o site funcionando completamente, com todas as funcionalidades ativas.

---

## 📋 Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Instalação Inicial do Projeto](#instalação-inicial-do-projeto)
3. [Configuração do Supabase](#configuração-do-supabase)
4. [Configuração do Projeto](#configuração-do-projeto)
5. [Adicionar Músicas (Opcional)](#adicionar-músicas-opcional)
6. [Personalizar Mensagens](#personalizar-mensagens)
7. [Testar o Site](#testar-o-site)
8. [Deploy (Publicar na Internet)](#deploy-publicar-na-internet)
9. [Troubleshooting (Solução de Problemas)](#troubleshooting-solução-de-problemas)

---

## 1. Pré-requisitos

### O que você precisa ter instalado:

#### ✅ Node.js
- **O que é**: Ambiente de execução JavaScript
- **Como instalar**:
  1. Acesse: https://nodejs.org/
  2. Baixe a versão LTS (Long Term Support) - recomendada
  3. Execute o instalador
  4. Siga as instruções (Next, Next, Install)
  5. **Verificar instalação**: Abra o Terminal/Prompt de Comando e digite:
     ```bash
     node --version
     ```
     Deve aparecer algo como: `v18.17.0` ou superior

#### ✅ npm (vem com Node.js)
- **Verificar instalação**:
  ```bash
  npm --version
  ```
  Deve aparecer algo como: `9.6.7` ou superior

#### ✅ Editor de Código (Opcional mas recomendado)
- **Visual Studio Code**: https://code.visualstudio.com/
- Ou qualquer editor de texto que você preferir

#### ✅ Conta no Supabase (Gratuita)
- Vamos criar durante o guia

---

## 2. Instalação Inicial do Projeto

### Passo 2.1: Abrir o Terminal

**Windows:**
- Pressione `Win + R`
- Digite `cmd` ou `powershell`
- Pressione Enter
- Ou use o Terminal integrado do VS Code

**Mac:**
- Pressione `Cmd + Espaço`
- Digite `Terminal`
- Pressione Enter

**Linux:**
- Pressione `Ctrl + Alt + T`

### Passo 2.2: Navegar até a Pasta do Projeto

```bash
cd C:\SiteForHer
```

**Nota**: Se você salvou o projeto em outro lugar, ajuste o caminho.

### Passo 2.3: Instalar Dependências

```bash
npm install
```

**O que isso faz?**
- Baixa todas as bibliotecas necessárias (React, Supabase, etc.)
- Cria a pasta `node_modules`
- Pode levar 1-3 minutos na primeira vez

**O que você verá:**
```
added 234 packages, and audited 235 packages in 45s
```

✅ **Se aparecer isso, está tudo certo!**

---

## 3. Configuração do Supabase

O Supabase é onde vamos armazenar as fotos do álbum. É gratuito e muito fácil de configurar!

### Passo 3.1: Criar Conta no Supabase

1. Acesse: https://supabase.com/
2. Clique em **"Start your project"** ou **"Sign Up"**
3. Escolha uma forma de login:
   - GitHub (recomendado)
   - Email
   - Google
4. Complete o cadastro

### Passo 3.2: Criar um Novo Projeto

1. Após fazer login, você verá o Dashboard
2. Clique em **"New Project"** (botão verde)
3. Preencha os dados:

   **Organization:**
   - Se for seu primeiro projeto, crie uma organização
   - Dê um nome (ex: "Meus Projetos")

   **Project Details:**
   - **Name**: `site-for-her` (ou qualquer nome)
   - **Database Password**: Crie uma senha forte (anote em algum lugar!)
     - Exemplo: `MinhaSenh@SuperSegura123`
   - **Region**: Escolha a mais próxima de você
     - Para Brasil: `South America (São Paulo)`
   - **Pricing Plan**: **Free** (gratuito)

4. Clique em **"Create new project"**
5. ⏳ Aguarde 1-2 minutos enquanto o Supabase cria seu projeto

### Passo 3.3: Obter as Credenciais

1. No Dashboard do Supabase, clique no ícone de **⚙️ Settings** (canto inferior esquerdo)
2. Clique em **"API"** no menu lateral
3. Você verá duas informações importantes:

   **Project URL:**
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```

   **anon public key:**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHh4eHgiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NzE5MjEyMCwiZXhwIjoxOTYyNzY4MTIwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

4. **Copie ambos** e guarde em um lugar seguro (vamos usar agora!)

### Passo 3.4: Criar a Tabela no Banco de Dados

1. No menu lateral esquerdo, clique em **"Table Editor"**
2. Clique em **"New Table"**
3. Configure:
   - **Name**: `album`
   - **Description**: `Photo album table` (opcional)
4. Clique em **"Save"**
5. Agora vamos adicionar as colunas. Clique em **"Add Column"** para cada uma:

   **Coluna 1:**
   - **Name**: `id`
   - **Type**: `int8` (bigint)
   - ✅ Marque **"Is Primary Key"**
   - ✅ Marque **"Is Identity"** (auto-increment)

   **Coluna 2:**
   - **Name**: `url`
   - **Type**: `text`
   - ✅ Marque **"Is Nullable"** como **NÃO** (desmarque)

   **Coluna 3:**
   - **Name**: `file_path`
   - **Type**: `text`
   - ✅ Marque **"Is Nullable"** como **NÃO** (desmarque)

   **Coluna 4:**
   - **Name**: `comment`
   - **Type**: `text`
   - ✅ Marque **"Is Nullable"** (pode ser vazio)

   **Coluna 5:**
   - **Name**: `created_at`
   - **Type**: `timestamptz`
   - ✅ Marque **"Is Nullable"** como **NÃO** (desmarque)
   - **Default Value**: `now()`

6. Clique em **"Save"** para salvar a tabela

### Passo 3.5: Configurar Storage (Para as Fotos)

1. No menu lateral, clique em **"Storage"**
2. Clique em **"New Bucket"**
3. Configure:
   - **Name**: `album`
   - ✅ Marque **"Public bucket"** (importante!)
4. Clique em **"Create bucket"**

### Passo 3.6: Configurar Políticas de Segurança (RLS)

#### Para a Tabela (Database):

1. No menu lateral, clique em **"Table Editor"**
2. Clique na tabela **"album"**
3. Clique na aba **"Policies"** (no topo)
4. Clique em **"New Policy"**
5. Selecione **"Create a policy from scratch"**
6. Configure:
   - **Policy Name**: `Allow public read`
   - **Allowed Operation**: ✅ **SELECT**
   - **Policy Definition**: 
     ```sql
     true
     ```
   - Clique em **"Review"** e depois **"Save policy"**

7. Crie outra política:
   - **Policy Name**: `Allow public insert`
   - **Allowed Operation**: ✅ **INSERT**
   - **Policy Definition**: 
     ```sql
     true
     ```
   - Clique em **"Review"** e depois **"Save policy"**

#### Para o Storage:

1. No menu lateral, clique em **"Storage"**
2. Clique no bucket **"album"**
3. Clique na aba **"Policies"**
4. Clique em **"New Policy"**
5. Selecione **"Create a policy from scratch"**
6. Configure:
   - **Policy Name**: `Allow public read`
   - **Allowed Operation**: ✅ **SELECT**
   - **Policy Definition**: 
     ```sql
     true
     ```
   - Clique em **"Review"** e depois **"Save policy"**

7. Crie outra política:
   - **Policy Name**: `Allow public upload`
   - **Allowed Operation**: ✅ **INSERT**
   - **Policy Definition**: 
     ```sql
     true
     ```
   - Clique em **"Review"** e depois **"Save policy"**

✅ **Pronto! Supabase configurado!**

---

## 4. Configuração do Projeto

### Passo 4.1: Criar Arquivo de Variáveis de Ambiente

1. Na raiz do projeto (`C:\SiteForHer`), crie um arquivo chamado `.env.local`
   - **Importante**: O arquivo deve começar com ponto (.)
   - **No Windows**: Pode ser necessário criar como `.env.local.` (com ponto no final) e depois renomear

2. Abra o arquivo `.env.local` e adicione:

```env
VITE_SUPABASE_URL=https://seu-projeto-id.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

**Substitua:**
- `https://seu-projeto-id.supabase.co` pela **Project URL** que você copiou
- `sua-chave-anon-aqui` pela **anon public key** que você copiou

**Exemplo real:**
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NzE5MjEyMCwiZXhwIjoxOTYyNzY4MTIwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

3. **Salve o arquivo**

⚠️ **IMPORTANTE**: 
- Nunca compartilhe este arquivo publicamente
- Ele já está no `.gitignore` (não será enviado para Git)

### Passo 4.2: Verificar se Está Tudo Certo

1. Abra o arquivo `src/supabase/config.js`
2. Ele deve estar assim (não precisa editar, só verificar):

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'
```

✅ **Está correto!**

---

## 5. Adicionar Músicas (Opcional)

### Passo 5.1: Preparar os Arquivos de Áudio

1. Tenha suas músicas românticas em formato MP3
2. Crie uma pasta `public/music/` na raiz do projeto:
   ```bash
   mkdir public\music
   ```
3. Copie suas músicas para essa pasta:
   - Exemplo: `public/music/romantic-song-1.mp3`
   - Exemplo: `public/music/romantic-song-2.mp3`

### Passo 5.2: Atualizar a Playlist

1. Abra o arquivo `src/components/MusicPlayer.jsx`
2. Encontre a seção `playlist` (por volta da linha 10)
3. Atualize com suas músicas:

```javascript
const playlist = [
  {
    name: "Nome da Música 1",
    url: "/music/romantic-song-1.mp3"
  },
  {
    name: "Nome da Música 2",
    url: "/music/romantic-song-2.mp3"
  },
  {
    name: "Nome da Música 3",
    url: "/music/romantic-song-3.mp3"
  }
]
```

4. **Salve o arquivo**

💡 **Dica**: Você pode usar URLs de música online também, mas arquivos locais são mais confiáveis.

---

## 6. Personalizar Mensagens

### Passo 6.1: Personalizar Mensagem Romântica

1. Abra o arquivo `src/pages/HappyScreen.jsx`
2. Encontre a variável `romanticMessage` (por volta da linha 7)
3. Edite a mensagem como quiser:

```javascript
const romanticMessage = `Sua mensagem personalizada aqui! 💕

Pode ter várias linhas.

E emojis também! ❤️✨`
```

4. **Salve o arquivo**

### Passo 6.2: Personalizar Cores (Opcional)

1. Abra o arquivo `src/index.css`
2. Encontre a seção `:root` (por volta da linha 6)
3. Altere as cores:

```css
:root {
  --color-pink: #ffb3d9;        /* Rosa principal */
  --color-purple: #d9b3ff;      /* Roxo */
  --color-blue: #b3d9ff;         /* Azul */
  /* ... */
}
```

4. **Salve o arquivo**

---

## 7. Testar o Site

### Passo 7.1: Iniciar o Servidor de Desenvolvimento

No terminal, na pasta do projeto, execute:

```bash
npm run dev
```

**O que você verá:**
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Passo 7.2: Abrir no Navegador

1. O navegador deve abrir automaticamente
2. Se não abrir, acesse manualmente: `http://localhost:3000`

### Passo 7.3: Testar Cada Funcionalidade

#### ✅ Página Inicial (Love Request)
- [ ] Verifica se aparece "I love you"
- [ ] Verifica se aparece "You love me back?"
- [ ] Verifica se há chuva de emojis (❤️ 💕 😘 🐱 ✨)
- [ ] Clica no botão "YES" - deve ir para tela feliz
- [ ] Tenta clicar no botão "NO" - ele deve fugir! 😄

#### ✅ Tela Feliz
- [ ] Verifica se aparece a mensagem romântica
- [ ] Clica em "Continue" - deve ir para o Hub

#### ✅ Hub Principal
- [ ] Verifica se aparecem 3 botões: Album, Love Wars, WIP
- [ ] Clica em "Album" - deve abrir o álbum
- [ ] Clica em "Love Wars" - deve abrir o jogo
- [ ] Verifica se o botão WIP está desabilitado

#### ✅ Álbum
- [ ] Verifica se não aparece aviso de Supabase não configurado
- [ ] Clica em "Add Photo"
- [ ] Seleciona uma imagem
- [ ] Adiciona um comentário (opcional)
- [ ] Verifica se a imagem aparece no grid
- [ ] Clica na imagem - deve abrir em tela cheia
- [ ] Fecha o modal

#### ✅ Love Wars (Jogo)
- [ ] Verifica se o jogo carrega
- [ ] Testa movimento com setas do teclado (← →)
- [ ] Verifica se os beijos (💋) são disparados automaticamente
- [ ] Verifica se os corações (❤️) aparecem como inimigos
- [ ] Testa pausar o jogo
- [ ] Verifica se o score aumenta ao acertar inimigos

#### ✅ Music Player
- [ ] Verifica se aparece o player no canto inferior direito
- [ ] Clica em qualquer lugar da página (para ativar interação)
- [ ] Clica em Play (▶️) - música deve tocar
- [ ] Clica em Pause (⏸️) - música deve pausar

### Passo 7.4: Testar no Mobile

1. No navegador, abra as ferramentas de desenvolvedor:
   - **Chrome/Edge**: `F12` ou `Ctrl+Shift+I`
   - **Firefox**: `F12` ou `Ctrl+Shift+I`
2. Clique no ícone de dispositivo móvel (ou pressione `Ctrl+Shift+M`)
3. Selecione "iPhone 12 Pro" ou outro dispositivo
4. Teste todas as funcionalidades novamente
5. Especialmente:
   - [ ] Touch no botão "NO" - deve fugir
   - [ ] Touch no jogo Love Wars - deve mover o gato
   - [ ] Layout responsivo - tudo deve caber na tela

---

## 8. Deploy (Publicar na Internet)

### Opção 1: Vercel (Recomendado - Mais Fácil)

#### Passo 8.1: Preparar o Projeto

1. Certifique-se de que o arquivo `.env.local` está configurado
2. No Vercel, você precisará adicionar as variáveis de ambiente também

#### Passo 8.2: Criar Conta na Vercel

1. Acesse: https://vercel.com/
2. Clique em **"Sign Up"**
3. Faça login com GitHub (recomendado) ou email

#### Passo 8.3: Conectar Projeto

1. No Dashboard da Vercel, clique em **"Add New Project"**
2. Se você tem o projeto no GitHub:
   - Selecione o repositório
   - Clique em **"Import"**
3. Se não tem no GitHub:
   - Clique em **"Deploy"**
   - Arraste a pasta do projeto
   - Ou use a CLI da Vercel

#### Passo 8.4: Configurar Variáveis de Ambiente

1. Na página de configuração do projeto, vá em **"Environment Variables"**
2. Adicione:
   - **Name**: `VITE_SUPABASE_URL`
   - **Value**: Sua URL do Supabase
3. Adicione:
   - **Name**: `VITE_SUPABASE_ANON_KEY`
   - **Value**: Sua chave anon do Supabase
4. Clique em **"Deploy"**

#### Passo 8.5: Aguardar Deploy

⏳ Aguarde 1-2 minutos. Você receberá uma URL como:
```
https://site-for-her.vercel.app
```

✅ **Pronto! Seu site está no ar!**

### Opção 2: Netlify

1. Acesse: https://netlify.com/
2. Faça login
3. Arraste a pasta do projeto ou conecte com GitHub
4. Configure as variáveis de ambiente (mesmas do Supabase)
5. Deploy automático!

### Opção 3: GitHub Pages (Mais Complexo)

Requer configuração adicional. Veja documentação do Vite.

---

## 9. Troubleshooting (Solução de Problemas)

### ❌ Problema: "npm install" não funciona

**Solução:**
```bash
# Limpar cache
npm cache clean --force

# Tentar novamente
npm install
```

### ❌ Problema: "Cannot find module '@supabase/supabase-js'"

**Solução:**
```bash
npm install @supabase/supabase-js
```

### ❌ Problema: Site não carrega, erro no console sobre Supabase

**Solução:**
1. Verifique se o arquivo `.env.local` existe
2. Verifique se as variáveis estão corretas (sem espaços extras)
3. Reinicie o servidor:
   ```bash
   # Pare o servidor (Ctrl+C)
   npm run dev
   ```

### ❌ Problema: Não consigo fazer upload de fotos

**Solução:**
1. Verifique se criou o bucket "album" no Supabase Storage
2. Verifique se o bucket está marcado como "Public"
3. Verifique se criou as políticas (policies) de INSERT e SELECT
4. Verifique se a tabela "album" existe no banco de dados
5. Verifique se as colunas estão corretas

### ❌ Problema: Música não toca

**Solução:**
1. Clique em qualquer lugar da página primeiro (requer interação do usuário)
2. Verifique se os arquivos de música estão em `public/music/`
3. Verifique se os nomes dos arquivos estão corretos no `MusicPlayer.jsx`
4. Verifique o console do navegador (F12) para erros

### ❌ Problema: Botão "NO" não foge

**Solução:**
1. Verifique se está clicando/tocando no botão
2. Abra o console (F12) e veja se há erros
3. Tente recarregar a página

### ❌ Problema: Jogo não funciona

**Solução:**
1. Verifique se o canvas está visível
2. Tente redimensionar a janela
3. Verifique o console para erros
4. Certifique-se de que está usando um navegador moderno (Chrome, Firefox, Edge, Safari)

### ❌ Problema: Layout quebrado no mobile

**Solução:**
1. Verifique se a meta tag viewport está no `index.html`
2. Limpe o cache do navegador
3. Verifique se está usando as últimas versões dos arquivos

---

## 🎉 Parabéns!

Se você chegou até aqui e tudo está funcionando, você tem um site romântico completo e funcional! 💕

### Próximos Passos (Opcional):

- ✨ Adicionar mais músicas à playlist
- 📸 Adicionar mais fotos ao álbum
- 🎨 Personalizar ainda mais as cores
- 💬 Adicionar mais funcionalidades (você pode expandir!)

---

## 📞 Precisa de Ajuda?

- **Documentação do Supabase**: https://supabase.com/docs
- **Documentação do React**: https://react.dev
- **Documentação do Vite**: https://vitejs.dev

---

**Feito com ❤️ para alguém especial** 💕🐱✨
