## Refund Web (Frontend)

React frontend application for managing refund requests with authentication, role-based authorization (employee/manager), receipt file upload, and a manager dashboard. This project consumes the API provided by the backend.

- Backend: [refund_api](https://github.com/diegocoelho-svg/refund_api)

### Tech Stack
- React 19 + Vite
- TypeScript
- React Router 7
- Tailwind CSS 4 (`@tailwindcss/vite`)
- Axios
- Zod

### Features
- JWT authentication (login and session persistence via `localStorage`)
- Role-based access control
  - Employee: create refund requests and confirm submission
  - Manager: view all requests and access details
- File upload (receipts) attached to the request
- Paginated listing and search

### Folder Structure
```
src/
  assets/         # Icons/images
  components/     # Shared components (Button, Input, Select, Upload, etc.)
  contexts/       # Authentication context
  dtos/           # Type definitions
  hooks/          # Hooks (e.g., useAuth)
  pages/          # Pages (SignIn, SignUp, Refund, Dashboard, Confirm, NotFound)
  routes/         # Routes per role (Auth, Employee, Manager)
  services/       # API integration (axios)
  utils/          # Utilities (formatters, class merge, categories)
```

### API Integration
- API base URL is set in `src/services/api.ts`:

```1:5:src/services/api.ts
import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:3333"
})
```

- Adjust the `baseURL` to match where your backend is running.
- Endpoints, models, and roles are defined in the backend. See the repository: [refund_api](https://github.com/diegocoelho-svg/refund_api).

Main route groups (see `src/routes`):
- Unauthenticated: `AuthRoutes` (SignIn, SignUp)
- Employee: `EmployeeRoutes` (`/` → `Refund`, `/confirm`)
- Manager: `ManagerRoutes` (`/` → `Dashboard`, `/refund/:id`)

### Prerequisites
- Node.js 18+

### Setup and Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. (Optional) Update the API `baseURL` in `src/services/api.ts` if needed.
3. Start development server:
   ```bash
   npm run dev
   ```
   - Vite will start the dev server (by default at `http://localhost:5173`).

### Scripts
- `npm run dev`: development server
- `npm run build`: production build (TypeScript + Vite)
- `npm run preview`: preview the production build

### Styling
- Tailwind CSS 4 via Vite plugin (`@tailwindcss/vite`). Config in `vite.config.ts`.

```1:10:vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss()
  ],
})
```

### Authentication and Session
- Token and authenticated user are stored under `@refund` in `localStorage`.
- The `Authorization: Bearer <token>` header is applied automatically by `AuthContext` after login.

### Pages
- `SignIn` and `SignUp`: authentication and registration
- `Refund` (employee): create requests (name, amount, category, upload)
- `Confirm` (employee): submission confirmation
- `Dashboard` (manager): list and access request details
- `NotFound`: default route for unknown paths

### Referenced Backend
- Official API with JWT auth, roles, and uploads:
  - [refund_api](https://github.com/diegocoelho-svg/refund_api)
  - Tech: Node.js, Express, TypeScript, Prisma, SQLite, Multer, Zod, JWT
  - Endpoints: `/sessions`, `/users`, `/refunds`, `/uploads` (see backend README)

### Production Build
```bash
npm run build
```
Output in `dist/`. Serve the static files with your preferred web server.

### Deployment Tips
- Update the API `baseURL` to your production domain/host.
- Ensure CORS is enabled on the backend for the frontend domain.


