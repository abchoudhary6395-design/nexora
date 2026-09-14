import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { leadSourceData, PIE_COLORS } from '../../pages/Analytics/analyticsData';

export default function LeadSourceChart() {
  return (
    <div className="nx-panel">
      <div className="nx-panel__header"><h4>Lead Sources</h4></div>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={leadSourceData}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
          >
            {leadSourceData.map((entry, i) => (
              <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="none" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--fs-xs)',
            }}
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 'var(--fs-xs)' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
