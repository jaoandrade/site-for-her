# 🗑️ Como Remover Imagens da Base de Dados

Este guia explica como remover imagens que foram adicionadas ao álbum através do Supabase.

## 📋 Métodos para Remover Imagens

### Método 1: Via Supabase Dashboard (Recomendado)

1. **Acesse o Supabase Dashboard**
   - Vá para: https://supabase.com/dashboard
   - Faça login na sua conta
   - Selecione o projeto: `vizlfacxrfgqfpxkitum`

2. **Navegue até a Tabela**
   - No menu lateral, clique em **Table Editor**
   - Selecione a tabela `album_custom_images`

3. **Visualize as Imagens**
   - Você verá todas as imagens adicionadas com:
     - `id` (UUID único)
     - `image_url` (URL da imagem no Storage)
     - `text` (texto/comentário)
     - `created_at` (data de criação)

4. **Remover uma Imagem**
   - Clique na linha da imagem que deseja remover
   - Clique no botão **Delete** (ícone de lixeira) ou pressione `Delete`
   - Confirme a exclusão

5. **Remover Múltiplas Imagens**
   - Selecione múltiplas linhas usando `Ctrl+Click` (Windows) ou `Cmd+Click` (Mac)
   - Clique em **Delete** no menu superior
   - Confirme a exclusão

### Método 2: Via SQL Editor

1. **Acesse o SQL Editor**
   - No Supabase Dashboard, clique em **SQL Editor**

2. **Remover uma Imagem Específica**
   ```sql
   -- Substitua 'ID_DA_IMAGEM' pelo UUID da imagem que deseja remover
   DELETE FROM album_custom_images 
   WHERE id = 'ID_DA_IMAGEM';
   ```

3. **Remover Todas as Imagens**
   ```sql
   -- CUIDADO: Isso remove TODAS as imagens customizadas!
   DELETE FROM album_custom_images;
   ```

4. **Remover Imagens por Texto**
   ```sql
   -- Remove imagens que contenham um texto específico
   DELETE FROM album_custom_images 
   WHERE text LIKE '%texto_procurado%';
   ```

5. **Remover Imagens Antigas (por data)**
   ```sql
   -- Remove imagens criadas antes de uma data específica
   DELETE FROM album_custom_images 
   WHERE created_at < '2024-01-01';
   ```

### Método 3: Remover do Storage também

⚠️ **IMPORTANTE**: Quando você remove uma imagem da tabela `album_custom_images`, a imagem ainda permanece no Storage do Supabase. Para remover completamente:

1. **Acesse Storage**
   - No Supabase Dashboard, clique em **Storage**
   - Selecione o bucket `album-images`

2. **Encontre a Imagem**
   - Navegue até a pasta `album-images/`
   - Encontre o arquivo da imagem (o nome do arquivo está na URL)

3. **Remover do Storage**
   - Clique nos três pontos (`...`) ao lado do arquivo
   - Selecione **Delete**
   - Confirme a exclusão

### Método 4: Remover Tudo (Tabela + Storage)

Para limpar completamente todas as imagens de teste:

**1. Remover da Tabela:**
```sql
DELETE FROM album_custom_images;
```

**2. Remover do Storage:**
- Vá para **Storage** > `album-images`
- Selecione todos os arquivos
- Clique em **Delete**

## 🔍 Como Encontrar o ID de uma Imagem

### Via Código (Console do Navegador)

1. Abra o site no navegador
2. Abra o Console do Desenvolvedor (F12)
3. Execute:
```javascript
// Carregar imagens do Supabase
const { data } = await supabase
  .from('album_custom_images')
  .select('*')
  .order('created_at', { ascending: false });

console.table(data);
```

### Via Supabase Dashboard

- Na tabela `album_custom_images`, o ID aparece na primeira coluna
- Copie o UUID completo (ex: `550e8400-e29b-41d4-a716-446655440000`)

## 📝 Exemplo Prático: Remover Imagem de Teste

Se você adicionou uma imagem de teste e quer removê-la:

1. **Identifique a Imagem**
   - Vá para o álbum no site
   - Veja qual imagem foi adicionada
   - Anote o texto/comentário se houver

2. **Encontre no Supabase**
   - Abra `album_custom_images` no Table Editor
   - Procure pela imagem pelo texto ou data

3. **Remova**
   - Clique na linha
   - Delete
   - Confirme

4. **Limpe o Storage (Opcional)**
   - Vá para Storage > `album-images`
   - Encontre o arquivo correspondente
   - Delete

## ⚠️ Avisos Importantes

- **Backup**: Se você tem imagens importantes, considere fazer backup antes de deletar
- **Storage**: Lembre-se de limpar o Storage também para economizar espaço
- **Permissões**: Certifique-se de ter permissões de administrador no projeto Supabase

## 🆘 Problemas Comuns

### "Não consigo ver a imagem na tabela"
- Verifique se está na tabela correta: `album_custom_images`
- Recarregue a página do Dashboard

### "A imagem ainda aparece no site"
- Limpe o cache do navegador (Ctrl+Shift+R ou Cmd+Shift+R)
- Aguarde alguns segundos para o cache do Supabase atualizar

### "Erro ao deletar"
- Verifique se tem permissões de administrador
- Certifique-se de que a política RLS permite DELETE

## 📚 Referências

- [Supabase Table Editor](https://supabase.com/docs/guides/database/tables)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
- [SQL DELETE](https://www.postgresql.org/docs/current/sql-delete.html)
