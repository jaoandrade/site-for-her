# 🎨 Modo Demo - Teste Visual

## O que foi feito?

Adicionei um **modo demo** temporário ao Album para que você possa ver e testar tudo visualmente **antes** de configurar o Supabase!

## Como funciona?

### ✅ Sem Supabase configurado:
- O Album mostra **6 imagens de exemplo** automaticamente
- Você pode **fazer upload de fotos** (elas aparecem temporariamente)
- Você pode **clicar nas imagens** para ver em tela cheia
- Tudo funciona visualmente, mas as imagens não são salvas permanentemente
- Aparece um aviso azul: "🎨 Demo Mode - Visual Testing"

### ✅ Com Supabase configurado:
- O modo demo é desativado automaticamente
- As imagens vêm do banco de dados real
- Upload funciona permanentemente
- Tudo é salvo no Supabase

## Como testar agora?

1. **Execute o projeto:**
   ```bash
   npm install
   npm run dev
   ```

2. **Navegue até o Album:**
   - Clique em "YES" na página inicial
   - Clique em "Continue" na tela feliz
   - Clique em "📸 Album" no Hub

3. **Você verá:**
   - 6 imagens de exemplo bonitas
   - Um aviso azul explicando que está em modo demo
   - Botão de upload funcionando

4. **Teste o upload:**
   - Clique em "📷 Add Photo"
   - Selecione uma imagem
   - Adicione um comentário (opcional)
   - A imagem aparecerá no grid!
   - ⚠️ Mas será perdida ao recarregar a página (é só demo)

5. **Teste o modal:**
   - Clique em qualquer imagem
   - Ela abre em tela cheia
   - Clique em "✕" ou fora para fechar

## Quando configurar Supabase?

Quando você quiser que as fotos sejam **salvas permanentemente**, siga o guia:
- Abra `GUIA_PASSO_A_PASSO.md`
- Siga os passos para configurar o Supabase
- Depois disso, o modo demo será desativado automaticamente

## Vantagens do Modo Demo

✅ **Ver tudo funcionando** sem configurar banco de dados
✅ **Testar a interface** completamente
✅ **Mostrar para alguém** como ficará
✅ **Desenvolver e ajustar** o visual primeiro
✅ **Configurar depois** quando estiver satisfeito

---

**Aproveite para testar tudo visualmente primeiro!** 💕✨
