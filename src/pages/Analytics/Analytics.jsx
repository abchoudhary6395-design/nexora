import KPIWidget from '../../components/common/KPIWidget';
import LeadSourceChart from '../../components/Analytics/LeadSourceChart';
import ConversionFunnelChart from '../../components/Analytics/ConversionFunnelChart';
import MonthlyComparisonChart from '../../components/Analytics/MonthlyComparisonChart';
import TopSalespeopleChart from '../../components/Analytics/TopSalespeopleChart';
import { FiTrendingUp, FiPercent, FiUserPlus, FiTarget } from 'react-icons/fi';

export default function Analytics() {
  return (
    <div>
      <div className="nx-page-header">
        <h2>Analytics</h2>
      </div>

      <div className="nx-dash__kpi-grid">
        <KPIWidget label="Conversion Rate" value="13.8%" delta={2.1} icon={<FiPercent size={16} />} />
        <KPIWidget label="New Customers (MTD)" value="86" delta={9.4} icon={<FiUserPlus size={16} />} />
        <KPIWidget label="Avg Deal Size" value="$4,280" delta={-1.2} icon={<FiTarget size={16} />} />
        <KPIWidget label="Revenue Growth" value="18.6%" delta={18.6} icon={<FiTrendingUp size={16} />} />
      </div>

      <div className="nx-analytics-grid">
        <LeadSourceChart />
        <ConversionFunnelChart />
        <MonthlyComparisonChart />
        <TopSalespeopleChart />
      </div>
    </div>
  );
}
