// Importaciones necesarias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Para manejar las rutas de archivos estáticos

// Importación de las rutas
const insumosRoutes = require('./routes/insumos');
const presupuestosRoutes = require('./routes/presupuestos');

// Configuración del servidor
const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Permite solicitudes desde otros dominios (útil para desarrollo)
app.use(bodyParser.json()); // Para procesar datos en formato JSON

// Servir archivos estáticos (index.html y style.css)
app.use(express.static(path.join(__dirname, 'public')));

// Conexión a MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/presupuestosApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch((error) => console.error('Error al conectar con MongoDB:', error));

// Rutas
app.use('/api/insumos', insumosRoutes); // Rutas para insumos
app.use('/api/presupuestos', presupuestosRoutes); // Rutas para presupuestos

// Ruta principal (para acceder a index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).send({ error: 'Ruta no encontrada' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
