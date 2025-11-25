# 🎯 Guia de Preparação para Apresentação do Projeto

## Sistema de Manutenção de Equipamentos - UFPR/TADS Web II

---

## 📌 Visão Geral do Sistema

O **Sistema de Manutenção de Equipamentos** é uma aplicação web completa para controle de solicitações de manutenção de equipamentos. O sistema permite o gerenciamento do ciclo completo de uma solicitação, desde a abertura pelo cliente até a finalização pelo funcionário.

---

## 👥 Equipe

- **Clarissa Eri Morita** - 20245515
- **Gabriela Morais Gandine** - 20234968
- **Giovanna Dornelles Barichello** - 20245178
- **Isabella Luiza Costa Vicente** - 20242930
- **Luigi Ledermann Girardi** - 20221095
- **Peterson Almeida Fontinhas** - 20246106

---

## 🛠️ Stack Tecnológica

### Frontend (Angular 20)
| Tecnologia | Versão | Função |
|------------|--------|--------|
| Angular | 20.1.0 | Framework SPA |
| TypeScript | 5.8.2 | Linguagem de programação |
| Tailwind CSS | 4.1.12 | Estilização |
| ngx-mask | 20.0.3 | Máscaras de input |
| jsPDF + AutoTable | 3.0.4 / 5.0.2 | Geração de relatórios PDF |
| jwt-decode | 4.0.0 | Decodificação de tokens JWT |

### Backend (Spring Boot 3.5.6)
| Tecnologia | Versão | Função |
|------------|--------|--------|
| Java | 17 | Linguagem de programação |
| Spring Boot | 3.5.6 | Framework backend |
| Spring Security | - | Autenticação/Autorização |
| Spring Data JPA | - | Persistência de dados |
| MySQL | - | Banco de dados relacional |
| Lombok | - | Redução de boilerplate |
| java-jwt (Auth0) | 4.4.0 | Geração de tokens JWT |

### Comunicação
- **API RESTful** com JSON
- **JWT (JSON Web Token)** para autenticação
- **CORS** configurado para comunicação frontend-backend

---

## 🏗️ Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (Angular)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Cliente   │  │ Funcionário │  │  Serviços Angular   │  │
│  │   Pages     │  │   Pages     │  │  (HTTP Client)      │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTP/REST
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                     BACKEND (Spring Boot)                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Controllers │──│  Services   │──│   Repositories      │  │
│  │  (REST API) │  │  (Lógica)   │  │   (JPA)             │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└────────────────────────────┬────────────────────────────────┘
                             │ JDBC
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                       MySQL Database                         │
│  usuarios | cliente | funcionario | solicitacao | categoria │
│  historico | pagamento | manutencao | endereco              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Segurança Implementada

### 1. Autenticação
- **Login por e-mail e senha**
- **Senha criptografada** com SHA-256 + SALT único por usuário
- **Token JWT** para manter sessão autenticada

### 2. Autorização
- **Dois perfis de usuário:** CLIENTE e FUNCIONARIO
- **Guards no Angular** protegem rotas por perfil
- **Spring Security** valida permissões no backend

### 3. Proteção de Dados
- Senhas nunca trafegam em texto plano após cadastro
- Token JWT com tempo de expiração
- Validação de dados no frontend e backend

---

## 📊 Modelo de Dados (3ª Forma Normal)

### Principais Entidades

| Entidade | Descrição |
|----------|-----------|
| **Usuario** | Dados de autenticação (email, senha_hash, role) |
| **Cliente** | Extensão de usuário com CPF, telefone, endereço |
| **Funcionário** | Extensão de usuário com data de nascimento |
| **Categoria** | Tipos de equipamento (Notebook, Desktop, etc.) |
| **Solicitação** | Pedido de manutenção do cliente |
| **Histórico** | Registro de mudanças de status |
| **Pagamento** | Registro de pagamentos efetuados |
| **Manutenção** | Detalhes da manutenção realizada |
| **Endereço** | Endereço do cliente (integração ViaCEP) |

### Fluxo de Estados da Solicitação

```
ABERTA → ORCADA → APROVADA/REJEITADA → ARRUMADA → PAGA → FINALIZADA
                          ↓
                    RESGATADA (volta para APROVADA)
```

