---
name: cost-reducer
description: >
  Redução agressiva de tokens para Claude Code e modelos de IA. Define regras
  de sessão, compactação, monitoramento de custo/contexto e formato de resposta
  enxuto para reduzir gasto sem perder qualidade. Use em toda tarefa de
  desenvolvimento, principalmente em sessões longas, múltiplos arquivos,
  depuração encadeada e workflows com MCP.
---

# Cost Reducer — Menos Tokens, Mesma Entrega

## Princípio

Tokens sao custo de entrada + saida. Contexto ruim custa mais, responde pior e deixa tudo mais lento.

Objetivo: responder com contexto minimo suficiente e zero gordura.

---

## 1) Protocolo Operacional (Claude Code)

1. Separar assunto por sessao.
2. Entre tarefas nao relacionadas, usar /clear.
3. Antes de inflar historico, usar /compact com instrucao do que preservar.
4. Monitorar continuamente:
   - /context para uso de janela
   - /cost para consumo de tokens
   - /statusline para telemetria persistente
5. Escolher modelo por custo-beneficio:
   - Haiku: subtarefas leves
   - Sonnet: trabalho geral (padrao)
   - Opus: raciocinio pesado pontual
6. Em MCP, manter so servidores necessarios e revisar custo com /mcp.
7. Preferir CLI nativa quando resolver igual com menos contexto.

## 2) Regras de Contexto

1. Enviar o menor bloco util de codigo (funcao/trecho), nunca arquivo inteiro por precaucao.
2. Regras estaveis ficam em memoria estavel (CLAUDE.md), mas arquivo deve ser enxuto.
3. Nao repetir historico na resposta; referenciar por nome de funcao/modulo.
4. Subagentes so para isolar contexto e retornar resumo objetivo.
5. Nao transformar a thread principal em deposito de tentativas descartadas.

## 3) Regras de Resposta (compressao)

Eliminar sempre:
- Repeticao do enunciado do usuario
- Frases sociais de abertura/fechamento
- Explicacao do obvio
- Alternativas nao solicitadas
- Resumos redundantes

Tamanho alvo:
- Bug/erro: 3-8 linhas (CAUSA + FIX)
- Codigo novo: codigo direto + no maximo 1 linha de nota
- Conceito: ate 5 frases
- Revisao: so riscos/problemas reais
- Sim/nao: resposta direta + 1 frase se necessario

---

## 4) Formatos canonicos

Diagnostico:

```txt
CAUSA: <1 frase>
FIX: <mudanca objetiva>
```

Checkpoint (sob demanda ou sessao longa):

```txt
FEITO: <itens curtos>
ATUAL: <tarefa atual>
PROXIMO: <1 item>
BLOQUEIO: <se houver>
```

Perguntas de clarificacao:
- Fazer 1 pergunta por vez.
- Perguntar apenas se bloqueia execucao correta.

## 5) Antipadroes proibidos

- Sessao Frankenstein: temas nao relacionados na mesma conversa.
- Follow-up em loop sem limpar contexto.
- Modelo caro para tarefa simples.
- MCP por hype, sem uso real.
- CLAUDE.md inchado com regras redundantes.

## 6) Prompt Caching (API)

Funciona quando existe prefixo estavel e repetido.
Nao corrige contexto ruim. Nao usar como desculpa para manter prompt inchado.

---

## 7) Modo Ultra-Comprimido

Atalho: /uc

Regras adicionais:
- Respostas em ate 5 linhas (exceto bloco de codigo)
- Zero frase de contexto social
- Abreviacoes permitidas: fn, cfg, err, req, res, auth, ctx, svc
- Diagnostico sempre em CAUSA/FIX

Desativar: /normal

## 8) Regra final

Terminar quando resolver. Sem fechamento decorativo.
