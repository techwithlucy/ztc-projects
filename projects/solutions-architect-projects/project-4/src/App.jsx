import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

// Set VITE_API_URL in Amplify (App settings > Environment variables). No trailing slash.
const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')
const COFFEE_URL = `${API_URL}/coffee`

async function request(url, options = {}) {
  const headers = options.body ? { 'Content-Type': 'application/json' } : {}
  const res = await fetch(url, { ...options, headers })
  const text = await res.text()

  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = text
  }

  if (!res.ok) {
    throw new Error(data?.error || data?.message || `Request failed (${res.status})`)
  }
  return data
}

// The getCoffee Lambda returns the raw DynamoDB response:
//   all items -> { Items: [...] }    one item -> { Item: {...} }
// This also copes with a plain array / object in case the response shape changes.
function toList(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.Items)) return data.Items
  return []
}

function toItem(data) {
  return data?.Item ?? data ?? null
}

const emptyForm = { coffeeId: '', name: '', price: '', available: false }

export default function App() {
  const [coffees, setCoffees] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ name: '', price: '', available: false })
  const [detail, setDetail] = useState(null)

  const loadCoffees = async () => {
    try {
      setError('')
      const data = await request(COFFEE_URL)
      setCoffees(toList(data))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!API_URL) {
      setLoading(false)
      return
    }
    loadCoffees()
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    const coffeeId = form.coffeeId.trim()
    const name = form.name.trim()
    const price = Number(form.price)

    if (!coffeeId || !name || !price) {
      setError('Enter a coffee ID, a name, and a price above 0.')
      return
    }

    try {
      setSaving(true)
      setError('')
      await request(COFFEE_URL, {
        method: 'POST',
        body: JSON.stringify({ coffeeId, name, price, available: form.available }),
      })
      setForm(emptyForm)
      await loadCoffees()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const startEdit = (coffee) => {
    setEditingId(coffee.coffeeId)
    setEditForm({
      name: coffee.name ?? '',
      price: coffee.price ?? '',
      available: Boolean(coffee.available),
    })
  }

  const handleUpdate = async (coffeeId) => {
    const name = editForm.name.trim()
    const price = Number(editForm.price)

    if (!name || !price) {
      setError('Enter a name and a price above 0.')
      return
    }

    try {
      setError('')
      await request(`${COFFEE_URL}/${encodeURIComponent(coffeeId)}`, {
        method: 'PUT',
        body: JSON.stringify({ name, price, available: editForm.available }),
      })
      setEditingId(null)
      await loadCoffees()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (coffeeId) => {
    try {
      setError('')
      await request(`${COFFEE_URL}/${encodeURIComponent(coffeeId)}`, { method: 'DELETE' })
      if (detail?.coffeeId === coffeeId) setDetail(null)
      await loadCoffees()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDetails = async (coffeeId) => {
    if (detail?.coffeeId === coffeeId) {
      setDetail(null)
      return
    }
    try {
      setError('')
      const data = await request(`${COFFEE_URL}/${encodeURIComponent(coffeeId)}`)
      setDetail(toItem(data))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="app">
      <h1>Coffee List</h1>

      {!API_URL && (
        <p className="message error">
          VITE_API_URL is not set. Add it in Amplify under App settings &gt; Environment variables,
          then redeploy.
        </p>
      )}
      {error && <p className="message error">{error}</p>}

      <form className="coffee-form" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Coffee ID"
          value={form.coffeeId}
          onChange={(e) => setForm({ ...form, coffeeId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          min="0"
          step="any"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <label className="checkbox">
          <input
            type="checkbox"
            checked={form.available}
            onChange={(e) => setForm({ ...form, available: e.target.checked })}
          />
          Available
        </label>
        <button type="submit" className="primary" disabled={saving}>
          Add Coffee
        </button>
      </form>

      {loading && <p>Loading coffee...</p>}
      {!loading && API_URL && coffees.length === 0 && !error && (
        <p>No coffee yet. Add your first item above.</p>
      )}

      <div className="coffee-list">
        {coffees.map((coffee) => (
          <div className="coffee-card" key={coffee.coffeeId}>
            {editingId === coffee.coffeeId ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                />
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={editForm.available}
                    onChange={(e) => setEditForm({ ...editForm, available: e.target.checked })}
                  />
                  Available
                </label>
                <div className="actions">
                  <button className="primary small" onClick={() => handleUpdate(coffee.coffeeId)}>
                    Save
                  </button>
                  <button className="secondary small" onClick={() => setEditingId(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3>{coffee.name}</h3>
                <img src={reactLogo} alt="" className="logo" />
                <p>Price: ${coffee.price}</p>
                <p>{coffee.available ? 'Available' : 'Not Available'}</p>

                {detail?.coffeeId === coffee.coffeeId && (
                  <p className="detail">ID: {detail.coffeeId}</p>
                )}

                <div className="actions">
                  <button className="secondary small" onClick={() => handleDetails(coffee.coffeeId)}>
                    {detail?.coffeeId === coffee.coffeeId ? 'Hide' : 'Details'}
                  </button>
                  <button className="primary small" onClick={() => startEdit(coffee)}>
                    Edit
                  </button>
                  <button className="danger small" onClick={() => handleDelete(coffee.coffeeId)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
