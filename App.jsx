import { useState, useEffect } from 'react';
import './App.css';
import logoImg from './assets/logo.jpg'; 

function App() {
  const [games, setGames] = useState([]);
  
  // Estado del formulario 
  const [form, setForm] = useState({ 
    title: '', 
    genre: '', 
    platform: '', 
    status: 'Pendiente', 
    hoursPlayed: 0, 
    imageUrl: '' 
  });
  
  // 1. Conexión con Backend (GET) - PUERTO 4000
  const fetchGames = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/games');
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error("Error conectando al backend:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  // 2. Manejo del Formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await fetch('http://localhost:4000/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      // Limpiar form (incluyendo la imagen)
      setForm({ title: '', genre: '', platform: '', status: 'Pendiente', hoursPlayed: 0, imageUrl: '' }); 
      fetchGames(); // Recargar lista
    } catch (error) {
      console.error(error);
    }
  };

  // 3. Función para Eliminar 
  const handleDelete = async (id) => {
    if(!confirm("¿Borrar juego?")) return;
    await fetch(`http://localhost:4000/api/games/${id}`, { method: 'DELETE' });
    fetchGames();
  };

  // 4. Cálculo de Estadísticas 
  const totalGames = games.length;
  const completedGames = games.filter(g => g.status === 'Completado').length;
  const totalHours = games.reduce((acc, curr) => acc + Number(curr.hoursPlayed || 0), 0);

  return (
    <div className="container">
      <header>
        {/* Sección del Logo y Título */}
        <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            
            <img src={logoImg} alt="Gamerboxd" style={{width: '100px', height: '100px', objectFit: 'contain'}} /> 
            <h1>Gamerboxd</h1>
        </div>
        <p>Tu biblioteca personal de videojuegos</p>
      </header>

      {/* DASHBOARD DE ESTADÍSTICAS */}
      <section className="stats-panel">
        <div className="stat-card">
          <div className="stat-number">{totalGames}</div>
          <div>Juegos Totales</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{completedGames}</div>
          <div>Completados</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalHours}h</div>
          <div>Horas Jugadas</div>
        </div>
      </section>

      {/* FORMULARIO AGREGAR JUEGO */}
      <section className="form-container">
        <h3>Agregar Nuevo Juego</h3>
        <form onSubmit={handleSubmit} className="form-group">
          <input name="title" placeholder="Título del juego" value={form.title} onChange={handleChange} required />
          <input name="genre" placeholder="Género (RPG, Acción...)" value={form.genre} onChange={handleChange} required />
          
          {/* Nuevo input para la imagen */}
          <input 
            name="imageUrl" 
            placeholder="Pegar URL de la imagen (https://...)" 
            value={form.imageUrl} 
            onChange={handleChange} 
          />

          <select name="platform" value={form.platform} onChange={handleChange} required>
            <option value="">Plataforma</option>
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Nintendo">Nintendo</option>
          </select>

          <select name="status" value={form.status} onChange={handleChange}>
            <option value="Pendiente">Pendiente</option>
            <option value="Jugando">Jugando</option>
            <option value="Completado">Completado</option>
          </select>
          
          <input type="number" name="hoursPlayed" placeholder="Horas jugadas" value={form.hoursPlayed} onChange={handleChange} />
          
          <button type="submit" className="add-btn">GUARDAR JUEGO</button>
        </form>
      </section>

      {/* LISTA DE JUEGOS (GRID) */}
      <main className="games-grid">
        {games.map((game) => (
          <div key={game._id} className="game-card">
            
            <img 
              src={game.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"} 
              alt={game.title} 
              className="card-img" 
            />
            
            <div className="card-content">
              <span className={`status-badge status-${game.status}`}>{game.status}</span>
              <h3>{game.title}</h3>
              <p style={{color: '#888', fontSize: '0.9em'}}>{game.platform} • {game.genre}</p>
              <p>{game.hoursPlayed} horas</p>
              <div className="card-actions">
                <button className="delete-btn" onClick={() => handleDelete(game._id)}>Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;