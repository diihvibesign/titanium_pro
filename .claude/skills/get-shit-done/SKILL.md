---
name: get-shit-done
description: >
  Sistema de execucao orientado a conclusao para finalizar tarefas fim a fim
  usando os workflows e agentes do GSD instalados no projeto. Use quando o
  usuario pedir para concluir uma tarefa completa com planejamento, execucao,
  verificacao e fechamento sem parar no meio.
---

# Get Shit Done - Skill de Execucao Total

## Objetivo

Concluir tarefas de ponta a ponta, com foco em resultado verificavel.

Esta skill usa os artefatos instalados em:
- .claude/commands/gsd/
- .claude/get-shit-done/workflows/
- .claude/agents/

## Quando acionar

Ative esta skill quando o pedido incluir qualquer um destes sinais:
- "finalizar tarefa"
- "fazer de ponta a ponta"
- "executar tudo"
- "nao parar no meio"
- "resolver completo"

## Regra principal

Persistir ate resolver de verdade:
1. Entender escopo e criterio de pronto.
2. Planejar os passos minimos com ordem clara.
3. Executar alteracoes necessarias.
4. Validar com checks/testes/comportamento esperado.
5. Corrigir falhas encontradas.
6. Encerrar somente com resultado confirmado.

## Protocolo de execucao recomendado

### Fluxo rapido (quando ja existe escopo claro)
1. Rodar roteamento inteligente de intencao: /gsd-do <pedido>
2. Seguir comando roteado ate completar a entrega.
3. Validar com /gsd-verify-work quando houver fase/plano.

### Fluxo estruturado (quando tarefa e grande ou ambigua)
1. /gsd-new-project (ou /gsd-map-codebase se ja existe codigo)
2. /gsd-discuss-phase <n>
3. /gsd-plan-phase <n>
4. /gsd-execute-phase <n>
5. /gsd-verify-work <n>
6. /gsd-ship <n> e /gsd-complete-milestone

## Regras de confiabilidade

- Nao declarar concluido sem evidencias objetivas.
- Nao pular verificacao quando houver risco de regressao.
- Se houver bloqueio real, registrar causa, impacto e proximo melhor passo.
- Em tarefas longas, manter checkpoints curtos de progresso.

## Criterio de pronto

A tarefa so termina quando todos os itens abaixo forem verdadeiros:
- Requisitos pedidos foram implementados.
- Resultado foi validado (teste, lint, build ou verificacao funcional).
- Pendencias remanescentes ficaram explicitas e justificadas.

## Fallback operacional

Se o comando ideal nao estiver claro:
1. Use /gsd-help para mapear opcoes.
2. Use /gsd-do com descricao objetiva do objetivo final.
3. Continue no comando sugerido pelo roteador.

## Observacao

Esta skill prioriza fechamento completo da tarefa com seguranca tecnica.
"A qualquer custo" deve ser interpretado como alta persistencia operacional,
nao como permissao para quebrar seguranca, privacidade, integridade de dados
ou politicas do ambiente.
