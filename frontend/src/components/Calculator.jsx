import { useState } from 'react';
import axios from 'axios';
import { Calculator as CalcIcon, Divide, Minus, Plus, X } from 'lucide-react';

const API_URL = 'http://127.0.0.1:8000';

export function Calculator({ onResult, onClose }) {
    const [intA, setIntA] = useState(0);
    const [intB, setIntB] = useState(0);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const calculate = async (operation) => {
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const response = await axios.post(`${API_URL}/calculator/${operation}`, {
                intA: Number(intA),
                intB: Number(intB)
            });
            const res = response.data.result;
            setResult(res);
            if (onResult) {
                onResult(res);
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.detail || "Calculation failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            padding: '1rem',
            backgroundColor: '#F9FAFB',
            borderRadius: '12px',
            marginTop: '1rem',
            border: '1px solid #E5E7EB'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                    <CalcIcon size={20} />
                    <h4 style={{ margin: 0, fontSize: '1rem' }}>Calculate Quantity</h4>
                </div>
                {onClose && (
                    <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6B7280' }}>
                        <X size={16} />
                    </button>
                )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                        type="number"
                        value={intA}
                        onChange={(e) => setIntA(e.target.value)}
                        placeholder="A"
                        style={inputStyle}
                    />
                    <input
                        type="number"
                        value={intB}
                        onChange={(e) => setIntB(e.target.value)}
                        placeholder="B"
                        style={inputStyle}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.5rem' }}>
                    <button onClick={() => calculate('add')} disabled={loading} title="Add" style={btnStyle}><Plus size={16} /></button>
                    <button onClick={() => calculate('subtract')} disabled={loading} title="Subtract" style={btnStyle}><Minus size={16} /></button>
                    <button onClick={() => calculate('multiply')} disabled={loading} title="Multiply" style={btnStyle}><X size={16} /></button>
                    <button onClick={() => calculate('divide')} disabled={loading} title="Divide" style={btnStyle}><Divide size={16} /></button>
                </div>

                {error && (
                    <div style={{ fontSize: '0.75rem', color: '#DC2626', textAlign: 'center' }}>
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}

const inputStyle = {
    flex: 1,
    padding: '0.5rem',
    borderRadius: '6px',
    border: '1px solid #D1D5DB',
    fontSize: '0.875rem',
    minWidth: 0,
    boxSizing: 'border-box'
};

const btnStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem',
    backgroundColor: 'white',
    border: '1px solid #E5E7EB',
    borderRadius: '6px',
    cursor: 'pointer',
    color: 'var(--text-primary)',
    transition: 'all 0.1s',
};
