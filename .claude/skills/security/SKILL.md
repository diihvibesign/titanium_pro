---
name: security
description: >
  Auditoria e implementação de segurança para sistemas antes de publicação.
  Use esta skill SEMPRE que o usuário mencionar: publicar, deploy, colocar em
  produção, subir para produção, lançar sistema, expor API, configurar domínio,
  variáveis de ambiente, chaves de API, autenticação, CORS, webhook,
  permissões, roles, ou qualquer contexto de sistema prestes a ser acessado
  por usuários reais. Esta skill realiza checklist rigoroso de segurança,
  aponta vulnerabilidades e entrega código ou configuração corretiva para
  backend e frontend, independente de stack.
---

# Security — Auditoria de Segurança para Sistemas

## Princípio Central

**Nenhum sistema vai a público com credencial exposta, endpoint desprotegido
ou permissão aberta.** Esta skill age como auditor técnico que bloqueia o
deploy até que todos os controles obrigatórios estejam implementados.

---

## Fluxo de Uso

1. **Identifica camadas** presentes no sistema (frontend, backend, banco, API)
2. **Audita o que o usuário compartilhou** (código, config, schema, arquitetura)
3. **Emite relatório** com status por item: ✅ OK / ⚠️ ATENÇÃO / ❌ BLOQUEANTE
4. **Entrega os fixes** para cada item ❌ ou ⚠️

> ❌ BLOQUEANTE = deploy proibido até corrigir.
> ⚠️ ATENÇÃO = risco documentado, usuário decide conscientemente.

---

## Formato do Relatório

```
AUDITORIA DE SEGURANÇA — [nome do sistema]
Camadas: [frontend / backend / banco / API externa]

RESULTADO GERAL: ✅ APROVADO | ⚠️ COM RESSALVAS | ❌ BLOQUEADO

──────────────────────────────────
CREDENCIAIS & SECRETS
✅ Chaves em variáveis de ambiente
❌ Chave de API hardcoded no código → FIX [1]

AUTENTICAÇÃO & AUTORIZAÇÃO
✅ Endpoints protegidos com auth
⚠️ Sem rate limiting no login → FIX [2]

BANCO DE DADOS
✅ Queries parametrizadas (sem SQL injection)
❌ Permissões abertas sem controle de acesso → FIX [3]

FRONTEND
✅ Sem chaves sensíveis no bundle
⚠️ Sem validação de input no formulário de contato

TRANSPORTE
✅ HTTPS em todos os endpoints
✅ Headers de segurança configurados

──────────────────────────────────
FIXES OBRIGATÓRIOS (❌)
[1] ...
[3] ...

BLOQUEANTES PENDENTES: 2
Sistema NÃO deve ir a público até resolução.
```

---

## 1. Credenciais & Secrets

### Regras universais

| Controle | Verificação |
|----------|------------|
| Nenhuma chave no código-fonte | Buscar `sk-`, `Bearer `, `password=`, `secret=`, `token=` hardcoded |
| Nenhuma chave no frontend (client-side) | Verificar o que vai no bundle público |
| Todas as chaves em variáveis de ambiente | `.env`, secrets do serviço de deploy |
| `.env` no `.gitignore` | Verificar antes de qualquer commit |
| `.env.example` sem valores reais | Documentar as vars sem expor os valores |
| Chaves com escopo mínimo | Não usar permissão de admin onde read-only basta |
| Rotação prevista | Chaves devem poder ser trocadas sem refactor |

### Detecção automática — Claude deve alertar ao ver:
- String começando com `sk-`, `pk_`, `rk_`, `eyJ` no código
- Qualquer `password`, `secret`, `token`, `api_key` com valor literal
- Credenciais em comentários ou strings de log
- Arquivo `.env` sendo importado e reexportado para o cliente

### Fix padrão
```
# .gitignore
.env
.env.local
.env.production
*.pem
*.key

# .env.example (commitar este)
DATABASE_URL=
API_SECRET_KEY=
JWT_SECRET=
EXTERNAL_SERVICE_KEY=
```

---

## 2. Autenticação & Autorização

Leia `references/auth.md` para padrões detalhados.

### Itens críticos

