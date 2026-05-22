# 🔐 Frontend IFMaker Login - Autenticação em React

Interface de autenticação moderna para a plataforma IFMaker, desenvolvida em **React** e **TypeScript** com segurança avançada.

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)

---

## 📋 Visão Geral

Frontend responsável pela autenticação da plataforma IFMaker, com suporte a login, registro, recuperação de senha e gerenciamento de sessão.

### ✨ Características

- ✅ Sistema de login seguro
- ✅ Registro de novos usuários
- ✅ Recuperação de senha
- ✅ Validação em tempo real
- ✅ JWT token management
- ✅ Sessão persistente
- ✅ Interface responsiva
- ✅ Proteção contra CSRF

---

## 🛠️ Tecnologias

- **React 18** - UI Library
- **TypeScript** - Type Safety
- **React Router v6** - Navigation
- **Axios** - HTTP Client
- **React Hook Form** - Validação
- **Zod** - Schema Validation
- **Tailwind CSS** - Estilização
- **JWT** - Autenticação

---

## 📂 Estrutura

```
front-ifmakerlogin/
├── src/
│   ├── components/
│   │   ├── LoginForm/
│   │   ├── RegisterForm/
│   │   ├── ForgotPasswordForm/
│   │   └── ProtectedRoute/
│   ├── pages/
│   │   ├── LoginPage/
│   │   ├── RegisterPage/
│   │   ├── ResetPasswordPage/
│   │   └── DashboardPage/
│   ├── services/
│   │   ├── authService.ts
│   │   ├── api.ts
│   │   └── tokenManager.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useForm.ts
│   ├── types/
│   │   └── auth.ts
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── App.tsx
│   └── index.tsx
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Como Usar

### 1️⃣ Clone

```bash
git clone https://github.com/ItaloGLS/front-ifmakerlogin.git
cd front-ifmakerlogin
```

### 2️⃣ Instale Dependências

```bash
npm install
```

### 3️⃣ Configure Variáveis

```bash
cat > .env << EOF
REACT_APP_API_URL=http://localhost:5000
REACT_APP_API_TIMEOUT=5000
EOF
```

### 4️⃣ Execute

```bash
npm start
```

---

## 🔐 Fluxo de Autenticação

### Login

```
1. Usuário preenche email/senha
2. Validação local (Zod schema)
3. Envio para API
4. Recebimento de JWT token
5. Armazenamento seguro
6. Redirecionamento para dashboard
```

### Registro

```
1. Usuário preenche formulário
2. Validação em tempo real
3. Envio para API
4. Confirmação de email
5. Redirecionamento para login
```

---

## 📋 Modelos

### User

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
}
```

### Auth Response

```typescript
interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
  expiresIn: number;
}
```

### Login Credentials

```typescript
interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}
```

---

## 🔑 Gerenciamento de Tokens

### Salvar Token

```typescript
function saveToken(token: string, expiresIn: number) {
  localStorage.setItem('token', token);
  localStorage.setItem('tokenExpiry', Date.now() + expiresIn * 1000);
}
```

### Recuperar Token

```typescript
function getToken(): string | null {
  const token = localStorage.getItem('token');
  const expiry = localStorage.getItem('tokenExpiry');
  
  if (!token || !expiry) return null;
  
  if (Date.now() > parseInt(expiry)) {
    clearToken();
    return null;
  }
  
  return token;
}
```

---

## 🎯 Componentes Principais

### LoginForm

```typescript
export const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* inputs */}
    </form>
  );
};
```

### ProtectedRoute

```typescript
export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};
```

---

## 🧪 Validação

### Schema Zod

```typescript
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres')
});

const registerSchema = z.object({
  name: z.string().min(3, 'Mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
  confirmPassword: z.string()
}).refine(
  data => data.password === data.confirmPassword,
  { message: 'Senhas não correspondem' }
);
```

---

## 🎨 Design

- Material Design 3
- Cores: Azul profissional
- Animações suaves
- Dark mode ready
- Responsivo

---

## 🔒 Segurança

- ✅ Validação de email
- ✅ Hash de senha
- ✅ CSRF Protection
- ✅ Rate limiting
- ✅ Refresh tokens
- ✅ Logout seguro
- ✅ Session timeout

---

## 📡 API Endpoints

```bash
POST /auth/login
POST /auth/register
POST /auth/logout
POST /auth/refresh
POST /auth/forgot-password
POST /auth/reset-password
GET /auth/me
```

---

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Coverage
npm run test:coverage

# E2E
npm run test:e2e
```

---

## 🚢 Deploy

### Vercel

```bash
vercel deploy
```

### Netlify

```bash
netlify deploy
```

---

## 📈 Melhorias Futuras

- [ ] OAuth2 (Google, GitHub)
- [ ] 2FA (Two Factor Authentication)
- [ ] Biometric login
- [ ] Social login
- [ ] Email verification
- [ ] Session management
- [ ] Device tracking

---

## 🐛 Issues

Reporte bugs [aqui](https://github.com/ItaloGLS/front-ifmakerlogin/issues).

---

## 📝 Licença

MIT License 📄

---

## 👨‍💻 Autor

**Ítalo GLS** - [@ItaloGLS](https://github.com/ItaloGLS)

---

<div align="center">

Frontend IFMaker Login: Autenticação Segura 🔐

*Desenvolvido com segurança em primeiro lugar*

</div>
