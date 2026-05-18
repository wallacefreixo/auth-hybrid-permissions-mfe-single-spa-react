# 🧩 Microfrontend Architecture - Hybrid Auth & Permissions

Aplicação frontend baseada em **microfrontends com single-spa**, construída com React 19 e foco em:

- escalabilidade
- desacoplamento
- autenticação híbrida
- PBAC baseado em permissões
- segurança
- compartilhamento de dependências
- performance

O projeto implementa:

- login local
- autenticação federada via Identity Provider (IdP)
- controle de permissões frontend/backend
- gerenciamento global de autenticação
- cache distribuído
- comunicação segura via cookies HTTP-only

---

## 🛠 Tecnologias utilizadas

- **single-spa** – orquestração de microfrontends
- **React 19** – biblioteca para construção da interface
- **TypeScript** – tipagem estática
- **Material UI** – biblioteca de componentes visuais
- **Emotion** – engine de estilização utilizada pelo MUI
- **Axios** – cliente HTTP para comunicação com o backend
- **React Router DOM** – biblioteca para gerenciamento de rotas
- **TanStack Query** – cache e gerenciamento de estado assíncrono
- **React i18next** – internacionalização de mensagens

---

## 🧠 Conceitos Arquiteturais

### 🔹 Microfrontend com single-spa

- Cada aplicação é independente
- Deploy desacoplado
- Comunicação via **import maps**
- Compartilhamento de dependências via:
  - `peerDependencies`
  - `webpack externals`

---

### 🔹 Shared Modules

- Evitam duplicação de código
- Centralizam:
  - Autenticação
  - Permissionamento
  - HTTP client
  - UI
  - Tema
  - i18n

---

### 🔹 Separação de responsabilidades

| Camada        | Responsabilidade                                                        |
| ------------- | ----------------------------------------------------------------------- |
| root-config   | orquestra MFEs e inicializa recursos de autenticação + permissionamento |
| mfe-layout    | layout + navegação                                                      |
| mfe-auth      | login híbrido local + SSO                                               |
| mfe-dashboard | área protegida e permissionada                                          |
| mfe-forbidden | renderização página restrita                                            |
| shared-auth   | autenticação + permissionamento + API                                   |
| shared-ui     | UI + tema + i18n                                                        |

---

## 🧱 Arquitetura

### 📦 Microfrontends

---

```bash
root-config     → orquestração single-spa
mfe-auth        → login híbrido local + SSO
mfe-dashboard   → dashboard protegido e permissionado
mfe-layout      → layout e navegação
mfe-forbidden   → renderização página restrita
```

---

### 📦 Shared modules

---

### 🔐 shared-auth

Responsável por autenticação, permissionamento, estado global e comunicação com backend

```bash
shared-auth/
  auth/
    auth-guard                 → protege rotas privadas
    guest-guard                → protege login local + SSO para visitante
    auth-provider              → providers do módulo de autenticação
    auth-store                 → estado global de autenticação em memória
    auth-services              → chamadas de API de autenticação
    csrf-store                 → armazenamento do token CSRF em memória
    use-auth-store             → hook para consumir o auth-store no React
    use-auth-mutations         → login, register, logout com React Query
    use-bootstrap-auth         → resolve sessão inicial do usuário e inicializa interceptors

  http/
    api-client                 → instância base do cliente HTTP
    interceptors               → tratamento global de request/response

  permissions/
    auth-permissions           → utilitários de permissões
    permissions-guard          → proteção por permissão
    use-permission             → valida permissões do usuário autenticado

  query/
    query-client               → cliente global de cache e queries do React Query
```

---

### 🔐 shared-ui

Responsável por UI global, tema e internacionalização.

```bash
shared-ui/
  components/
    shared-ui/i18n           → internacionalização (idioma e tradução)
    i18n-provider            → provider do i18n na aplicação
    i18n-store               → estado global do idioma em memória
    i18n                     → configuração e instância do i18next
    use-locale               → hook para ler e alterar o idioma

shared-ui/
  providers/
    ui-provider              → provider para configuração de tema, i18n e estilos globais

shared-ui/
  theme/
    create-theme             → criação do tema (light/dark)
    mode-store               → estado global do modo de tema
    use-theme-mode           → hook para alternar e consumir o tema
```

---

## 🌐 Autenticação Híbrida

O frontend suporta dois fluxos:

---

### 🔐 Login Local

Fluxo tradicional:

```text
Frontend → Backend → PostgreSQL
```

Utilizando:

- email
- senha
- JWT local
- refresh token local

---

### 🔐 Login Federado (OIDC)

Fluxo:

```text
Frontend → Backend → Keycloak
```

Utilizando:

- Authorization Code Flow
- PKCE
- state validation

---

## 🔐 Segurança

### 🔐 OIDC Authorization Code Flow + PKCE

- No fluxo SSO o frontend utiliza autenticação baseada em **OpenID Connect (OIDC)** com:
  - **Authorization Code Flow**
  - **PKCE (Proof Key for Code Exchange)**
- O fluxo é realizado de forma segura entre frontend, Identity Provider (IdP) e backend.
- Tokens utilizados:
  - **access_token** → curto prazo
  - **refresh_token** → longo prazo
