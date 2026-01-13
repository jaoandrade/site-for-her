# 🚀 Guia Passo a Passo: GitHub e Domínio

Este guia vai te ajudar a fazer upload do site para o GitHub e depois configurar um domínio personalizado.

---

## 📋 Parte 1: Upload para GitHub

### 1.1. Preparar o Repositório

1. **Verificar se já existe repositório Git:**
   ```bash
   git status
   ```
   - Se der erro "not a git repository", continue com os próximos passos
   - Se já for um repositório, pode pular para a seção 1.3

2. **Inicializar repositório Git (se necessário):**
   ```bash
   git init
   ```

3. **Verificar o arquivo .gitignore:**
   - Certifique-se de que `.gitignore` existe e contém:
     - `node_modules/`
     - `dist/`
     - `.env`
     - `.env.local`
   - O arquivo já deve estar configurado corretamente

### 1.2. Criar Conta no GitHub (se não tiver)

1. Acesse: https://github.com
2. Clique em "Sign up"
3. Preencha os dados e crie sua conta
4. Verifique seu email

### 1.3. Criar Repositório no GitHub

1. **No GitHub:**
   - Clique no botão "+" no canto superior direito
   - Selecione "New repository"

2. **Configurações do repositório:**
   - **Repository name**: `site-for-her` (ou o nome que preferir)
   - **Description**: "Romantic website for my sweetheart 💕"
   - **Visibility**: 
     - ⚠️ **Private** (recomendado para manter privado)
     - Ou **Public** (se quiser compartilhar)
   - **NÃO marque** "Add a README file" (já temos um)
   - **NÃO adicione** .gitignore ou license (já temos)
   - Clique em "Create repository"

### 1.4. Fazer Upload dos Arquivos

1. **Adicionar todos os arquivos:**
   ```bash
   git add .
   ```

2. **Fazer o primeiro commit:**
   ```bash
   git commit -m "Initial commit: Site For Her 💕"
   ```

3. **Renomear branch principal (se necessário):**
   ```bash
   git branch -M main
   ```

4. **Conectar ao repositório remoto:**
   - No GitHub, copie a URL do repositório (botão verde "Code")
   - Execute (substitua `SEU_USUARIO` e `NOME_DO_REPOSITORIO`):
   ```bash
   git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
   ```
   - Exemplo: `git remote add origin https://github.com/johndoe/site-for-her.git`

5. **Enviar para o GitHub:**
   ```bash
   git push -u origin main
   ```

6. **Fazer login:**
   - Se solicitado, faça login no GitHub
   - Ou use um Personal Access Token (PAT)
   - Para criar PAT: GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)

### 1.5. Verificar Upload

1. Acesse seu repositório no GitHub
2. Verifique se todos os arquivos foram enviados
3. ✅ **Pronto!** Seu código está no GitHub

---

## 🌐 Parte 2: Deploy e Domínio

Você tem várias opções para hospedar o site. Vou mostrar as mais populares:

---

### Opção A: Vercel (RECOMENDADO - Mais fácil) ⭐

#### 2A.1. Fazer Build do Projeto

1. **Antes de fazer deploy, configure as variáveis de ambiente:**
   - O arquivo `.env` NÃO será enviado para o GitHub (está no .gitignore)
   - Você precisará configurar no Vercel depois

2. **Testar o build localmente (opcional):**
   ```bash
   npm run build
   ```
   - Isso cria a pasta `dist/` com os arquivos prontos para produção

#### 2A.2. Deploy no Vercel

1. **Acesse:** https://vercel.com
2. **Crie uma conta:**
   - Clique em "Sign Up"
   - Escolha "Continue with GitHub"
   - Autorize o Vercel

3. **Importar projeto:**
   - Clique em "Add New..." > "Project"
   - Selecione o repositório `site-for-her`
   - Clique em "Import"

4. **Configurações do projeto:**
   - **Framework Preset**: Vite (deve detectar automaticamente)
   - **Root Directory**: `./` (deixe como está)
   - **Build Command**: `npm run build` (já está configurado)
   - **Output Directory**: `dist` (já está configurado)

