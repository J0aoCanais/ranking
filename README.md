# Site Festas VDL

Este é um projeto com frontend React e backend Django para um sistema de ranking.

## 🌐 Site em Produção

O site está disponível em: https://festasvdl.com

## 🚀 Deploy Automático

O site é automaticamente publicado no GitHub Pages sempre que há um push para a branch `main`.

### Como funciona:
1. O GitHub Actions detecta mudanças na branch `main`
2. Instala as dependências do frontend
3. Configura o ambiente de produção
4. Faz build do projeto React
5. Publica no GitHub Pages

## 🔧 Configuração

### Frontend (React + Vite)
- **Localização**: `frontend/`
- **Tecnologias**: React, TypeScript, Vite, SCSS
- **Build**: `npm run build`
- **Dev**: `npm run dev`

### Backend (Django) - Opcional
- **Localização**: `backend/`
- **Tecnologias**: Django, Django REST Framework
- **Nota**: O frontend funciona com dados mock quando não há backend configurado

## 📁 Estrutura

```
ranking/
├── frontend/           # Aplicação React
│   ├── src/
│   ├── public/
│   ├── dist/          # Build de produção
│   ├── .env           # Variáveis locais
│   └── .env.production # Variáveis de produção
├── backend/           # API Django (opcional)
├── docs/              # Documentação
└── .github/workflows/ # GitHub Actions
```

## 🛠️ Como fazer alterações

1. **Desenvolver localmente**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. **Testar build**:
   ```bash
   npm run build
   ```

3. **Publicar**:
   ```bash
   git add .
   git commit -m "Sua mensagem"
   git push
   ```

4. **Aguardar**: O GitHub Actions fará o deploy automaticamente em ~2-3 minutos

## 🔍 Resolução de problemas

### Página em branco?
1. Verifique se o build foi bem-sucedido no GitHub Actions
2. Confirme que não há erros de JavaScript no console do navegador
3. Verifique se as variáveis de ambiente estão corretas

### Problemas de API?
- O site funciona com dados mock quando não há backend
- Para conectar a um backend real, configure `VITE_BACKEND_URL` no arquivo `.env.production`

### Deploy falhando?
1. Verifique os logs no GitHub Actions
2. Confirme que todas as dependências estão no `package.json`
3. Teste o build localmente primeiro

## 📞 Suporte

Se encontrares problemas:
1. Verifica os logs no GitHub Actions (`Actions` tab no GitHub)
2. Testa localmente com `npm run build`
3. Confirma que todas as alterações foram commitadas

---

**Última atualização**: Agosto 2025
