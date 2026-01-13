# 🔧 Troubleshooting - Erros do Supabase

## Erro: "Supabase not configured" ou "Failed to upload image"

### 1. Verificar se o arquivo `.env` existe

O arquivo `.env` deve estar na **raiz do projeto** (mesmo nível que `package.json`).

### 2. Verificar o conteúdo do `.env`

O arquivo deve conter exatamente:

```env
VITE_SUPABASE_URL=https://vizlfacxrfgqfpxkitum.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_vfmAvcaR_hOlBP_YoAtS_A_nSxOLeZ3
```

⚠️ **Importante**: 
- Não deve ter espaços antes ou depois do `=`
- Não deve ter aspas ao redor dos valores
- Cada variável em uma linha separada

### 3. Se a Publishable Key não funcionar

A chave fornecida (`sb_publishable_vfmAvcaR_hOlBP_YoAtS_A_nSxOLeZ3`) é uma **Publishable Key (Data API)**. 

Se você receber erros de autenticação, use a **Anon Key** tradicional:

1. Acesse o Supabase Dashboard: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá para **Settings** > **API**
4. Copie a **anon public** key (começa com `eyJhbGci...`)
5. Use essa chave no `.env`:

```env
VITE_SUPABASE_URL=https://vizlfacxrfgqfpxkitum.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci... (cole a chave completa aqui)
```

### 4. Reiniciar o servidor

Após criar ou modificar o `.env`:

1. Pare o servidor (Ctrl+C no terminal)
2. Execute `npm run dev` novamente
3. Recarregue a página no navegador (Ctrl+Shift+R ou Cmd+Shift+R)

### 5. Verificar no Console do Navegador

1. Abra o Console do Desenvolvedor (F12)
2. Vá para a aba **Console**
3. Procure por mensagens de erro relacionadas ao Supabase
4. Se aparecer "Supabase credentials not found", o `.env` não está sendo carregado

### 6. Verificar Storage Bucket

Certifique-se de que:
- O bucket `album-images` existe no Supabase Storage
- O bucket está marcado como **Public**
- As políticas de Storage estão configuradas (veja `SUPABASE_SETUP.md`)

### 7. Erros Comuns

**Erro: "JWT expired" ou "Invalid API key"**
- A chave está incorreta ou expirada
- Use a Anon Key do Dashboard em vez da Publishable Key

**Erro: "bucket not found"**
- O bucket `album-images` não existe
- Crie o bucket no Supabase Dashboard > Storage

**Erro: "permission denied"**
- As políticas de Storage não estão configuradas
- Configure as políticas conforme `SUPABASE_SETUP.md`

**Erro: "Supabase not configured"**
- O arquivo `.env` não existe ou está no lugar errado
- As variáveis não estão escritas corretamente
- O servidor não foi reiniciado após criar o `.env`

## 📞 Ainda com problemas?

1. Verifique se todas as tabelas foram criadas (execute `supabase_schema.sql`)
2. Verifique se o bucket `album-images` existe e está público
3. Verifique as políticas de Storage
4. Tente usar a Anon Key tradicional em vez da Publishable Key