5. **Configurar variáveis de ambiente:**
   - Na seção "Environment Variables", adicione:
     - `VITE_SUPABASE_URL` = `https://vizlfacxrfgqfpxkitum.supabase.co`
     - `VITE_SUPABASE_ANON_KEY` = (sua chave anon do Supabase)
   - Clique em "Add" para cada uma

6. **Deploy:**
   - Clique em "Deploy"
   - Aguarde alguns minutos
   - ✅ Seu site estará online em `https://seu-site.vercel.app`

#### 2A.3. Configurar Domínio Personalizado no Vercel

1. **No dashboard do Vercel:**
   - Vá para "Settings" > "Domains"

2. **Adicionar domínio:**
   - Digite seu domínio (ex: `meusite.com`)
   - Clique em "Add"

3. **Configurar DNS:**
   - O Vercel mostrará instruções específicas
   - Geralmente você precisa adicionar um registro CNAME no seu provedor de DNS
   - **Exemplo de configuração DNS:**
     - Tipo: `CNAME`
     - Nome: `@` ou `www`
     - Valor: `cname.vercel-dns.com`
   - ⏱️ Pode levar até 24 horas para propagar

4. **Aguardar propagação:**
   - Após configurar o DNS, aguarde alguns minutos/horas
   - O Vercel detectará automaticamente

5. ✅ **Pronto!** Seu site estará disponível no seu domínio personalizado

---

### Opção B: Netlify (Alternativa fácil)

#### 2B.1. Deploy no Netlify

1. **Acesse:** https://netlify.com
2. **Crie uma conta** (pode usar GitHub)
3. **Importar projeto:**
   - "Add new site" > "Import an existing project"
   - Selecione seu repositório do GitHub
4. **Configurações:**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Environment variables**: Adicione `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
5. **Deploy:**
   - Clique em "Deploy site"
   - ✅ Seu site estará em `https://seu-site.netlify.app`

#### 2B.2. Domínio Personalizado no Netlify

1. **Settings** > **Domain management** > **Add custom domain**
2. Digite seu domínio
3. Siga as instruções de DNS
4. Aguarde propagação

---

### Opção C: GitHub Pages (Gratuito, mas mais limitado)

⚠️ **Nota**: GitHub Pages não suporta variáveis de ambiente nativamente. Você precisaria hardcodear ou usar outra solução.

1. **Instalar gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Adicionar script no package.json:**
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

4. **Configurar no GitHub:**
   - Settings > Pages
   - Source: gh-pages branch
   - ✅ Site em `https://SEU_USUARIO.github.io/site-for-her`

---

## 🔧 Troubleshooting

### Problemas comuns:

1. **"Build failed" no Vercel/Netlify:**
   - Verifique se todas as dependências estão no `package.json`
   - Certifique-se de que `npm run build` funciona localmente
   - Verifique os logs de build na plataforma

2. **Variáveis de ambiente não funcionam:**
   - Certifique-se de que as variáveis estão configuradas na plataforma
   - Reinicie o deploy após adicionar variáveis
   - Verifique se os nomes estão corretos (começam com `VITE_`)

3. **Domínio não funciona:**
   - Verifique as configurações de DNS
   - Aguarde até 24-48 horas para propagação
   - Use ferramentas como `whatsmydns.net` para verificar

4. **Erro 404 nas rotas:**
   - Para Vite/React Router, configure redirects no Vercel/Netlify
   - Crie `vercel.json` ou `netlify.toml` com regras de redirect

---

## 📝 Resumo Rápido

### GitHub:
1. `git init` (se necessário)
2. `git add .`
3. `git commit -m "Initial commit"`
4. Criar repositório no GitHub
5. `git remote add origin [URL]`
6. `git push -u origin main`

### Deploy (Vercel - Recomendado):
1. Criar conta no Vercel
2. Importar repositório do GitHub
3. Configurar variáveis de ambiente
4. Deploy automático
5. Adicionar domínio personalizado

---

## 🎉 Pronto!

Depois de seguir estes passos, seu site estará online e acessível pelo seu domínio personalizado!

**Dica:** O Vercel faz deploy automático sempre que você fizer `git push` no GitHub. Muito prático! 🚀

---

**Precisa de ajuda?** Verifique os logs de build na plataforma escolhida ou consulte a documentação oficial.
