import StarRating from './StarRating'; // Importa el componente de estrellas

// Recibe todo lo que necesita como "props" desde App.jsx
function GameForm({ form, handleChange, handleRatingChange, handleSubmit, editingId, resetFormAndState }) {
  
  return (
    <section className="form-container">
      {/* El título cambia según si estamos editando o no */}
      <h3>{editingId ? 'Editar Juego y Reseña' : 'Agregar Nuevo Juego'}</h3>
      
      <form onSubmit={handleSubmit} className="form-group">
        
        <input 
          name="title" 
          placeholder="Título del juego" 
          value={form.title} 
          onChange={handleChange} 
          required 
        />
        <input 
          name="genre" 
          placeholder="Género (RPG, Acción...)" 
          value={form.genre} 
          onChange={handleChange} 
          required 
        />
        
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
          <option value="Móvil">Móvil</option>
        </select>

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Pendiente">Pendiente</option>
          <option value="Jugando">Jugando</option>
          <option value="Completado">Completado</option>
        </select>
        
        <input 
          type="number" 
          name="hoursPlayed" 
          placeholder="Horas jugadas" 
          value={form.hoursPlayed} 
          onChange={handleChange} 
        />

        {/* --- NUEVOS CAMPOS --- */}
        
        {/* Componente de Estrellas para Puntuación */}
        <div style={{ flexBasis: '100%', textAlign: 'center', margin: '10px 0' }}>
          <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px' }}>Puntuación</label>
          <StarRating 
            rating={form.rating}
            onRatingChange={handleRatingChange} // Usa el handler especial
          />
        </div>

        {/* Textarea para la Reseña */}
        <textarea
          name="review"
          placeholder="Escribe tu reseña aquí..."
          value={form.review}
          onChange={handleChange} // Usa el handler normal
          className="review-textarea"
        />
        
        {/* --- FIN NUEVOS CAMPOS --- */}
        
        <button type="submit" className="add-btn">
          {/* El texto del botón también cambia */}
          {editingId ? 'ACTUALIZAR JUEGO' : 'GUARDAR JUEGO'}
        </button>
        
        {/* Mostramos Cancelar solo si estamos editando */}
        {editingId && (
          <button type="button" className="cancel-btn" onClick={resetFormAndState}>
            CANCELAR
          </button>
        )}
      </form>
    </section>
  );
}

export default GameForm;