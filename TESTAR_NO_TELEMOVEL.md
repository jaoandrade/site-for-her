# 📱 Como Testar no Telemóvel

## ✅ Sim! Você pode testar no telemóvel usando o IP da rede

## 📋 Passo a Passo

### 1. Descobrir o IP da sua máquina (Windows)

**Opção A - Via PowerShell:**
```powershell
ipconfig
```
Procure por "IPv4 Address" na seção do seu adaptador WiFi/Ethernet.
Exemplo: `192.168.1.100`

**Opção B - Via CMD:**
```cmd
ipconfig | findstr IPv4
```

### 2. Iniciar o servidor

O Vite já está configurado para aceitar conexões da rede local!

```bash
npm run dev
```

Você verá algo como:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.1.100:3000/
```

**Use o endereço "Network"!**

### 3. Conectar o telemóvel

**IMPORTANTE:**
- ✅ Telemóvel e computador devem estar na **mesma rede WiFi**
- ✅ Desative o firewall temporariamente ou permita a porta 3000
- ✅ Use o IP que aparece em "Network" (não localhost)

**No telemóvel:**
1. Abra o navegador (Chrome, Safari, etc.)
2. Digite: `http://192.168.1.100:3000` (substitua pelo seu IP)
3. Pressione Enter

### 4. Se não funcionar

**Problema: Firewall bloqueando**

Windows:
1. Abra "Windows Defender Firewall"
2. Clique em "Permitir um aplicativo"
3. Adicione Node.js ou permita porta 3000

**Problema: IP não acessível**

No `vite.config.js` já está configurado `host: true`, mas se ainda não funcionar:

```bash
# Parar o servidor (Ctrl+C)
# Iniciar com host explícito
npm run dev -- --host 0.0.0.0
```

**Problema: Telemóvel não encontra**

- Verifique se estão na mesma rede WiFi
- Tente desativar temporariamente o firewall
- Verifique se o IP está correto

---

## 🎯 Resumo Rápido

1. **Descobrir IP**: `ipconfig` → procurar IPv4
2. **Iniciar servidor**: `npm run dev`
3. **Usar IP Network**: `http://SEU_IP:3000` no telemóvel
4. **Mesma rede WiFi**: Telemóvel e PC na mesma rede

---

**Agora você pode testar no iPhone 13!** 📱✨
