import { useState } from 'react'
import axios from 'axios'

function App() {
  const [sehir, setSehir] = useState('')
  const [havaVerisi, setHavaVerisi] = useState(null)
  const [yukleniyor, setYukleniyor] = useState(false)

  const havaGetir = async () => {
    if (!sehir) return;
    setYukleniyor(true);
    try {
      // Backend sunucuna istek atıyoruz
      const res = await axios.get(`http://localhost:5000/api/hava?sehir=${sehir}`)
      setHavaVerisi(res.data)
    } catch (err) {
      alert("Şehir bulunamadı veya sunucu kapalı!")
      setHavaVerisi(null)
    } finally {
      setYukleniyor(false);
    }
  }

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', marginTop: '50px' }}>
      <h1>Hava Durumu</h1>
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Şehir adı girin (Örn: Istanbul)" 
          value={sehir}
          onChange={(e) => setSehir(e.target.value)}
          style={{ padding: '10px', width: '250px' }}
        />
        <button 
          onClick={havaGetir} 
          style={{ padding: '10px 20px', cursor: 'pointer' }}
          disabled={yukleniyor}
        >
          {yukleniyor ? 'Yükleniyor...' : 'Ara'}
        </button>
      </div>

      {havaVerisi && (
        <div style={{ border: '1px solid #ddd', padding: '20px', display: 'inline-block', borderRadius: '10px' }}>
          <h2>{havaVerisi.sehir}</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{havaVerisi.sicaklik}°C</p>
          <p>Durum: {havaVerisi.durum}</p>
          <p>Nem: %{havaVerisi.nem}</p>
          <p>Rüzgar: {havaVerisi.ruzgar} m/s</p>
        </div>
      )}
    </div>
  )
}

export default App
