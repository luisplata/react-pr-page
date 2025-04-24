import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { format, parseISO } from 'date-fns';

export default function VisitsBarChart({ data, label }) {
  // Detectar si el formato de fecha es diario o mensual
  const isMonthly = data[0]?.date?.length === 7;

  // Formatear las fechas para mostrar en el eje X
  const formattedData = data.map(item => ({
    ...item,
    label: isMonthly
      ? format(parseISO(`${item.date}-01`), 'MMM yyyy') // Ej: Mar 2025
      : format(parseISO(item.date), 'dd MMM'),           // Ej: 23 Mar
  }));

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3>{label}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData} margin={{ top: 10, right: 20, left: 0, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total_visits" fill="var(--special-color)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
