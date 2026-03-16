# PokéDex Colección 🎴

App web progresiva (PWA) para llevar el registro de tu colección de cartas Pokémon TCG en pareja. Se instala en el móvil como app nativa y sincroniza en tiempo real con Firebase.

## Características

- ✅ **Checklist** de los 1025 Pokémon + formas alternativas
- 🃏 **Carta TCG**: mantén pulsado un Pokémon para guardar la carta que tienes físicamente
- 🔄 **Sincronización en tiempo real** via Firebase (compartida entre dos personas)
- 📱 **Instalable como app** en iOS y Android (PWA)
- 🌐 **Funciona offline** (el shell se cachea; los datos se sincronizan cuando hay red)

## Estructura del repositorio

```
pokedex/
├── index.html       ← App completa
├── manifest.json    ← Configuración PWA
├── sw.js            ← Service Worker (cache + offline)
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

## Despliegue en GitHub Pages

1. Sube este repositorio a GitHub (ver instrucciones abajo)
2. Ve a **Settings → Pages**
3. En *Source*, selecciona `main` branch, carpeta `/` (root)
4. Guarda — en unos segundos tendrás una URL tipo `https://tuusuario.github.io/pokedex/`

> ⚠️ **Importante**: el Service Worker requiere HTTPS, que GitHub Pages provee automáticamente.

## Primeros pasos con Git

```bash
# 1. Inicializar el repo
git init
git add .
git commit -m "Initial commit"

# 2. Conectar con GitHub (crea el repo vacío en github.com primero)
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git branch -M main
git push -u origin main
```

## Actualizar la app

Cada vez que quieras hacer cambios:

```bash
git add .
git commit -m "Descripción del cambio"
git push
```

GitHub Pages se actualiza automáticamente en ~1 minuto. **Los datos en Firebase no se tocan.**

## Instalar como app en el móvil

### Android (Chrome)
1. Abre la URL en Chrome
2. Aparece un banner "Agregar a inicio" — toca **Instalar**
3. O bien: menú ⋮ → **Agregar a pantalla de inicio**

### iOS (Safari)
1. Abre la URL en Safari
2. Toca el botón compartir (cuadrado con flecha ↑)
3. Selecciona **"Añadir a pantalla de inicio"**
4. Confirma — aparece el ícono como app nativa
