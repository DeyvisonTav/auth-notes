# Arquitetura do Projeto - DDD e Clean Architecture

Este projeto foi reorganizado seguindo os princípios de **Domain-Driven Design (DDD)** e **Clean Architecture** para melhorar a manutenibilidade, escalabilidade e separação de responsabilidades.

## Estrutura de Pastas

```
src/
├── domain/                    # Camada de Domínio (DDD)
│   ├── entities/             # Entidades de domínio
│   │   ├── user.ts          # Entidade User
│   │   └── notes.ts         # Entidade Notes
│   ├── value-objects/        # Objetos de valor
│   ├── repositories/         # Interfaces dos repositórios
│   │   ├── user-repository.ts
│   │   └── notes-repository.ts
│   └── services/             # Serviços de domínio
├── application/              # Camada de Aplicação (Use Cases)
│   ├── use-cases/
│   │   ├── users/           # Use cases relacionados a usuários
│   │   ├── notes/           # Use cases relacionados a notas
│   │   └── auth/            # Use cases de autenticação
│   └── interfaces/           # Interfaces da aplicação
├── infrastructure/           # Camada de Infraestrutura
│   ├── repositories/         # Implementações dos repositórios
│   │   ├── in-memory-user-repository.ts
│   │   └── in-memory-notes-repository.ts
│   ├── database/             # Configurações de banco
│   └── external/             # Serviços externos
├── presentation/             # Camada de Apresentação
│   ├── controllers/          # Controllers
│   │   ├── user.controller.ts
│   │   └── notes.controller.ts
│   ├── dtos/                 # Data Transfer Objects
│   │   ├── users/           # DTOs de usuários
│   │   └── notes/           # DTOs de notas
│   └── middlewares/          # Middlewares
├── shared/                   # Código compartilhado
│   ├── errors/               # Erros customizados
│   │   ├── user.ts
│   │   └── notes.ts
│   ├── utils/                # Utilitários
│   └── types/                # Tipos compartilhados
│       └── entity.ts         # Classe base Entity
└── main.ts                   # Ponto de entrada
```

## Princípios Aplicados

### 1. Domain-Driven Design (DDD)

- **Entidades**: Representam objetos de domínio com identidade única
- **Repositórios**: Interfaces que definem como acessar dados do domínio
- **Serviços de Domínio**: Lógica de negócio que não pertence a uma entidade específica

### 2. Clean Architecture

- **Independência de Frameworks**: O domínio não depende de frameworks externos
- **Testabilidade**: Cada camada pode ser testada independentemente
- **Independência de UI**: A lógica de negócio não depende da interface
- **Independência de Banco de Dados**: O domínio não conhece detalhes de persistência

### 3. Separação de Responsabilidades

- **Domain**: Contém as regras de negócio e entidades
- **Application**: Orquestra os casos de uso
- **Infrastructure**: Implementa detalhes técnicos (banco, APIs externas)
- **Presentation**: Gerencia a interface com usuários/APIs
- **Shared**: Código reutilizável entre camadas

## Fluxo de Dados

```
Presentation → Application → Domain
     ↑              ↑           ↑
     ↓              ↓           ↓
Infrastructure ← Infrastructure ← Infrastructure
```

## Benefícios da Nova Arquitetura

1. **Manutenibilidade**: Código organizado e fácil de entender
2. **Escalabilidade**: Fácil adicionar novas funcionalidades
3. **Testabilidade**: Cada camada pode ser testada isoladamente
4. **Flexibilidade**: Fácil trocar implementações (ex: banco de dados)
5. **Reutilização**: Código compartilhado bem organizado

## Convenções

- **Nomenclatura**: PascalCase para classes, camelCase para métodos/variáveis
- **Imports**: Sempre usar caminhos relativos claros
- **Testes**: Um arquivo de teste para cada use case
- **DTOs**: Separados por domínio na camada de apresentação
