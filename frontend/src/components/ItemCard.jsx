import { useState } from 'react';
import { Trash2, ShoppingBag, Calculator as CalcIcon } from 'lucide-react';
import { Calculator } from './Calculator';

export function ItemCard({ item, onDelete }) {
    const [quantity, setQuantity] = useState(1);
    const [showCalculator, setShowCalculator] = useState(false);

    return (
        <div className="card" style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-md)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            position: 'relative'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>{item.name}</h3>
                    <span style={{
                        fontSize: '0.875rem',
                        color: item.is_offer ? '#059669' : 'var(--text-secondary)',
                        backgroundColor: item.is_offer ? '#D1FAE5' : '#F3F4F6',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        display: 'inline-block',
                        marginTop: '0.5rem'
                    }}>
                        {item.is_offer ? 'Special Offer!' : 'Regular Item'}
                    </span>
                </div>
                <div style={{
                    backgroundColor: '#EEF2FF',
                    padding: '8px',
                    borderRadius: '50%',
                    color: 'var(--primary)'
                }}>
                    <ShoppingBag size={20} />
                </div>
            </div>

            <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Quantity:</span>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    style={{
                        width: '60px',
                        padding: '4px',
                        borderRadius: '6px',
                        border: '1px solid #E5E7EB'
                    }}
                />
                <button
                    onClick={() => setShowCalculator(!showCalculator)}
                    title="Calculate Quantity"
                    style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        border: '1px solid #E5E7EB',
                        backgroundColor: showCalculator ? '#E0E7FF' : 'white',
                        color: 'var(--primary)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.75rem'
                    }}
                >
                    <CalcIcon size={14} />
                    {showCalculator ? 'Close' : 'Calc'}
                </button>
            </div>

            {showCalculator && (
                <Calculator
                    onResult={(res) => {
                        setQuantity(res);
                        setShowCalculator(false);
                    }}
                    onClose={() => setShowCalculator(false)}
                />
            )}

            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    ${(item.price * quantity).toFixed(2)}
                </span>
                <button
                    onClick={() => onDelete(item.id)}
                    style={{
                        backgroundColor: '#FEE2E2',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px',
                        color: '#DC2626',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FECACA'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
}
