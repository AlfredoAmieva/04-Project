// Importamos tipos necesarios desde el archivo de tipos:
// - AttendanceStatus: "present" | "late" | "absent"
// - Student: describe un alumno (id, nombre, email, imagen, asistencia…)
import type { AttendanceStatus, Student } from '../types';

// Importamos el componente que muestra el badge del estado (Present/Late/Absent)
import StatusBadge from './StatusBadge';

// Definimos las props que debe recibir StudentRow.
// Cada fila necesita:
// - student: el alumno
// - date: la fecha actual que se está visualizando
// - onChangeStatus: función que se ejecutará cuando el usuario cambie la asistencia del alumno
interface Props {
  student: Student;
  date: string;
  onChangeStatus: (id: string, date: string, status: AttendanceStatus) => void;
}

// Componente principal StudentRow
export default function StudentRow({ student, date, onChangeStatus }: Props) {

  // Buscamos en el array de attendance del estudiante si existe un registro para la fecha dada.
  // student.attendance es una lista de objetos { date, status }
  const record = student.attendance.find((a) => a.date === date);

  // current guarda el estado actual del alumno en esa fecha.
  // Si no existe registro para ese día, se considera automáticamente "absent".
  const current: AttendanceStatus = record?.status ?? 'absent';

  // Función que se ejecuta cuando se hace click en un botón de estado.
  // Llama a la función del padre con (id del alumno, fecha, nuevo estado).
  const handleClick = (status: AttendanceStatus) => {
    onChangeStatus(student.id, date, status);
  };

  // -----------------------------------------------
  // Render del componente
  // -----------------------------------------------
  return (
    <div className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">

      {/* -----------------------------------------------
          BLOQUE IZQUIERDO: Información del alumno
      ------------------------------------------------- */}
      <div className="flex items-center gap-3">
        
        {/* Foto del alumno */}
        <img
          src={student.image}
          alt={`Avatar de ${student.name}`}
          className="h-10 w-10 rounded-full object-cover border border-slate-700"
        />

        {/* Datos del alumno */}
        <div>
          {/* Nombre */}
          <p className="text-sm font-medium text-slate-50">{student.name}</p>

          {/* ID del alumno */}
          <p className="text-xs text-slate-400">ID: {student.id}</p>

          {/* Correo electrónico */}
          <p className="text-xs text-slate-500">{student.email}</p>
        </div>
      </div>

      {/* ----------------------------------------------------
          BLOQUE DERECHO (CONTROLES)
          Incluye:
          - Estado actual (StatusBadge)
          - Botones para cambiar estado
          Es responsive: en pantallas pequeñas se apilan,
          en pantallas grandes se alinean en fila.
      ------------------------------------------------------ */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">

        {/* Muestra el badge con el estado actual de asistencia */}
        <StatusBadge status={current} />

        {/* Contenedor de botones */}
        <div className="flex flex-wrap gap-1">

          {/* Botón: Presente */}
          <button
            type="button"
            onClick={() => handleClick('present')}
            className={`px-2.5 py-1 text-xs rounded-lg border transition ${
              current === 'present'
                ? 'bg-emerald-500 text-emerald-950 border-emerald-400' // activo
                : 'border-slate-700 text-slate-200 hover:bg-slate-800'    // inactivo
            }`}
          >
            Presente
          </button>

          {/* Botón: Tarde */}
          <button
            type="button"
            onClick={() => handleClick('late')}
            className={`px-2.5 py-1 text-xs rounded-lg border transition ${
              current === 'late'
                ? 'bg-amber-500 text-amber-950 border-amber-400'
                : 'border-slate-700 text-slate-200 hover:bg-slate-800'
            }`}
          >
            Tarde
          </button>

          {/* Botón: Ausente */}
          <button
            type="button"
            onClick={() => handleClick('absent')}
            className={`px-2.5 py-1 text-xs rounded-lg border transition ${
              current === 'absent'
                ? 'bg-rose-500 text-rose-950 border-rose-400'
                : 'border-slate-700 text-slate-200 hover:bg-slate-800'
            }`}
          >
            Ausente
          </button>
        </div>
      </div>
    </div>
  );
}
