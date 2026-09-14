import { FiDollarSign, FiUsers, FiTarget, FiCheckSquare } from 'react-icons/fi';
import KPIWidget from '../../components/common/KPIWidget';
import RevenueChart from '../../components/Dashboard/RevenueChart';
import ActivityTimeline from '../../components/Dashboard/ActivityTimeline';
import { useAuth } from '../../contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <div className="nx-dash__welcome">
        <h2>Good to see you{user?.name ? `, ${user.name.split(' ')[0]}` : ''}.</h2>
        <p>Here's what's happening across your business today.</p>
      </div>

      <div className="nx-dash__kpi-grid">
        <KPIWidget label="Revenue (MTD)" value="$68,420" delta={12.4} icon={<FiDollarSign size={16} />} to="/reports" />
        <KPIWidget label="Active Customers" value="1,284" delta={4.1} icon={<FiUsers size={16} />} to="/customers" />
        <KPIWidget label="Open Deals" value="46" delta={-2.3} icon={<FiTarget size={16} />} to="/deals" />
        <KPIWidget label="Tasks Due Today" value="9" delta={0} icon={<FiCheckSquare size={16} />} to="/tasks" />
      </div>

      <div className="nx-dash__main-grid">
        <RevenueChart />
        <ActivityTimeline />
      </div>
    </div>
  );
}