---

## 🎭 Funcionalidades por Perfil

### 👤 Cliente

1. **Autocadastro (RF001)**
   - Integração com API ViaCEP para preenchimento de endereço
   - Validação de CPF

2. **Login (RF002)**
   - Autenticação por e-mail e senha
   - Redirecionamento automático para área do cliente

3. **Solicitar Manutenção (RF004)**
   - Seleção de categoria do equipamento
   - Descrição do defeito

4. **Visualizar Solicitações (RF008)**
   - Lista de todas as solicitações
   - Histórico de status

5. **Aprovar/Rejeitar Orçamento (RF005/RF007)**
   - Visualização do valor do orçamento
   - Aprovação ou rejeição com motivo

6. **Pagar Serviço (RF010)**
   - Confirmação de pagamento

7. **Resgatar Serviço Rejeitado (RF009)**
   - Recuperação de solicitações rejeitadas

### 👨‍💼 Funcionário

1. **Listar Solicitações**
   - Filtros por status
   - Visualização de detalhes

2. **Efetuar Orçamento**
   - Definição de valor
   - Registro no histórico

3. **Efetuar Manutenção**
   - Descrição do serviço realizado
   - Orientações ao cliente

4. **Redirecionar Manutenção**
   - Transferir para outro funcionário

5. **Finalizar Solicitação**
   - Conclusão do atendimento

6. **CRUD de Categorias**
   - Criar, editar, excluir categorias de equipamentos

7. **CRUD de Funcionários**
   - Gerenciamento de funcionários

8. **Relatórios em PDF**
   - Por período
   - Por categoria
   - Receita gerada

---

## 🎬 Roteiro de Demonstração

### Preparação Prévia
```bash
# Terminal 1 - Backend
cd backend/backend
mvn spring-boot:run

# Terminal 2 - Frontend  
npm install
npm start
```

### Fluxo de Demonstração Sugerido (15-20 minutos)

#### Parte 1: Cadastro e Login (3 min)
1. Mostrar tela de login
2. Demonstrar autocadastro com ViaCEP
3. Fazer login como cliente existente

#### Parte 2: Cliente - Criar Solicitação (5 min)
1. Criar nova solicitação de manutenção
2. Mostrar lista de solicitações
3. Visualizar histórico

#### Parte 3: Funcionário - Processar Solicitação (5 min)
1. Login como funcionário (`maria@email.com` / senha padrão)
2. Visualizar solicitações abertas
3. Efetuar orçamento
4. Mostrar notificação enviada ao cliente

#### Parte 4: Cliente - Aprovar e Pagar (3 min)
1. Voltar ao cliente
2. Aprovar orçamento
3. Efetuar pagamento

#### Parte 5: Funcionário - Finalizar e Relatórios (4 min)
1. Efetuar manutenção
2. Finalizar solicitação
3. Demonstrar relatórios em PDF

---

## 📝 Credenciais de Teste

| Perfil | E-mail | Senha |
|--------|--------|-------|
| Cliente | joao@email.com | 123456 |
| Cliente | jose@email.com | 123456 |
| Cliente | joana@email.com | 123456 |
| Cliente | joaquina@email.com | 123456 |
| Funcionário | maria@email.com | 123456 |
| Funcionário | mario@email.com | 123456 |

> **Nota:** Todas as senhas padrão são "123456" (hash SHA-256 com salt)

---

## ❓ Perguntas Frequentes na Defesa

### Arquitetura

**P: Por que Angular e Spring Boot?**
> R: Angular oferece arquitetura robusta para SPAs com TypeScript, facilitando manutenção. Spring Boot é maduro, bem documentado e amplamente usado no mercado Java para APIs REST.

**P: Como funciona a autenticação JWT?**
> R: Após login válido, o backend gera um token JWT assinado com secret. O frontend armazena no localStorage e envia em todas requisições no header Authorization. O backend valida a assinatura e extrai informações do usuário.

**P: Por que usar SHA-256 + SALT em vez de BCrypt?**
> R: Implementamos SHA-256 + SALT por requisito acadêmico para demonstrar o conceito de salting. Em produção, BCrypt seria recomendado por ter cost factor adaptável.

