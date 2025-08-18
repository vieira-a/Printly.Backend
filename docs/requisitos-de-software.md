# Requisitos Funcionais (RF)

## Impressoras

- **RF01**: Cadastrar impressoras com marca, modelo, IP, localização, responsável e observações.
  - Uma impressora não deve ser cadastrada sem um modelo, número de série, IP, localização, responsável e quantidade inicial de cópia e impressão
  - O modelo de impressora deve conter o nome do frabricante e seu modelo específico, além de OIDs de impressão e cópia
  - Uma localização deve possuir um endereço completo contendo Rua, Bairro, Cidade, Estado, CEP e Ponto de referência

- **RF02**: Listar e filtrar impressoras cadastradas.
  - A lista de impressoras deve conter dados básicos do seu cadastro bem como os dados da última contagem

- **RF03**: Editar e excluir impressoras.

## Coleta Automática via SNMP

- **RF04**: Coletar dados de contagem via SNMP automaticamente.
- **RF05**: Configurar periodicidade da coleta (diária por padrão).
- **RF06**: Registrar falhas na coleta sem impactar a operação.

## Coleta Manual

- **RF07**: Permitir inserção manual de contagem com data e observações.

## Relatórios

- **RF08**: Relatório gerencial com contagem atual por impressora e filtros por localização, responsável, marca, modelo e período.
- **RF09**: Relatório comparativo entre períodos com variação percentual de consumo.

## Retentativa de coleta em casos de falha

- **RF10**: Sistema deve realizar tentativas de coleta caso a coleta automática falhe

---

# Requisitos Não Funcionais (RNF)

- **RNF01**: Coleta via SNMP assíncrona e resiliente.
- **RNF02**: Backend e frontend desacoplados e escaláveis.
- **RNF03**: Registro de logs para auditoria.

---

## Backlog Inicial – MVP

| ID   | História do Usuário                            | Prioridade | Observações                  |
| ---- | ---------------------------------------------- | ---------- | ---------------------------- |
| US01 | Cadastrar impressoras com suas informações     | Alta       | CRUD completo                |
| US02 | Listar e filtrar impressoras                   | Alta       | UX importante                |
| US03 | Coletar automaticamente os contadores via SNMP | Alta       | Funcionalidade principal     |
| US04 | Configurar frequência da coleta                | Alta       | Padrão diário                |
| US05 | Registrar coletas com data, valor e status     | Alta       | Histórico confiável          |
| US06 | Inserir contagem manual                        | Média      | Cobrir falhas de coleta      |
| US07 | Relatório com contadores atuais e filtros      | Alta       | Primeira versão de dashboard |
| US08 | Relatório comparativo com variações            | Média      | Segunda versão de dashboard  |
| US09 | Registrar logs de coleta e falhas              | Média      | Observabilidade              |
| US10 | Implantar localmente via Docker                | Alta       | Deploy de desenvolvimento    |

---

## Métricas de Validação

- Impressoras cadastradas corretamente
- Coletas agendadas via SNMP com sucesso
- Retentativas agendadas realizadas com sucesso
- Inserções manuais visíveis em relatórios
- Filtros no relatório entregando valor ao usuário

---

## Change log

| Data       | Versão | Responsável     |
| ---------- | ------ | --------------- |
| 18-08-2025 | 02     | Anderson Vieira |

---
