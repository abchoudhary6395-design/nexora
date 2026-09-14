import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { FiPlus } from 'react-icons/fi';
import KanbanColumn from '../../components/common/Kanban/KanbanColumn';
import { dealService } from '../../services/api/dealService';
import { STAGES, generateMockDeals } from './pipelineConfig';

export default function Deals() {
  const [deals, setDeals] = useState(() => generateMockDeals(24));
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { title: '', value: '', company_id: '', customer_id: '', deal_stage_id: '1', notes: '' },
  });

  const handleDrop = (dealId, newStage) => {
    setDeals((prev) => {
      const moved = prev.find((d) => d.id === dealId);
      if (!moved || moved.stage === newStage) return prev;
      toast.success(`"${moved.title.split(' — ')[0]}" moved to ${STAGES.find(s => s.key === newStage).label}`);
      return prev.map((d) => (d.id === dealId ? { ...d, stage: newStage } : d));
    });
  };

  const totalPipelineValue = deals
    .filter((d) => d.stage !== 'won' && d.stage !== 'lost')
    .reduce((sum, d) => sum + d.value, 0);

  return (
    <div>
      <div className="nx-page-header">
        <div className="nx-page-header__title">
          <h2>Sales Pipeline</h2>
          <p style={{ margin: 0 }}>
            {deals.length} deals · <span className="nx-numeric">${totalPipelineValue.toLocaleString()}</span> open
          </p>
        </div>
        <Button leftIcon={<FiPlus size={16} />} onClick={() => setIsCreateOpen(true)}>New Deal</Button>
      </div>

      <DndProvider backend={HTML5Backend}>
        <div className="nx-kanban">
          {STAGES.map((stage) => (
            <KanbanColumn
              key={stage.key}
              stage={stage}
              deals={deals.filter((d) => d.stage === stage.key)}
              onDropDeal={handleDrop}
            />
          ))}
        </div>
      </DndProvider>

      {isCreateOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,14,25,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }} onClick={() => setIsCreateOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 560, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', padding: 'var(--space-6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <div><h3 style={{ margin: 0 }}>Add New Deal</h3><p style={{ margin: '6px 0 0', color: 'var(--color-text-muted)' }}>Create a new pipeline opportunity.</p></div>
              <button type="button" onClick={() => setIsCreateOpen(false)} style={{ border: 'none', background: 'transparent', color: 'var(--color-text-muted)', fontSize: 20, cursor: 'pointer' }}>×</button>
            </div>
            <form onSubmit={handleSubmit(async (values) => {
              setCreating(true);
              try {
                await dealService.create({
                  title: values.title,
                  value: Number(values.value),
                  deal_stage_id: Number(values.deal_stage_id),
                  company_id: values.company_id || null,
                  customer_id: values.customer_id || null,
                  notes: values.notes || null,
                });
                toast.success('Deal created successfully');
                setIsCreateOpen(false);
                reset();
              } catch (error) {
                toast.error(error.response?.data?.message || 'Could not create deal');
              } finally {
                setCreating(false);
              }
            })} style={{ display: 'grid', gap: 'var(--space-4)' }}>
              <Input label="Deal title" placeholder="Enterprise Software Renewal" error={errors.title?.message} {...register('title', { required: 'Title is required' })} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--space-4)' }}>
                <Input label="Value" type="number" placeholder="25000" error={errors.value?.message} {...register('value', { required: 'Value is required', valueAsNumber: true })} />
                <div className="nx-field">
                  <label className="nx-field__label" htmlFor="deal_stage_id">Stage</label>
                  <select id="deal_stage_id" className="nx-input" defaultValue="1" {...register('deal_stage_id')}>
                    <option value="1">Qualification</option>
                    <option value="2">Proposal</option>
                    <option value="3">Negotiation</option>
                    <option value="4">Closed Won</option>
                  </select>
                </div>
              </div>
              <Input label="Notes" placeholder="Opportunity details..." error={errors.notes?.message} {...register('notes')} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                <Button type="button" variant="ghost" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                <Button type="submit" loading={creating}>Save Deal</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
