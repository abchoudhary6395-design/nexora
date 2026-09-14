import { FiTool } from 'react-icons/fi';
import EmptyState from '../EmptyState';

/**
 * Temporary placeholder rendered for modules whose routes exist
 * but whose full UI hasn't been implemented in this build pass yet.
 * Swap each usage out for the real page as that module is built —
 * see the project's CONTINUE FROM HERE log.
 */
export default function ModulePlaceholder({ moduleName }) {
  return (
    <div className="nx-panel">
      <EmptyState
        icon={<FiTool size={22} />}
        title={`${moduleName} — coming up next`}
        description={`The ${moduleName.toLowerCase()} module is scaffolded (route, layout, styles) but its full UI hasn't been built in this pass yet.`}
      />
    </div>
  );
}