- [ ] Todo endpoint não-público exige autenticação verificada no servidor
- [ ] Autorização verificada no backend — nunca confiar no frontend
- [ ] Tokens com expiração definida (JWT exp, session timeout)
- [ ] Logout invalida o token/sessão no servidor
- [ ] Rotas admin/internal inacessíveis sem role correto
- [ ] Troca de senha exige senha atual
- [ ] Reset de senha via token de uso único com expiração curta (≤1h)
- [ ] Brute force protegido (rate limit ou lockout no login)

---

## 3. Banco de Dados

Leia `references/database.md` para padrões detalhados.

### Itens críticos

- [ ] Todas as queries parametrizadas (zero concatenação de string com input do usuário)
- [ ] Usuário do banco com permissões mínimas (não usar root/admin na aplicação)
- [ ] Acesso ao banco não exposto publicamente (apenas via aplicação)
- [ ] Dados sensíveis criptografados em repouso (senhas com bcrypt/argon2, nunca MD5/SHA1 puro)
- [ ] Backups automáticos configurados
- [ ] Sem credenciais do banco em logs

---

## 4. Frontend

Leia `references/frontend.md` para padrões detalhados.

### Itens críticos

- [ ] Nenhuma chave privada/secreta no bundle (verificar build final)
- [ ] Apenas chaves públicas por design (ex: anon keys, publishable keys) no client
- [ ] Validação de input em todos os campos (client-side + server-side)
- [ ] Uploads validados: tipo, tamanho, extensão
- [ ] Erros técnicos não expostos ao usuário (stack trace, queries, paths internos)
- [ ] Sem lógica de autorização exclusiva no frontend

---

## 5. Transporte & Infraestrutura

### HTTPS

- [ ] Todo tráfego em HTTPS (sem HTTP em produção)
- [ ] Certificado SSL válido e com renovação automática
- [ ] HSTS habilitado (`Strict-Transport-Security`)
- [ ] Redirecionamento HTTP → HTTPS configurado

### Headers de segurança

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=31536000; includeSubDomains
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### CORS

- [ ] `Access-Control-Allow-Origin` restrito a domínios específicos
- [ ] Sem `*` em produção para endpoints autenticados
- [ ] Methods e headers explicitamente declarados

```
# ❌ ERRADO em produção
Access-Control-Allow-Origin: *

# ✅ CORRETO
Access-Control-Allow-Origin: https://meuapp.com.br
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## 6. APIs & Endpoints

Leia `references/api.md` para padrões detalhados.

### Itens críticos

- [ ] Rate limiting em todos os endpoints públicos
- [ ] Rate limiting reforçado em login, registro, reset de senha
- [ ] Payload validado: tipo, tamanho máximo, campos obrigatórios
- [ ] Webhooks com verificação de assinatura (HMAC)
- [ ] IDs de recursos não-sequenciais (UUID ou hash — não expor `?id=1,2,3`)
- [ ] Respostas de erro sem informação interna (sem path, query, stack)
- [ ] Endpoints de admin/internal em path separado com auth própria

---

## 7. Dados Sensíveis

- [ ] Senhas armazenadas com hash seguro (bcrypt, argon2) — nunca plaintext ou MD5
- [ ] PII (CPF, email, telefone) com acesso restrito por role
- [ ] Dados sensíveis não aparecem em URLs (query string, path)
- [ ] Dados sensíveis não logados (nem parcialmente)
- [ ] Dados de terceiros não armazenados além do necessário
- [ ] LGPD/GDPR: política de retenção e exclusão definida

---

## 8. Gatilhos de Alerta Automático

Claude inicia auditoria sem esperar pedido ao detectar:

- Qualquer chave/token com valor literal no código
- `SELECT *` com input do usuário concatenado (SQL injection)
- `eval()`, `innerHTML =` com dado externo (XSS)
- `Access-Control-Allow-Origin: *` em contexto autenticado
- Senha comparada com `==` em vez de hash seguro
- Endpoint sem verificação de autenticação
- `console.log` com dados de usuário ou credenciais
- Token JWT sem verificação de `exp`
- Upload sem validação de tipo ou tamanho

---

## Referências

- `references/auth.md` — Autenticação, JWT, sessões, OAuth, 2FA
- `references/database.md` — SQL injection, permissões, criptografia, backups
- `references/frontend.md` — XSS, env vars, validação, CSP, headers
- `references/api.md` — Rate limiting, CORS, webhook signing, erros seguros