// Definimos los tipos de datos que el componente necesita recibir.
// Cada uno es un número:
// - total: número total de estudiantes
// - present: cuántos están presentes
// - absent: cuántos están ausentes
// - late: cuántos llegaron tarde
interface SummaryCardsProps {
  total: number;
  present: number;
  absent: number;
  late: number;
}

// Componente principal SummaryCards.
// Recibe los cuatro números anteriores como props.
export default function SummaryCards({
  total,
  present,
  absent,
  late,
}: SummaryCardsProps) {

  // El componente devuelve una sección que contiene 4 tarjetas (cards),
  // una para cada métrica.
  return (
    <section className="grid gap-4 sm:grid-cols-4">
      {/*
        La clase "grid" convierte el contenedor en una rejilla.
        gap-4 → espacio entre tarjetas.
        sm:grid-cols-4 → en pantallas pequeñas (sm o más), muestra 4 columnas.
        En pantallas móviles se verá una card encima de otra.
      */}

      {/* ---------------------------------
          TARJETA 1: Total Students
      ------------------------------------ */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4">
        {/* Título pequeño */}
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          Total Students
        </p>

        {/* Número principal */}
        <p className="mt-2 text-3xl font-semibold text-slate-900">
          {total}
        </p>
      </div>

      {/* ---------------------------------
          TARJETA 2: Present
      ------------------------------------ */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          Present
        </p>
        {/* En verde para indicar presencia */}
        <p className="mt-2 text-3xl font-semibold text-emerald-500">
          {present}
        </p>
      </div>

      {/* ---------------------------------
          TARJETA 3: Absent
      ------------------------------------ */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          Absent
        </p>
        {/* En rojo para ausencias */}
        <p className="mt-2 text-3xl font-semibold text-rose-500">
          {absent}
        </p>
      </div>

      {/* ---------------------------------
          TARJETA 4: Late
      ------------------------------------ */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          Late
        </p>
        {/* En amarillo/ámbar para tardanzas */}
        <p className="mt-2 text-3xl font-semibold text-amber-500">
          {late}
        </p>
      </div>
    </section>
  );
}