- Tokens e sessão são armazenados via cookies HTTP-only no backend.
- Proteção contra:
  - exposição de tokens no navegador
  - ataques de interceptação de código de autorização
  - XSS e token leakage

---

### 🛡 CSRF Protection

- Implementação baseada em **double-submit cookie**.

#### Fluxo

1. Frontend requisita:

```bash
GET /auth/csrf
```

2. Backend retorna:

```json
{ "csrfToken": "abc123" }
```

3. Frontend envia:

```bash
X-XSRF-TOKEN: <csrfToken>
```

#### Necessário para:

- POST
- PUT
- PATCH
- DELETE

---

### 🔄 Refresh Silencioso (Silent Refresh)

O backend renova tokens automaticamente sem interação do usuário.

### Funcionamento

1. Access token expira
2. Backend utiliza refresh token armazenado na sessão
3. Novo access token é obtido automaticamente
4. Sessão é atualizada de forma transparente

---

### Benefícios

- melhora UX
- evita logout frequente
- mantém sessão segura server-side
- reduz necessidade de novo login

---

### 🔐 Sistema de Permissionamento (PBAC)

O sistema utiliza controle de acesso baseado em permissões granulares (PBAC), ao invés de RBAC tradicional baseado em roles. Cada usuário possui permissões atribuídas diretamente, retornadas pelo backend através do endpoint:

```http
GET /auth/session
```

### Exemplo

```json
{
  "user": {
    "id": "uuid",
    "email": "user@email.com",
    "permissions": {
      "dashboard": {
        "view": true,
        "export": {
          "pdf": true,
          "excel": true
        }
      }
    }
  }
}
```

---

### 🔑 Controle de Permissões no Frontend

### Hook de permissão

```ts
const canExportPdf = usePermission("dashboard:export:pdf");
```

---

### Exibição condicional

```tsx
{
  canExportPdf && <ExportButton />;
}
```

---

### Permissionamento de rotas

```tsx
<PermissionGuard permission="dashboard:view">
  <DashboardPage />
</PermissionGuard>
```

---

### 🔒 Proteção de rotas

### AuthGuard (rotas privadas)

```bash
<AuthGuard>
  <Root />
</AuthGuard>
```

### GuestGuard (rotas públicas)

```bash
<GuestGuard>
  <Root />
</GuestGuard>
```

---

## 🌍 Internacionalização (i18n)

- Implementação
- react-i18next
- store global de idioma
- troca dinâmica em runtime

### Idiomas

```bash
pt-BR
en-US
```

---

## 🎨 Interface e UX

### Material UI

- Componentes reutilizáveis
- Tema centralizado
- Integração com tema global

### Dark Mode

- controlado via mode-store
- persistência de estado
- alternância global

---

## ⚡ Performance

### Estratégias aplicadas

- compartilhamento de libs via externals
- uso de peerDependencies
- redução de bundle duplicado
- lazy loading de MFEs
- cache inteligente com React Query

## 📦 Gerenciamento de estado e dados

### TanStack Query

- Cache automático
- Controle de loading e erro
- Invalidação de queries
- Refetch inteligente

### Axios

```ts
const apiClient = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});
```

#### Responsabilidades:

- comunicação com backend
- envio de cookies
- interceptors de refresh
- integração com CSRF

---

## 🧠 Root Config & Bootstrap de Autenticação

O projeto utiliza um **Root Config** com `single-spa` responsável pela inicialização global da aplicação e orquestração dos microfrontends.

### 🔐 Bootstrap Auth

Antes da renderização dos MFEs, o Root Config executa um processo de bootstrap de autenticação responsável por:

- inicializar a sessão do usuário e permissionamento
- validar estado autenticado/não autenticado
- obter token CSRF
- configurar interceptors HTTP globais

### ⏳ Loading Global Inicial

Durante o bootstrap da aplicação:

- um loading global é exibido
- os microfrontends ainda não são renderizados
- a aplicação aguarda a resolução da autenticação inicial

Após a conclusão do bootstrap:

- os MFEs são renderizados
- o estado autenticado já está sincronizado
- interceptors, sessão e permissionamento já estão configurados globalmente

Essa abordagem evita:

- flickering de autenticação
- renderização prematura de telas protegidas
- chamadas duplicadas de sessão
- race conditions entre microfrontends

---

## ⚙️ Requisitos

- Node.js >= 20
- NPM >= 9

---

## 🔧 Instalação

```bash
git clone <repo-url>
cd auth-hybrid-permissions-mfe-single-spa-react
npm install
```

---

## 🚀 Executando o projeto

### Desenvolvimento

```bash
npm start
```

### Portas dos microfrontends:

```bash
root-config   → 9000
shared-auth   → 9001
shared-ui     → 9002
mfe-auth      → 9003
mfe-layout    → 9004
mfe-dashboard → 9005
mfe-forbidden → 9006
```

---

### Produção

```bash
npm run build
npm run start
```

### 📊 Análise de bundle

#### Permite verificar:

- duplicação de dependências
- tamanho dos bundles
- oportunidades de otimização

```bash
npm run analyze
```
