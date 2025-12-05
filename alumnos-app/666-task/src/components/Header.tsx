// Exportamos el componente por defecto para poder importarlo desde otros archivos
export default function Header() {

  // Todo lo que está dentro del return es lo que React va a mostrar en pantalla
  return (
    // <header> es una etiqueta semántica de HTML usada para colocar cabeceras
    // className se usa en React para aplicar clases de TailwindCSS
    <header className="bg-white border-b border-slate-200">

      {/* Contenedor interno que organiza el contenido del header */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">

        {/* --------------------------------------------
            SECCIÓN IZQUIERDA DEL HEADER
            Icono de "escuela" + título del dashboard
        --------------------------------------------- */}
        <div className="flex items-center gap-2">

          {/* Icono de Material Symbols (Google Icons)
              El contenido "school" indica qué icono mostrar */}
          <span className="material-symbols-outlined text-blue-500 text-3xl">
            school
          </span>

          {/* Texto que funciona como el título del dashboard */}
          <span className="text-sm font-semibold text-slate-800">
            Attendance Dashboard
          </span>
        </div>

        {/* --------------------------------------------
            SECCIÓN DERECHA DEL HEADER
            Botón circular que muestra un icono de usuario
        --------------------------------------------- */}
        <button
          className="h-8 w-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-600"
        >
          {/* Icono del usuario */}
          <span className="material-symbols-outlined text-lg">
            person
          </span>
        </button>

      </div>
    </header>
  );
}
