const activity = [
  { text: 'Deal "Acme Corp — Enterprise Plan" moved to Negotiation', time: '12 min ago' },
  { text: 'Invoice #INV-2041 marked as Paid', time: '48 min ago' },
  { text: 'New lead captured from LinkedIn Ads', time: '2 hr ago' },
  { text: 'Task "Prepare Q3 proposal" completed by Aisha K.', time: '3 hr ago' },
  { text: 'Meeting scheduled with Kappa Industries', time: '5 hr ago' },
];

export default function ActivityTimeline() {
  return (
    <div className="nx-panel">
      <div className="nx-panel__header">
        <h4>Activity</h4>
      </div>
      <div className="nx-timeline">
        {activity.map((item, i) => (
          <div className="nx-timeline__item" key={i}>
            <span className="nx-timeline__dot" />
            <div className="nx-timeline__body">
              <p>{item.text}</p>
              <span className="nx-timeline__time">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
