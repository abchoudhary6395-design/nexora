import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiChevronLeft, FiChevronRight, FiPlus } from 'react-icons/fi';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { calendarService } from '../../services/api/calendarService';
import { generateMockEvents, EVENT_TYPE_COLOR } from './mockEvents';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function buildMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = startOffset - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, muted: true, date: new Date(year, month - 1, daysInPrevMonth - i) });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, muted: false, date: new Date(year, month, d) });
  }
  while (cells.length % 7 !== 0) {
    const next = cells.length - (startOffset + daysInMonth) + 1;
    cells.push({ day: next, muted: true, date: new Date(year, month + 1, next) });
  }
  return cells;
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export default function Calendar() {
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState(today);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { title: '', type: 'meeting', starts_at: new Date().toISOString().slice(0, 16), ends_at: new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16), location: '' },
  });

  const events = useMemo(() => generateMockEvents(cursor.getFullYear(), cursor.getMonth()), [cursor]);
  const cells = useMemo(() => buildMonthGrid(cursor.getFullYear(), cursor.getMonth()), [cursor]);

  const eventsForDay = (date) => events.filter((e) => isSameDay(e.date, date));
  const selectedEvents = eventsForDay(selected);

  const monthLabel = cursor.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const shiftMonth = (delta) => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + delta, 1));

  return (
    <div>
      <div className="nx-page-header">
        <h2>Calendar</h2>
        <Button leftIcon={<FiPlus size={16} />} onClick={() => setIsCreateOpen(true)}>New Event</Button>
      </div>

      <div className="nx-calendar__nav">
        <button className="nx-calendar__nav-btn" onClick={() => shiftMonth(-1)} aria-label="Previous month">
          <FiChevronLeft size={16} />
        </button>
        <span className="nx-calendar__month-label">{monthLabel}</span>
        <button className="nx-calendar__nav-btn" onClick={() => shiftMonth(1)} aria-label="Next month">
          <FiChevronRight size={16} />
        </button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setCursor(new Date(today.getFullYear(), today.getMonth(), 1));
            setSelected(today);
          }}
        >
          Today
        </Button>
      </div>

      <div className="nx-calendar">
        <div className="nx-calendar__grid">
          <div className="nx-calendar__weekdays">
            {WEEKDAYS.map((d) => <span key={d}>{d}</span>)}
          </div>
          <div className="nx-calendar__days">
            {cells.map((cell, i) => {
              const dayEvents = eventsForDay(cell.date);
              return (
                <div
                  key={i}
                  className={clsx(
                    'nx-calendar__day',
                    cell.muted && 'nx-calendar__day--muted',
                    isSameDay(cell.date, today) && 'nx-calendar__day--today',
                    isSameDay(cell.date, selected) && 'nx-calendar__day--selected'
                  )}
                  onClick={() => setSelected(cell.date)}
                >
                  <span className="nx-calendar__day-num">{cell.day}</span>
                  {dayEvents.slice(0, 2).map((e) => (
                    <span
                      key={e.id}
                      className="nx-calendar__event-dot nx-truncate"
                      style={{ '--dot-color': EVENT_TYPE_COLOR[e.type] }}
                    >
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: EVENT_TYPE_COLOR[e.type], flexShrink: 0 }} />
                      {e.title}
                    </span>
                  ))}
                  {dayEvents.length > 2 && (
                    <span className="nx-text-muted" style={{ fontSize: 10 }}>+{dayEvents.length - 2} more</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="nx-panel">
          <div className="nx-panel__header">
            <h4>{selected.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</h4>
          </div>
          {selectedEvents.length === 0 ? (
            <p className="nx-text-muted" style={{ fontSize: 'var(--fs-sm)' }}>No events scheduled.</p>
          ) : (
            selectedEvents.map((e) => (
              <div className="nx-agenda-item" key={e.id}>
                <span className="nx-agenda-item__bar" style={{ background: EVENT_TYPE_COLOR[e.type] }} />
                <div>
                  <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 500 }}>{e.title}</div>
                  <div className="nx-agenda-item__time">{e.time} · {e.type}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {isCreateOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,14,25,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }} onClick={() => setIsCreateOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 520, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', padding: 'var(--space-6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <div><h3 style={{ margin: 0 }}>Add New Event</h3><p style={{ margin: '6px 0 0', color: 'var(--color-text-muted)' }}>Schedule a new calendar item.</p></div>
              <button type="button" onClick={() => setIsCreateOpen(false)} style={{ border: 'none', background: 'transparent', color: 'var(--color-text-muted)', fontSize: 20, cursor: 'pointer' }}>×</button>
            </div>
            <form onSubmit={handleSubmit(async (values) => {
              setCreating(true);
              try {
                await calendarService.create({
                  title: values.title,
                  type: values.type,
                  starts_at: values.starts_at,
                  ends_at: values.ends_at || values.starts_at,
                  location: values.location || null,
                });
                toast.success('Event created successfully');
                setIsCreateOpen(false);
                reset();
              } catch (error) {
                toast.error(error.response?.data?.message || 'Could not create event');
              } finally {
                setCreating(false);
              }
            })} style={{ display: 'grid', gap: 'var(--space-4)' }}>
              <Input label="Title" placeholder="Q3 sales sync" error={errors.title?.message} {...register('title', { required: 'Title is required' })} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--space-4)' }}>
                <div className="nx-field">
                  <label className="nx-field__label" htmlFor="type">Type</label>
                  <select id="type" className="nx-input" defaultValue="meeting" {...register('type')}>
                    <option value="meeting">Meeting</option>
                    <option value="call">Call</option>
                    <option value="deadline">Deadline</option>
                    <option value="reminder">Reminder</option>
                  </select>
                </div>
                <Input label="Location" placeholder="Zoom / Office" error={errors.location?.message} {...register('location')} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--space-4)' }}>
                <Input label="Starts at" type="datetime-local" error={errors.starts_at?.message} {...register('starts_at', { required: 'Start time is required' })} />
                <Input label="Ends at" type="datetime-local" error={errors.ends_at?.message} {...register('ends_at')} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                <Button type="button" variant="ghost" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                <Button type="submit" loading={creating}>Save Event</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
