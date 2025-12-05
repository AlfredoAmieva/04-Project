// Importamos dos tipos desde types:
// - AttendanceStatus: probablemente "present" | "late" | "absent"
// - Student: un tipo que describe un estudiante (id, nombre, imagen, etc.)
import type { AttendanceStatus, Student } from "../types";

// Importamos el componente que muestra un badge con el estado de asistencia
import StatusBadge from "./StatusBadge";

// Definimos las props que este componente necesita recibir.
// - student: un objeto Student con name, id, image...
// - status: el estado de asistencia actual para este estudiante
// - onChangeStatus: una función que permite notificar al componente padre
//   cuando el usuario cambie el estado de asistencia.
interface Props {
  student: Student;
  status: AttendanceStatus;
  onChangeStatus: (id: string, status: AttendanceStatus) => void;
}

// Componente principal StudentCard
// Recibe las props y las desestructura para usarlas directamente.
export default function StudentCard({ student, status, onChangeStatus }: Props) {

  // current guarda el estado actual del estudiante.
  // Esto hace el código más legible.
  const current: AttendanceStatus = status;

  // handleClick es la función que se ejecuta cuando se pulsa uno de los botones
  // (Present / Absent / Late). Llama a la función recibida via props
  // para notificar al componente padre.
  const handleClick = (newStatus: AttendanceStatus) => {
    onChangeStatus(student.id, newStatus);
  };

  // buttonClasses es una función que recibe un estado (s)
  // y devuelve un string con las clases de Tailwind.
  // Si el estado ES el actual (selected), el botón aparece "activo".
  // Si NO lo es, aparece como botón normal.
  const buttonClasses = (s: AttendanceStatus) =>
    `flex-1 min-w-0 px-2 py-1.5 text-[11px] rounded-full font-medium border text-center leading-tight transition ${
      current === s
        ? "bg-blue-600 text-white border-blue-600 shadow-sm" // botón activo
        : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200" // botón inactivo
    }`;

  // ---------------------------------------
  // Render del componente
  // ---------------------------------------
  return (
    <article className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4 flex flex-col gap-3">
      {/* -------------------------------------
          PARTE SUPERIOR DEL CARD
          Muestra:
          - avatar del estudiante
          - nombre
          - ID
          - badge del estado actual
      ---------------------------------------- */}
      <div className="flex items-center justify-between gap-3">
        
        {/* Contenedor del avatar + info del estudiante */}
        <div className="flex items-center gap-3 min-w-0">

          {/* Imagen del estudiante */}
          <img
            src={student.image}
            alt={student.name}
            className="h-10 w-10 rounded-full object-cover"
          />

          {/* Nombre y ID */}
          <div className="text-left min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">
              {student.name}
            </p>
            <p className="text-xs text-slate-500 truncate">ID: {student.id}</p>
          </div>
        </div>

        {/* Badge con el estado actual (Present / Late / Absent) */}
        <StatusBadge status={current} />
      </div>

      {/* -------------------------------------
          PARTE INFERIOR DEL CARD:
          Botones para cambiar el estado
      ---------------------------------------- */}
      <div className="flex gap-2 pt-1 w-full min-w-0">

        {/* Botón: Present */}
        <button
          type="button"
          onClick={() => handleClick("present")}
          className={buttonClasses("present")}
        >
          Present
        </button>

        {/* Botón: Absent */}
        <button
          type="button"
          onClick={() => handleClick("absent")}
          className={buttonClasses("absent")}
        >
          Absent
        </button>

        {/* Botón: Late */}
        <button
          type="button"
          onClick={() => handleClick("late")}
          className={buttonClasses("late")}
        >
          Late
        </button>
      </div>
    </article>
  );
}
