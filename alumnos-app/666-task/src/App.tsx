// Importamos los hooks de React que vamos a usar:
// - useState: para guardar y actualizar estado (datos que cambian)
// - useMemo: para calcular valores derivados solo cuando cambian ciertas dependencias
import { useMemo, useState } from "react";

// Importamos la lista inicial de estudiantes desde un archivo de datos.
// Es el estado con el que arrancará la aplicación.
import { initialStudents } from "./data/students";

// Importamos tipos de TypeScript:
// - AttendanceStatus: tipo que representa "present" | "late" | "absent"
// - Student: tipo que representa la estructura de un estudiante (id, nombre, asistencia, etc.)
import type { AttendanceStatus, Student } from "./types";

// Importamos componentes de la UI que ya hemos creado.
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import StudentCard from "./components/StudentCard";

// ------ Función auxiliar ------
// Esta función recibe un estudiante y devuelve su estado de asistencia actual.
// Se asume que el estado "actual" es el del último registro en el array `attendance`.
const getCurrentStatus = (student: Student): AttendanceStatus => {
  // Obtenemos el último elemento del array de asistencia.
  const last = student.attendance[student.attendance.length - 1];

  // Si existe `last`, devolvemos su status. Si no existe (no hay registros),
  // devolvemos "absent" por defecto usando el operador ?? (nullish coalescing).
  return last?.status ?? "absent";
};

// ------ Componente principal de la aplicación ------
export default function App() {
  // Estado principal de la app: lista de estudiantes.
  // Empezamos con los datos importados desde initialStudents.
  // `students` es el valor actual y `setStudents` es la función para actualizarlo.
  const [students, setStudents] = useState<Student[]>(initialStudents);

  // Estado para el término de búsqueda (el texto que el usuario escribe en el buscador).
  const [searchTerm, setSearchTerm] = useState("");

  // Función para cambiar el estado de asistencia de un estudiante concreto.
  // Recibe:
  // - id: id del estudiante al que queremos cambiar el estado
  // - status: nuevo estado de asistencia ("present" | "late" | "absent")
  const changeStatus = (id: string, status: AttendanceStatus) => {
    // Llamamos a setStudents pasando una función que recibe el estado anterior (prev).
    // Esto es la forma recomendada cuando el nuevo estado depende del anterior.
    setStudents((prev) =>
      // Recorremos todos los estudiantes con map.
      prev.map((s) =>
        // Si el id del estudiante coincide con el id que nos pasaron...
        s.id === id
          ? {
              // ...creamos una copia del estudiante usando spread operator
              ...s,
              // y actualizamos su array de attendance.
              attendance: s.attendance.map((a, index, arr) =>
                // Buscamos el ÚLTIMO registro de asistencia (index === arr.length - 1)
                // y solo modificamos ese.
                index === arr.length - 1
                  ? { ...a, status } // copiamos el registro y cambiamos el status
                  : a // para los demás registros, los dejamos tal cual
              ),
            }
          // Si el id no coincide, devolvemos el estudiante sin cambios.
          : s
      )
    );
  };

  // Calculamos estadísticas (present, late, absent, total) usando useMemo para optimizar.
  // useMemo solo recalculará estas estadísticas cuando cambie el array `students`.
  const stats = useMemo(() => {
    // Inicializamos contadores.
    let present = 0;
    let late = 0;
    let absent = 0;

    // Recorremos todos los estudiantes.
    students.forEach((s) => {
      // Obtenemos su estado actual usando la función auxiliar.
      const st = getCurrentStatus(s);

      // Según el estado, incrementamos el contador correspondiente.
      if (st === "present") present++;
      else if (st === "late") late++;
      else absent++;
    });

    // Devolvemos un objeto con todos los datos que necesita SummaryCards.
    return {
      total: students.length,
      present,
      absent,
      late,
    };
    // Dependencias de useMemo: solo se recalcula cuando `students` cambia.
  }, [students]);

  // Calculamos la lista de estudiantes filtrados según el término de búsqueda.
  // También usamos useMemo para evitar recalcular en cada render innecesariamente.
  const filteredStudents = useMemo(() => {
    // Normalizamos el término de búsqueda: quitamos espacios y pasamos a minúsculas.
    const term = searchTerm.trim().toLowerCase();

    // Si el término está vacío, devolvemos todos los estudiantes.
    if (!term) return students;

    // Si hay término de búsqueda, filtramos por nombre del estudiante.
    return students.filter((s) => s.name.toLowerCase().includes(term));
    // Esta lógica se recalcula cuando cambia `students` o `searchTerm`.
  }, [students, searchTerm]);

  // ------ Render del componente App ------
  return (
    // Contenedor principal de toda la aplicación.
    // min-h-screen: al menos ocupa toda la altura de la pantalla.
    // bg-slate-100: fondo gris claro.
    // text-slate-900: texto gris oscuro por defecto.
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Barra superior de la aplicación */}
      <Header />

      {/* Contenido principal */}
      <main className="max-w-6xl mx-auto px-4 py-6 pb-10">
        {/* Tarjetas de resumen de asistencia.
            Usamos spread operator {...stats} para pasar:
            total={stats.total}, present={stats.present}, etc. */}
        <SummaryCards {...stats} />

        {/* Barra de búsqueda de estudiantes */}
        <div className="mt-6 flex justify-end">
          {/* Contenedor del input de búsqueda */}
          <div className="relative w-full sm:w-72">
            {/* Icono de lupa dentro del input, posicionado de forma absoluta.
                pointer-events-none: el icono no captura clics del ratón. */}
            <span className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.35-4.35M5 11a6 6 0 1 1 12 0 6 6 0 0 1-12 0Z"
                />
              </svg>
            </span>

            {/* Campo de texto para buscar por nombre de estudiante.
                Es un "controlled component":
                - value viene del estado searchTerm.
                - onChange actualiza ese estado con setSearchTerm. */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search student name..."
              className="w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Sección que contiene la cuadrícula de tarjetas de estudiantes */}
        <section className="mt-6">
          {/* Grid responsive:
              - grid-cols-1: 1 columna en móvil
              - sm:grid-cols-3: 3 columnas en pantallas pequeñas en adelante
              - gap-4: espacio entre las tarjetas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Recorremos la lista de estudiantes filtrados
                y renderizamos un StudentCard por cada uno. */}
            {filteredStudents.map((s) => (
              <StudentCard
                key={s.id}                 // key única requerida por React en listas
                student={s}                // pasamos los datos del estudiante
                status={getCurrentStatus(s)} // estado actual calculado
                onChangeStatus={changeStatus} // función para cambiar el estado
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
