// Importamos el tipo "AttendanceStatus" desde otro archivo.
// Este tipo probablemente define algo como: "present" | "late" | "absent".
import type { AttendanceStatus } from "../types";

// Definimos la interfaz (tipo de datos) que debe recibir este componente.
// Aquí decimos que este componente recibe una propiedad (prop) llamada "status"
// y que su valor debe ser uno de los definidos en AttendanceStatus.
interface StatusBadgeProps {
  status: AttendanceStatus;
}

// Creamos un objeto que asocia cada estado con una etiqueta de texto.
// Este objeto sirve para mostrar el texto correcto según el estado recibido.
const LABELS: Record<AttendanceStatus, string> = {
  present: "Present",
  late: "Late",
  absent: "Absent",
};

// Componente principal StatusBadge.
// Recibe un objeto con la prop "status" y lo desestructura directamente.
export default function StatusBadge({ status }: StatusBadgeProps) {

  // BASE: clases de Tailwind que SIEMPRE se aplican al badge sin importar el estado.
  const base =
    "inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium border";

  // COLORS: selecciona las clases de color dependiendo del estado.
  // - Si status === "present": usa tonos verdes
  // - Si status === "late": usa tonos amarillos
  // - Si no (es "absent"): usa tonos rojos
  //
  // Esta estructura es un operador ternario encadenado.
  const colors =
    status === "present"
      ? " bg-emerald-50 text-emerald-600 border-emerald-200"
      : status === "late"
      ? " bg-amber-50 text-amber-600 border-amber-200"
      : " bg-rose-50 text-rose-600 border-rose-200";

  // Render del componente:
  // Creamos un <span> que mezcla las clases base + las clases de color según el estado.
  // El contenido del span es la etiqueta correspondiente (Present, Late o Absent).
  return <span className={base + colors}>{LABELS[status]}</span>;
}
