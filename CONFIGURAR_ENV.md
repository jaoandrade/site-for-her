# ⚙️ Como Configurar o Arquivo .env

Para que o Supabase funcione corretamente, você precisa criar um arquivo `.env` na raiz do projeto.

## 📝 Passos

1. **Crie o arquivo `.env`** na raiz do projeto (mesmo nível que `package.json`)

2. **Adicione as seguintes linhas**:

```env
VITE_SUPABASE_URL=https://vizlfacxrfgqfpxkitum.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_vfmAvcaR_hOlBP_YoAtS_A_nSxOLeZ3
```

**Nota**: A chave fornecida é a "Publishable key" (Data API). Se não funcionar, você pode precisar usar a "Anon key" do Supabase Dashboard > Settings > API.

3. **Reinicie o servidor de desenvolvimento**:
   - Pare o servidor (Ctrl+C)
   - Execute `npm run dev` novamente

## ⚠️ Importante

- O arquivo `.env` não deve ser commitado no Git (já está no `.gitignore`)
- Após criar o arquivo `.env`, você precisa reiniciar o servidor para que as variáveis sejam carregadas
- Se ainda der erro, verifique se o arquivo está na raiz do projeto e se as variáveis estão escritas exatamente como acima

## 🔍 Verificar se está funcionando

Após configurar, você pode verificar no console do navegador (F12) se há algum aviso sobre Supabase. Se não houver avisos, está configurado corretamente.
