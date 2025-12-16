import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Package } from 'lucide-react';
import { ItemCard } from './components/ItemCard';

const API_URL = 'http://localhost:8000';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/items/`);
      setItems(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to connect to backend. Is FastAPI running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/items/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (err) {
      alert("Error deleting item");
    }
  };

  const handleCreateTestItem = async () => {
    try {
      const adjectives = ['Shiny', 'Rusty', 'Magic', 'Golden', 'Cursed', 'Ancient', 'Legendary', 'Broken', 'Ethereal', 'Heavy'];
      const nouns = ['Sword', 'Shield', 'Potion', 'Ring', 'Amulet', 'Helmet', 'Boots', 'Cloak', 'Dagger', 'Staff'];

      const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

      const newItem = {
        name: `${randomAdjective} ${randomNoun}`,
        price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
        is_offer: Math.random() > 0.7
      };

      const response = await axios.post(`${API_URL}/items/`, newItem);
      setItems([...items, response.data]);
    } catch (err) {
      alert("Error creating item");
    }
  };

  return (
    <div className="container">
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.5rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
            <Package size={32} color="var(--primary)" />
          </div>
          <h1 style={{ margin: 0, textAlign: 'left' }}>FastAPI Store</h1>
        </div>
        <button
          onClick={handleCreateTestItem}
          style={{
            backgroundColor: 'var(--primary)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: 'var(--shadow-lg)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
        >
          <Plus size={20} />
          Add Random Item
        </button>
      </header>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          Loading items...
        </div>
      ) : error ? (
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          backgroundColor: '#FEF2F2',
          color: '#DC2626',
          borderRadius: '12px',
          border: '1px solid #FECACA'
        }}>
          {error}
        </div>
      ) : (
        <>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
              No items found. Click the button to add one!
            </div>
          ) : (
            <div className="grid">
              {items.map(item => (
                <ItemCard key={item.id} item={item} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