### Funcionalidades

**P: Como funciona a integração com ViaCEP?**
> R: O frontend faz requisição à API pública do ViaCEP quando o usuário digita o CEP. Os campos de endereço são preenchidos automaticamente com os dados retornados.

**P: Como garantem que cliente só vê suas solicitações?**
> R: O token JWT contém o ID do usuário. O backend filtra as consultas pelo ID extraído do token, nunca confiando em dados enviados pelo frontend.

**P: Como funciona o fluxo de estados?**
> R: A entidade Solicitação tem um campo status (enum). Cada mudança é registrada na tabela Histórico com data/hora e funcionário responsável, mantendo rastreabilidade completa.

### Banco de Dados

**P: O banco está na 3ª Forma Normal?**
> R: Sim. Não há dependências transitivas. Endereço está em tabela separada (1FN). Não há grupos repetitivos. Todas as colunas dependem apenas da chave primária.

**P: Por que usar soft delete (is_delete)?**
> R: Preserva integridade referencial e histórico. Solicitações finalizadas podem referenciar categorias "excluídas". Também facilita recuperação de dados.

---

## 🎤 Dicas de Apresentação

### Antes da Apresentação
- [ ] Testar ambiente completo (backend, frontend, banco)
- [ ] Verificar se todos os dados de teste estão no banco
- [ ] Preparar duas janelas do navegador (cliente e funcionário)
- [ ] Ter backup do banco de dados

### Durante a Apresentação
- [ ] Começar com visão geral do problema que resolve
- [ ] Mostrar arquitetura antes de demonstrar
- [ ] Manter demonstração fluida (evitar erros previsíveis)
- [ ] Dividir partes entre membros da equipe
- [ ] Estar preparado para perguntas técnicas

### Pontos para Destacar
- ✅ Arquitetura em camadas bem definida
- ✅ Segurança com JWT e criptografia de senha
- ✅ Integração com API externa (ViaCEP)
- ✅ Histórico completo de alterações
- ✅ Geração de relatórios em PDF
- ✅ Interface responsiva e moderna
- ✅ Código organizado e documentado

---

## 📁 Estrutura de Pastas do Projeto

```
Trabalho-Pratico-WEB-II/
├── src/                          # Frontend Angular
│   ├── app/
│   │   ├── auth/                 # Login, cadastro, guards
│   │   ├── pages/
│   │   │   ├── cliente/          # Páginas do cliente
│   │   │   └── funcionario/      # Páginas do funcionário
│   │   ├── services/             # Serviços Angular (HTTP)
│   │   └── shared/               # Componentes compartilhados
│   └── assets/
├── backend/backend/              # Backend Spring Boot
│   └── src/main/java/com/mmtads/backend/
│       ├── Model/                # Entidades JPA
│       ├── Repository/           # Interfaces JPA
│       ├── controller/           # REST Controllers
│       ├── service/              # Lógica de negócio
│       ├── dto/                  # Data Transfer Objects
│       └── config/               # Configurações Spring
├── Documentacao/                 # Documentos do projeto
└── README.md                     # Documentação principal
```

---

## 🔧 Comandos Úteis

```bash
# Iniciar backend (porta 8081)
cd backend/backend
./mvnw spring-boot:run

# Iniciar frontend (porta 4200)
npm start

# Build de produção (frontend)
npm run build

# Rodar testes (frontend)
npm test

# Rodar testes (backend)
cd backend/backend
./mvnw test
```

---

## ✅ Checklist Pré-Apresentação

### Ambiente
- [ ] MySQL rodando com banco `manutencaoequipamentos`
- [ ] Backend iniciado sem erros (porta 8081)
- [ ] Frontend iniciado sem erros (porta 4200)
- [ ] Dados de teste inseridos no banco

### Demonstração
- [ ] Roteiro de demonstração revisado
- [ ] Divisão de partes entre membros definida
- [ ] Tempo de cada parte cronometrado
- [ ] Perguntas frequentes estudadas

### Documentação
- [ ] README atualizado
- [ ] Diagrama de arquitetura disponível
- [ ] Modelo ER do banco disponível

---

**Boa sorte na apresentação! 🎉**
