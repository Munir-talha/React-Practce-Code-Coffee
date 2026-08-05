import { useState, useMemo } from 'react';
import './BudgetTracker.css';

/* ── Category config ─────────────────────────────────────── */
const CATEGORIES = [
  { id: 'food',        label: 'Food & Dining',     icon: '🍔', color: '#ff6b9d' },
  { id: 'transport',   label: 'Transport',          icon: '🚗', color: '#7c6bff' },
  { id: 'utilities',   label: 'Utilities & Bills',  icon: '⚡', color: '#f5a623' },
  { id: 'health',      label: 'Health & Fitness',   icon: '💊', color: '#3ee8a0' },
  { id: 'shopping',    label: 'Shopping',           icon: '🛍️', color: '#60d9fa' },
  { id: 'entertainment', label: 'Entertainment',   icon: '🎬', color: '#b06bff' },
  { id: 'education',   label: 'Education',          icon: '📚', color: '#ffd166' },
  { id: 'other',       label: 'Other',              icon: '📦', color: '#94a3b8' },
];

/* ── Ring SVG ────────────────────────────────────────────── */
function RingProgress({ pct, remaining, budget }) {
  const R = 68;
  const C = 2 * Math.PI * R;           // circumference
  const clampedPct = Math.min(pct, 100);
  const offset = C - (clampedPct / 100) * C;

  const ringColor =
    pct >= 100 ? '#ff4f6d' :
    pct >= 80  ? '#f5a623' :
                 'url(#ringGrad)';

  const pctDisplay = pct > 999 ? '999+' : Math.round(pct);

  return (
    <div className="bt-ring-wrap">
      <svg className="bt-ring-svg" width="160" height="160" viewBox="0 0 160 160">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c6bff" />
            <stop offset="100%" stopColor="#ff6b9d" />
          </linearGradient>
        </defs>
        <circle className="bt-ring-track" cx="80" cy="80" r={R} />
        <circle
          className="bt-ring-fill"
          cx="80" cy="80" r={R}
          stroke={ringColor}
          strokeDasharray={C}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="bt-ring-center">
        <span
          className="bt-ring-pct"
          style={{ color: pct >= 100 ? '#ff4f6d' : pct >= 80 ? '#f5a623' : '#a8b0ff' }}
        >
          {pctDisplay}%
        </span>
        <span className="bt-ring-sub">spent</span>
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────── */
export default function BudgetTracker() {
  /* — State — */
  const [budget, setBudget]           = useState(null);       // confirmed budget
  const [budgetInput, setBudgetInput] = useState('');
  const [month, setMonth]             = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  });

  const [expenses, setExpenses] = useState([]);

  const [form, setForm] = useState({
    name: '',
    amount: '',
    category: 'food',
    date: new Date().toISOString().split('T')[0],
    note: '',
  });

  const [formError, setFormError] = useState('');

  /* — Derived values — */
  const totalSpent = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    [expenses]
  );
  const remaining  = budget != null ? budget - totalSpent : null;
  const pct        = budget ? (totalSpent / budget) * 100 : 0;

  const catTotals  = useMemo(() => {
    const map = {};
    expenses.forEach(e => {
      map[e.category] = (map[e.category] || 0) + e.amount;
    });
    return map;
  }, [expenses]);

  /* — Handlers — */
  function handleSetBudget() {
    const val = parseFloat(budgetInput);
    if (isNaN(val) || val <= 0) return;
    setBudget(val);
    setBudgetInput('');
  }

  function handleFormChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setFormError('');
  }

  function handleAddExpense() {
    if (!form.name.trim()) { setFormError('Enter an expense name.'); return; }
    const amt = parseFloat(form.amount);
    if (isNaN(amt) || amt <= 0) { setFormError('Enter a valid amount.'); return; }

    const cat = CATEGORIES.find(c => c.id === form.category);
    const newExp = {
      id: Date.now(),
      name: form.name.trim(),
      amount: amt,
      category: form.category,
      catLabel: cat.label,
      catIcon: cat.icon,
      catColor: cat.color,
      date: form.date,
      note: form.note.trim(),
    };
    setExpenses(prev => [newExp, ...prev]);
    setForm(f => ({ ...f, name: '', amount: '', note: '' }));
  }

  function handleDeleteExpense(id) {
    setExpenses(prev => prev.filter(e => e.id !== id));
  }

  function handleResetAll() {
    if (window.confirm('Reset everything for this month?')) {
      setBudget(null);
      setExpenses([]);
      setFormError('');
    }
  }

  /* — Formatting helpers — */
  const fmt = (n) =>
    new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(n);

  const fmtMonth = (val) => {
    const [y, m] = val.split('-');
    return new Date(y, m - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  /* — Alert banner — */
  const alert =
    budget && pct >= 100 ? { type: 'danger',  msg: "🚨 Budget exceeded! You've gone over your limit." } :
    budget && pct >= 80  ? { type: 'warning', msg: "⚠️ Warning: You've used 80%+ of your budget." }   :
    null;

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <div className="bt-root">

      {/* Header */}
      <div className="bt-header">
        <span className="bt-header-icon">💰</span>
        <h1>Monthly Budget Tracker</h1>
        <p>Plan smarter. Spend better. Save more.</p>
      </div>

      <div className="bt-layout">

        {/* ── LEFT COLUMN ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Budget Setup card */}
          <div className="bt-card">
            <p className="bt-card-title">Set Monthly Budget</p>

            {/* Month picker */}
            <div className="bt-field">
              <label htmlFor="bt-month">Month</label>
              <input
                id="bt-month"
                type="month"
                name="month"
                value={month}
                onChange={e => setMonth(e.target.value)}
              />
            </div>

            {/* Budget amount */}
            <div className="bt-field">
              <label htmlFor="bt-budget-input">Total Budget (PKR)</label>
              <input
                id="bt-budget-input"
                type="number"
                placeholder="e.g. 50000"
                value={budgetInput}
                onChange={e => setBudgetInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSetBudget()}
              />
            </div>

            <button className="bt-btn bt-btn-set-budget" onClick={handleSetBudget}>
              ✓ Set Budget
            </button>

            {budget != null && (
              <>
                <hr className="bt-divider" />
                <div className="bt-budget-display">
                  <p className="bt-budget-label">Budget for</p>
                  <p className="bt-budget-month">{fmtMonth(month)}</p>
                  <p className="bt-budget-amount">{fmt(budget)}</p>
                </div>
                <button
                  className="bt-btn bt-btn-ghost"
                  style={{ width: '100%', marginTop: '0.5rem' }}
                  onClick={handleResetAll}
                >
                  🔄 Reset Month
                </button>
              </>
            )}
          </div>

          {/* Add Expense card */}
          <div className="bt-card">
            <p className="bt-card-title">Add Expense</p>

            {formError && (
              <div className="bt-alert bt-alert-danger">
                ⚠️ {formError}
              </div>
            )}

            <div className="bt-field">
              <label htmlFor="bt-exp-name">Description</label>
              <input
                id="bt-exp-name"
                name="name"
                type="text"
                placeholder="e.g. Grocery run"
                value={form.name}
                onChange={handleFormChange}
              />
            </div>

            <div className="bt-input-row">
              <div className="bt-field">
                <label htmlFor="bt-exp-amount">Amount (PKR)</label>
                <input
                  id="bt-exp-amount"
                  name="amount"
                  type="number"
                  placeholder="0"
                  value={form.amount}
                  onChange={handleFormChange}
                  onKeyDown={e => e.key === 'Enter' && handleAddExpense()}
                />
              </div>
              <div className="bt-field">
                <label htmlFor="bt-exp-date">Date</label>
                <input
                  id="bt-exp-date"
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleFormChange}
                />
              </div>
            </div>

            <div className="bt-field">
              <label htmlFor="bt-exp-cat">Category</label>
              <select
                id="bt-exp-cat"
                name="category"
                value={form.category}
                onChange={handleFormChange}
              >
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
                ))}
              </select>
            </div>

            <div className="bt-field">
              <label htmlFor="bt-exp-note">Note (optional)</label>
              <input
                id="bt-exp-note"
                name="note"
                type="text"
                placeholder="Any extra detail..."
                value={form.note}
                onChange={handleFormChange}
              />
            </div>

            <button className="bt-btn bt-btn-primary" onClick={handleAddExpense}>
              + Add Expense
            </button>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Summary card */}
          <div className="bt-card">
            <p className="bt-card-title">Overview — {fmtMonth(month)}</p>

            {alert && (
              <div className={`bt-alert bt-alert-${alert.type}`}>
                {alert.msg}
              </div>
            )}

            <div className="bt-summary">
              <RingProgress pct={pct} remaining={remaining} budget={budget} />

              <div className="bt-stats">
                <div className="bt-stat">
                  <p className="bt-stat-label">Budget</p>
                  <p className="bt-stat-value neutral">
                    {budget != null ? fmt(budget) : '—'}
                  </p>
                </div>
                <div className="bt-stat">
                  <p className="bt-stat-label">Spent</p>
                  <p className={`bt-stat-value ${pct >= 100 ? 'danger' : pct >= 80 ? 'warning' : 'danger'}`}>
                    {fmt(totalSpent)}
                  </p>
                </div>
                <div className="bt-stat">
                  <p className="bt-stat-label">Remaining</p>
                  <p className={`bt-stat-value ${
                    remaining == null ? 'neutral' :
                    remaining < 0    ? 'danger'  :
                    remaining < (budget * 0.2) ? 'warning' : 'success'
                  }`}>
                    {remaining != null
                      ? (remaining < 0 ? `−${fmt(Math.abs(remaining))}` : fmt(remaining))
                      : '—'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Category breakdown card */}
          {expenses.length > 0 && (
            <div className="bt-card">
              <p className="bt-card-title">By Category</p>
              <div className="bt-cat-list">
                {CATEGORIES
                  .filter(c => catTotals[c.id])
                  .sort((a, b) => (catTotals[b.id] || 0) - (catTotals[a.id] || 0))
                  .map(c => {
                    const total = catTotals[c.id] || 0;
                    const barPct = totalSpent > 0 ? (total / totalSpent) * 100 : 0;
                    return (
                      <div className="bt-cat-row" key={c.id}>
                        <span className="bt-cat-dot" style={{ background: c.color }} />
                        <span className="bt-cat-name">{c.icon} {c.label}</span>
                        <div className="bt-cat-bar-track">
                          <div
                            className="bt-cat-bar-fill"
                            style={{ width: `${barPct}%`, background: c.color }}
                          />
                        </div>
                        <span className="bt-cat-amount">{fmt(total)}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Expense list card */}
          <div className="bt-card">
            <div className="bt-list-header">
              <p className="bt-card-title" style={{ margin: 0 }}>Expense History</p>
              <span className="bt-badge">{expenses.length} items</span>
            </div>

            {expenses.length === 0 ? (
              <div className="bt-empty">
                <span className="bt-empty-icon">🧾</span>
                <p>No expenses added yet.<br />Start tracking by adding one above.</p>
              </div>
            ) : (
              <div className="bt-expense-list">
                {expenses.map(exp => (
                  <div className="bt-expense-item" key={exp.id}>
                    <div className="bt-expense-icon">{exp.catIcon}</div>
                    <div className="bt-expense-info">
                      <p className="bt-expense-name">{exp.name}</p>
                      <p className="bt-expense-meta">
                        {exp.catLabel} &bull;{' '}
                        {new Date(exp.date + 'T00:00:00').toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric',
                        })}
                        {exp.note ? ` · ${exp.note}` : ''}
                      </p>
                    </div>
                    <span className="bt-expense-amount">−{fmt(exp.amount)}</span>
                    <button
                      className="bt-btn bt-btn-danger-sm"
                      onClick={() => handleDeleteExpense(exp.id)}
                      title="Delete expense"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>{/* end right column */}
      </div>{/* end layout */}
    </div>
  );
}
