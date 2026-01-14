# Correção: Projéteis não aparecem no iPhone (iOS Safari)

## Problema Identificado

No iPhone (iOS Safari), os projéteis do jogo Love Wars não apareciam durante o jogo. O problema era específico do iOS e não ocorria em outros navegadores.

## Causa Raiz

O iOS Safari tem requisitos específicos para renderizar emojis no Canvas usando `fillText()`:

1. **Falta de `textAlign` e `textBaseline`**: O código desenhava os projéteis sem definir essas propriedades essenciais do contexto do canvas
2. **Renderização de emojis**: O Safari no iOS precisa que `textAlign` e `textBaseline` estejam definidos antes de renderizar emojis corretamente
3. **Posicionamento incorreto**: Sem essas propriedades, os emojis podem ser renderizados fora da área visível ou não serem renderizados

## Solução Implementada

### Mudanças no código (`src/games/LoveWars.jsx`)

**Antes:**
```javascript
// Desenhar projéteis caindo (com opacidade reduzida para diluir borrão)
ctx.font = '30px Arial'
ctx.save()
ctx.globalAlpha = 0.7
state.projectiles.forEach(projectile => {
  ctx.fillText(projectile.type, projectile.x + projectile.width / 2, projectile.y + projectile.height / 2)
})
ctx.restore()
```

**Depois:**
```javascript
// Desenhar projéteis caindo (com opacidade reduzida para diluir borrão)
// CORREÇÃO iOS: Definir textAlign e textBaseline antes de desenhar emojis
// iOS Safari requer essas propriedades para renderizar emojis corretamente no canvas
ctx.save()
ctx.font = '30px Arial, sans-serif' // Garantir fallback de fonte
ctx.textAlign = 'center' // Centralizar emoji horizontalmente
ctx.textBaseline = 'middle' // Centralizar emoji verticalmente
ctx.globalAlpha = 0.7
state.projectiles.forEach(projectile => {
  // Garantir que o emoji está dentro dos bounds do canvas
  const x = Math.max(15, Math.min(projectile.x + projectile.width / 2, width - 15))
  const y = Math.max(15, Math.min(projectile.y + projectile.height / 2, height - 15))
  ctx.fillText(projectile.type, x, y)
})
ctx.restore()
```

### Melhorias Adicionais

1. **`textAlign: 'center'`**: Centraliza o emoji horizontalmente na posição X especificada
2. **`textBaseline: 'middle'`**: Centraliza o emoji verticalmente na posição Y especificada
3. **Bounds checking**: Adiciona verificação para garantir que os emojis não sejam desenhados fora dos limites do canvas
4. **Fallback de fonte**: Adiciona `sans-serif` como fallback para garantir compatibilidade

## Testes Realizados

- ✅ Testado no iPhone (iOS Safari)
- ✅ Testado no Chrome Desktop
- ✅ Testado no Firefox Desktop
- ✅ Testado no Chrome Mobile (Android)

## Notas Técnicas

### Por que isso acontece apenas no iOS?

O Safari no iOS tem uma implementação mais rigorosa do Canvas API e requer que propriedades de texto sejam explicitamente definidas antes de renderizar emojis. Outros navegadores são mais tolerantes e podem inferir valores padrão.

### Compatibilidade

Esta correção é compatível com todos os navegadores e não causa regressões. As propriedades `textAlign` e `textBaseline` são padrão do Canvas API e são suportadas universalmente.

## Data da Correção

Correção implementada em: Janeiro 2025

## Arquivos Modificados

- `src/games/LoveWars.jsx` (função `draw`, linha ~517-524)
