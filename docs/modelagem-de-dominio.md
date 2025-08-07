# Modelagem de dominio

## Bounded Contexts

1. Impressoras

Responsável por registrar e manter os dados de impressoras, seus modelos e suas localizações.
Entidades principais: Impressora, Modelo, Localizacao.

2. Contagem

Responsável por registrar os dados coletados periodicamente das impressoras.
Entidades principais: Contagem.

3. Relatórios

Responsável por gerar análises, gráficos, alertas etc. Não deve ter Aggregate Root próprio — é mais um contexto de consulta/projeção (read-model).

## Aggregate Root

**Impressoras**

- Entidade independente
- Controla o ciclo de vida das contagens
- É referênciada diretamente por outras entidades
- Agrupa dados relevantes ao seu estado: modelo, localização, histórico de contagens

### Estrutura do agregado

Impressora (Aggregate Root)
├── Modelo (referência ou valor embutido, dependendo da modelagem)
├── Localizacao (referência ou valor embutido)
└── Contagens (lista de entidades filhas)
