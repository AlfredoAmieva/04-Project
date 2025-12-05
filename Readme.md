dance-dashboard


Instala las dependencias:

npm install

▶️ Ejecutar en modo desarrollo
npm run dev


La aplicación estará disponible (por defecto) en:

http://localhost:5173/

🧱 Estructura del proyecto
src/
 ├── components/
  │    ├── Header.tsx
   │    ├── SummaryCards.tsx
    │    ├── StudentCard.tsx
     │    ├── StudentRow.tsx
      │    └── StatusBadge.tsx
       │
        ├── data/
	 │    └── students.ts
	  │
	   ├── types/
	    │    └── index.ts
	     │
	      ├── App.tsx
	       ├── main.tsx
	        └── index.css

🗂️ Descripción general del funcionamiento
Estado global

El componente App gestiona:

La lista de estudiantes (students)

El término de búsqueda (searchTerm)

A partir de estos datos se calculan:

Estadísticas de asistencia (present, absent, late, total) mediante useMemo

Lista filtrada de estudiantes según el texto de búsqueda

Cambio de estado de asistencia

Los componentes hijo (StudentCard, StudentRow) llaman a la función:

onChangeStatus(id, newStatus)


En el caso de StudentCard, se actualiza el último registro de asistencia de ese estudiante dentro del estado global de App, respetando la inmutabilidad de los datos.

UI responsive

En dispositivos móviles: las tarjetas de estudiantes se muestran en una sola columna.

En pantallas más grandes: se muestran en una cuadrícula de 3 columnas.

Se utiliza TailwindCSS para lograr un diseño limpio y moderno.

🧪 Construir para producción
npm run build


Esto generará la carpeta:

dist/


Lista para desplegar en servicios como:

Vercel

Netlify

GitHub Pages

Cloudflare Pages~