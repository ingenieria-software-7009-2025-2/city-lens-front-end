# React + TypeScript + Vite

## 1. Creación de Carpetas

Se crearon diversas carpetas con el objetivo de mejorar la legibilidad, organización y escalabilidad del código. Esta estructura permite dividir el código en componentes y funcionalidades específicas, facilitando el mantenimiento y la colaboración en equipo.

### Estructura de Carpetas

### 1. Carpeta `api`

- **Descripción**: Contiene toda la lógica relacionada con las llamadas a APIs (servicios externos o backend).
- **Contenido**:
  - Configuración de Axios o Fetch.
  - Definición de endpoints (rutas de la API).
  - Funciones para realizar solicitudes (GET, POST, PUT, DELETE).
- **Ejemplo**:
  ```typescript
  // api/auth.ts
  export const login = async (credentials: {
    email: string;
    password: string;
  }) => {
    const response = await axios.post("/auth/login", credentials);
    return response.data;
  };
  ```

### 2. Carpeta `assets`

- **Descripción**: Almacena recursos estáticos como imágenes, íconos, fuentes y estilos globales.

- **Subcarpetas**:

  - **`styles`**:
    - Archivos SCSS, CSS o archivos de estilos globales.
    - Variables globales, mixins y estilos reutilizables.
    - **Ejemplo**:
      ```scss
      // assets/styles/_variables.scss
      $primary-color: #3498db;
      $secondary-color: #2ecc71;
      ```
  - **`images`**:
    - Imágenes utilizadas en la aplicación (logos, íconos, banners, etc.).
    - **Ejemplo**: `logo.png`, `background.jpg`.
  - **`fonts`** (opcional):
    - Fuentes personalizadas utilizadas en el proyecto.
    - **Ejemplo**: `Roboto.ttf`, `OpenSans.woff2`.

### 3. Carpeta `components`

- **Descripción**: Contiene componentes reutilizables de la aplicación. Cada componente es independiente y puede ser utilizado en múltiples partes del proyecto.
- **Organización**:
  - Cada componente tiene su propia carpeta con su archivo `.tsx` (TypeScript) y su archivo de estilos (si es necesario).
  - Los nombres de las carpetas y componentes siguen la convención PascalCase (por ejemplo, `Button`, `Header`).
- **Estructura típica de un componente**:
  components/
  ├── ui/ // Componentes de UI reutilizables
  │ ├── Button/
  │ │ ├── Button.tsx // Lógica y estructura del componente
  │ │ ├── Button.module.scss // Estilos específicos del componente
  │ ├── Input/
  │ │ ├── Input.tsx
  │ │ ├── Input.module.scss

### 4. Carpeta `context`

- **Descripción**: Almacena los contextos de React para manejar el estado global de la aplicación. Los contextos son útiles para compartir datos entre componentes sin necesidad de pasar props manualmente.
- **Organización**:
  - Cada contexto tiene su propio archivo `.tsx` dentro de la carpeta context.
  - Los nombres de los archivos suelen seguir la convención NombreContext.tsx (por ejemplo, `AuthContext.tsx`).
- **Estructura típica de un componente**:

  - AuthContext.tsx : Contexto para manejar la autenticación

### 5. Carpeta `hooks`

- **Descripción**: Contiene hooks personalizados para reutilizar lógica en toda la aplicación. Los hooks permiten encapsular lógica compleja y compartirla entre componentes.
- **Organización**:
  - Cada hook tiene su propio archivo `.ts` dentro de la carpeta hooks.
  - Los nombres de los archivos suelen seguir la convención `useNombreHook.ts` (por ejemplo, `useFetch.ts`).
- **Estructura típica de un componente**:
  hooks/
  ├── useFetch.ts // Hook para realizar peticiones HTTP
  ├── useAuth.ts // Hook para manejar la lógica de autenticación
  ├── useLocalStorage.ts // Hook para interactuar con el localStorage

### 6. Carpeta `pages`

- **Descripción**: Contiene los componentes que representan las páginas de la aplicación. Cada página es un componente que puede utilizar otros componentes reutilizables.
- **Organización**:
  - Cada página tiene su propia carpeta con su archivo .tsx y su archivo de estilos (si es necesario).
  - Los nombres de las carpetas y archivos siguen la convención PascalCase (por ejemplo, `login.tsx`, `Home.tsx`).
- **Estructura típica de un componente**:
  pages/
  ├── Login/
  │ ├── login.tsx // Página de Login
  │ ├── Login.module.scss // Estilos específicos de la página de Login
  ├── Home/
  │ ├── Home.tsx // Página de inicio
  │ ├── Home.module.scss // Estilos específicos de la página de inicio
  ├── Dashboard/
  │ ├── Dashboard.tsx // Página del dashboard
  │ ├── Dashboard.module.scss // Estilos específicos del dashboard
