Attendance Dashboard – Proyecto React + Vite + Tailwind CSS

Este proyecto implementa un panel de control para la gestión de asistencia de estudiantes.
La aplicación muestra estadísticas globales (present, absent, late), un buscador y una cuadrícula de tarjetas de alumnos donde se puede actualizar su estado.

El diseño está basado en los ejemplos proporcionados por el profesor y adaptado para uso en pantallas móviles y de escritorio.

1. Requisitos previos

Antes de instalar el proyecto, es necesario disponer de:

Node.js (versión recomendada: 18 o superior)

Puede descargarse desde:

https://nodejs.org/

Para comprobar la instalación:

node -v
npm -v

2. Instalación del proyecto

Clonar o descargar el repositorio y acceder a la carpeta principal del proyecto.

Instalar las dependencias con:

npm install


Esto descargará todos los módulos necesarios indicados en package.json.

3. Dependencias utilizadas

El proyecto utiliza las siguientes tecnologías:

Dependencias principales

React (biblioteca de componentes)

React DOM (renderizado en navegador)

TypeScript (tipado estático)

Vite (entorno de desarrollo y compilación)

Tailwind CSS (estilos mediante utilidades)

@tailwindcss/cli (compilación del CSS con el sistema de Tailwind v4)

Dependencias de desarrollo

PostCSS

Autoprefixer

Estas herramientas permiten generar el CSS final, compilar los archivos TypeScript y ejecutar el servidor de desarrollo.

4. Compilación de Tailwind CSS

Tailwind se compila utilizando el CLI oficial.


5. Ejecución del servidor de desarrollo

Para iniciar Vite, ejecutar:

npm run dev


Esto iniciará un servidor local normalmente disponible en:

http://localhost:5173


La página se recargará automáticamente al guardar cambios en los archivos.
