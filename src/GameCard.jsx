import StarRating from './StarRating'; // Importa el componente de estrellas

// Este componente solo se encarga de MOSTRAR una tarjeta
function GameCard({ game, handleEdit, handleDelete }) {
  
  // (Opcional) Un pequeño helper para el color del status
  const getStatusClass = (status) => {
    if (status === 'Completado') return 'status-Completado';
    if (status === 'Jugando') return 'status-Jugando';
    return 'status-Pendiente';
  };

  return (
    <div className="game-card">
      <img 
        src={game.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"} 
        alt={game.title} 
        className="card-img" 
      />
      
      <div className="card-content">
        <span className={`status-badge ${getStatusClass(game.status)}`}>
          {game.status}
        </span>
        
        {/* MUESTRA LAS ESTRELLAS (MODO SOLO LECTURA) */}
        {/* Solo se muestra si hay puntuación */}
        {game.rating > 0 && (
          <StarRating 
            rating={game.rating} 
            readOnly={true} 
          />
        )}
        
        <h3>{game.title}</h3>
        <p style={{color: '#888', fontSize: '0.9em'}}>{game.platform} • {game.genre}</p>
        <p>{game.hoursPlayed} horas</p>
        
        {/* MUESTRA LA RESEÑA */}
        {/* Solo se muestra si hay reseña */}
        {game.review && (
          <p className="card-review">"{game.review}"</p>
        )}

        <div className="card-actions">
          <button className="edit-btn" onClick={() => handleEdit(game)}>
            Editar
          </button>
          <button className="delete-btn" onClick={() => handleDelete(game._id)}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameCard;