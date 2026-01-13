# 🔧 Configuração Supabase

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
VITE_SUPABASE_URL=https://vizlfacxrfgqfpxkitum.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpemxmYWN4cmZncWZweGtpdHVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyOTg2NjAsImV4cCI6MjA4Mzg3NDY2MH0.PDuQk81KTeAkhxfnizt9GTzEhqpsiTNjfn_8LswEHlQ
```

## Configuração do Supabase

### 1. Executar SQL Schema

Execute o arquivo `supabase_schema.sql` no SQL Editor do Supabase Dashboard. Isso criará:
- Tabela `notes` para mensagens de amor
- Tabela `album_custom_images` para fotos customizadas do álbum
- Políticas RLS (Row Level Security) para acesso público

### 2. Criar Storage Bucket

1. Vá para **Storage** no Supabase Dashboard
2. Clique em **New bucket**
3. Nome: `album-images`
4. Marque como **Public bucket**
5. Clique em **Create bucket**

### 3. Configurar Storage Policies

No bucket `album-images`, vá para **Policies** e crie:

**Policy 1: Allow public read**
- Policy name: `Allow public read`
- Operation: `SELECT`
- Policy definition: `true`

**Policy 2: Allow public upload**
- Policy name: `Allow public upload`
- Operation: `INSERT`
- Policy definition: `true`

## Funcionalidades

### Album - Adicionar Fotos

- No final do álbum, há um gato clicável
- Ao clicar, abre um modal para:
  - Selecionar uma imagem
  - Adicionar um texto/comentário (opcional)
- A imagem é enviada para Supabase Storage
- Os dados são salvos na tabela `album_custom_images`
- Após o upload, a nova foto aparece antes do gato
- O gato sempre fica no final, permitindo adicionar mais fotos

## Credenciais

- **Project URL**: https://vizlfacxrfgqfpxkitum.supabase.co
- **Publishable Key (Data API)**: sb_publishable_vfmAvcaR_hOlBP_YoAtS_A_nSxOLeZ3

⚠️ **Nota**: Se a Publishable Key não funcionar, use a **Anon Key** do Supabase Dashboard:
1. Vá para **Settings** > **API**
2. Copie a **anon public** key (começa com `eyJhbGci...`)
3. Use essa chave no arquivo `.env` como `VITE_SUPABASE_ANON_KEY`
