import { useState, useEffect } from 'react';
import './App.css';
import logoImg from './assets/logo.jpg';
// 1. IMPORTA TUS NUEVOS COMPONENTES
import GameForm from './GameForm';
import GameCard from './GameCard'; 

function App() {
  const [games, setGames] = useState([]);
  
  // 2. ESTADO DEL FORMULARIO (Corregido y con nuevos campos)
  const [form, setForm] = useState({ 
    title: '', 
    genre: '', 
    platform: '', 
    status: 'Pendiente', 
    hoursPlayed: 0, 
    imageUrl: '',
    rating: 0,  // <-- Campo nuevo
    review: ''  // <-- Campo nuevo
  });

  // 3. NUEVO ESTADO para saber qué juego estamos editando
  const [editingId, setEditingId] = useState(null);
  
  // 1. Conexión con Backend (GET) - (Sin cambios)
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

  // NUEVO HANDLER para las estrellas
  const handleRatingChange = (newRating) => {
    setForm({ ...form, rating: newRating });
  };

  // NUEVA FUNCIÓN para limpiar el form y el estado de edición
  const resetFormAndState = () => {
    setForm({ 
      title: '', 
      genre: '', 
      platform: '', 
      status: 'Pendiente', 
      hoursPlayed: 0, 
      imageUrl: '',
      rating: 0,
      review: ''
    });
    setEditingId(null);
  };

  // FUNCIÓN handleSubmit (Ahora maneja POST y PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // --- MODO EDICIÓN (PUT) ---
        await fetch(`http://localhost:4000/api/games/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
      } else {
        // --- MODO CREAR (POST) ---
        await fetch('http://localhost:4000/api/games', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
      }
      
      // Limpiar form y resetear estado
      resetFormAndState();
      fetchGames(); // Recargar lista
    } catch (error) {
      console.error(error);
    }
  };

  // 3. Función para Eliminar (Sin cambios)
  const handleDelete = async (id) => {
    if(!confirm("¿Borrar juego?")) return;
    await fetch(`http://localhost:4000/api/games/${id}`, { method: 'DELETE' });
    fetchGames();
  };

  // 4. NUEVA FUNCIÓN para cargar datos en el form para editar
  const handleEdit = (game) => {
    setForm({
      title: game.title,
      genre: game.genre,
      platform: game.platform,
      status: game.status,
      hoursPlayed: game.hoursPlayed || 0,
      imageUrl: game.imageUrl || '',
      rating: game.rating || 0, // Carga la puntuación
      review: game.review || ''  // Carga la reseña
    });
    setEditingId(game._id);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Sube al formulario
  };

  // 5. Cálculo de Estadísticas (Sin cambios)
  const totalGames = games.length;
  const completedGames = games.filter(g => g.status === 'Completado').length;
  const totalHours = games.reduce((acc, curr) => acc + Number(curr.hoursPlayed || 0), 0);

  return (
    <div className="container">
      <header>
        {/* Sección del Logo y Título (respetando tu cambio de tamaño) */}
        <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <img src={logoImg} alt="Gamerboxd" style={{width: '200px', height: '200px', objectFit: 'contain'}} /> 
            <h1>Gamerboxd</h1>
        </div>
        <p>Tu biblioteca personal de videojuegos</p>
      </header>

      {/* DASHBOARD DE ESTADÍSTICAS (Sin cambios) */}
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

      {/* 6. FORMULARIO AGREGAR JUEGO (Ahora es un componente) */}
      <GameForm
        form={form}
        handleChange={handleChange}
        handleRatingChange={handleRatingChange}
        handleSubmit={handleSubmit}
        editingId={editingId}
        resetFormAndState={resetFormAndState}
      />

      {/* 7. LISTA DE JUEGOS (GRID) (Ahora usa el componente GameCard) */}
      <main className="games-grid">
        {games.map((game) => (
          <GameCard 
            key={game._id}
            game={game}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </main>
    </div>
  );
}

export default App;