#!/bin/bash
# =============================================
#  JaqueMáTICas — Servidor Web Local
#  Haz doble clic para iniciar.
#  (Primera vez: clic derecho → Abrir)
# =============================================

cd "$(dirname "$0")"

# Detener cualquier servidor previo en el mismo puerto
lsof -ti:8765 | xargs kill -9 2>/dev/null

clear
echo "============================================="
echo "  JaqueMáTICas  ·  Servidor Web Local  ♟"
echo "============================================="
echo ""
echo "  Iniciando servidor en:"
echo "  → http://localhost:8765"
echo ""
echo "  Abre esa dirección en tu navegador."
echo "  Cierra esta ventana para detener."
echo "============================================="
echo ""

# Iniciar servidor HTTP
python3 -m http.server 8765 &
SERVER_PID=$!
sleep 1

# Abrir el navegador automáticamente
open http://localhost:8765

# Esperar hasta que se cierre la ventana
wait $SERVER_PID
