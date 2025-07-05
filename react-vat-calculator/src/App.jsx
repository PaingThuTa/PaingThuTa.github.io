import { useState } from 'react'
import './App.css'

function App() {
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')

  // Calculate VAT: vat = (price - discount) * 0.07
  const calculateVAT = () => {
    const priceValue = parseFloat(price) || 0
    const discountValue = parseFloat(discount) || 0
    const vat = (priceValue - discountValue) * 0.07
    return vat >= 0 ? vat : 0
  }

  const calculateTotal = () => {
    const priceValue = parseFloat(price) || 0
    const discountValue = parseFloat(discount) || 0
    const vat = calculateVAT()
    return (priceValue - discountValue) + vat
  }

  return (
    <div className="calculator-container">
      <h1>VAT Calculator</h1>
      <div className="calculator">
        <div className="input-group">
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            min="0"
            step="0.01"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="discount">Discount ($)</label>
          <input
            type="number"
            id="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Enter discount"
            min="0"
            step="0.01"
          />
        </div>

        <div className="results">
          <div className="result-item">
            <span className="label">Subtotal (after discount):</span>
            <span className="value">${((parseFloat(price) || 0) - (parseFloat(discount) || 0)).toFixed(2)}</span>
          </div>
          
          <div className="result-item">
            <span className="label">VAT (7%):</span>
            <span className="value">${calculateVAT().toFixed(2)}</span>
          </div>
          
          <div className="result-item total">
            <span className="label">Total:</span>
            <span className="value">${calculateTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
