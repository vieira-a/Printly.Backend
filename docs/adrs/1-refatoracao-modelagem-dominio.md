# ADR 1 - Refatoração da modelagem de domínio

| Titulo                              | Data       | Versão | Responsável     | Status |
| ----------------------------------- | ---------- | ------ | --------------- | ------ |
| Refatoração da modelagem de domínio | 18-08-2025 | 02     | Anderson Vieira | Aceito |

---

## Sumário

### Problema

Foram identificados erros conceituais na modelagem de domínio relacionados aos agregados:

- `Printer`: é tratado como único `AggregateRoot`, recebendo referência completa de entidades que também deveriam ser `AggregateRoot`. Além disso, não possui referência para `Couting`.

- `Location`: é tratado como uma classe interna, componente do agregado `Printer`. Porém, deve ser também um `AggregateRoot`, pois é uma classe independente que tem **identidade própria**, e controla estado de outros agregados.

- `Model`: também tratada como uma classe interna, componente do agregado `Printer`. Porém, deve ser também um `AggregateRoot`, pois é uma classe independente que tem **identidade própria**, e controla estado de outros agregados.

- `Counting`: é uma classe interna que possui identidade própria, não controla estados de outros agregados. `Counting` deveria fazer parte de `Printer`, que deve possuir uma lista de `Countings`.

- `CountingJob`: é uma classe interna que possui identidade própria e referência de `Counting`.

### Decisão

1. Renomear contextos para reflitam melhor as necessidades do domínio:

- Model para PrinterModel, pois se refere ao modelo de impressora
- Location para InstallationLocation, pois se refere ao local de instalação das impressoras

2. Definição de raízes de agregados

**Printer**

- Representa a impressora como entidade independente no domínio.
- É identificada por id (UUID).
- Outras partes do sistema interagem com Printer e não com seus detalhes internos.
- Contém regras de negócio próprias (ex: addCounting).

**PrinterModel**

- Modelos de impressoras podem ser compartilhados entre várias impressoras.
- Possui identidade própria (id).
- Outros agregados podem precisar conhecer ou referenciar um modelo.

**InstallationLocation**

- Representa o local físico de instalação (pode ser prédio, andar, setor).
- Pode ser compartilhado por várias impressoras.
- Tem ciclo de vida independente de uma Printer.

3. Definição de classes internas de persistência

**Counting (Classe interna do agregado Printer)**

- Só faz sentido no contexto de uma impressora (não existe contagem solta).
- Criado sempre via Printer.addCounting(...).
- Não deve ser manipulado diretamente por outros agregados.
- Regras de negócio próprias: controlar tentativas, armazenar erros, definir se reprocessa ou não.
- Associação: ele referencia a Printer (ou seu id), mas não depende dela para existir.

**CountingJob (Classe interna do agregado Counting)**

- Identidade própria: cada job tem um id, um status, tentativas, erros, etc.
- Apenas registra o status da contagem para controlar o reprocessamento automático

## Detalhes

- Printer recebe apenas as referência de PrinterModel e InstallationLocation, pois não precisa carregar o estado destes objetos.
- Printer possui regras de negócio para manipular as suas dependências (agregados)
- Counting armazena dados históricos da conntagem
- CountingJob armazena status de contagens para futuros reprocessamentos
