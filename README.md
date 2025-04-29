# city-lens-frontend

City Lens es una WebApp de Reportes Urbanos. Este es el frontend de la aplicación.

| Alumno                         | No. Cuenta | Nombre de Usuario |
| :----------------------------- | :--------: | ----------------: |
| Edgar José Reyes Montelongo    | 319023275  |   EdgarMontelongo |
| Ángel Moisés González Corrales | 320234619  |         MoisesAGC |
| Israel Rivera                  | 320490747  |         Orbitalx1 |
| Paredes Zamudio Luis Daniel    | 318159926  |        wallsified |

## Ejecución e Instalación

1. Se necesita tener Node.js >= 22.14.0 (con `npm`) y PostgreSQL >=17.4 instalados.
2. Se descarga el repositorio y se ingresa a la carpeta raíz.
3. Se ejecutan los siguientes comandos en la terminal.

```bash
# Verificar la versión de Node.js:
node -v # Debe imprimir "v22.14.0".
nvm current # Debe imprimir "v22.14.0".
# Verify npm version:
npm -v # Debe imprimir "10.9.2".
npm install # Tomará la información de package-lock.json y package.json para instalar las dependencias.
```

4. En el archivo `src/main/resources/META-INF/persistence.xml` se debe de editar en la última linea la contraseña para conectarse la BD.
5. Se ejecuta lo siguiente:

```bash
npm run dev # Mostrará en pantalla la dirección del servidor local
```
Se espera que esta dirección sea `http://localhost:5173/`.

Para unir el backend, se siguen las instrucciones de [este repositorio](https://github.com/ingenieria-software-7009-2025-2/city-lens-api)

## Documentación del Proyecto

Para poder visualizar la interfaz de Storybook, se debe ejecutar el siguiente comando en la terminal:

```bash
npm run storybook
```

Esto mostrará una dirección en `localhost` a la que se puede acceder para mostrar el funcionamiento de los
componentes creados en el proyecto e interactuar con ellos sin necesidad de hacer modificaciones directas al
código del mismo. Se espera que esta dirección sea `http://localhost:6006/` pero podría variar.
