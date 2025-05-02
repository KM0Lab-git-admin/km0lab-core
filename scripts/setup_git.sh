#!/bin/bash

# Configuración básica
GIT_NAME="KM0Lab Git Admin"
GIT_EMAIL="git@km0lab.com"

echo "⚙️ Configurando Git global..."
git config --global user.name "$GIT_NAME"
git config --global user.email "$GIT_EMAIL"

# Opciones recomendadas
echo "⚙️ Estableciendo opciones recomendadas..."
git config --global core.autocrlf true           # Normaliza saltos de línea (recomendado en Windows)
git config --global core.safecrlf true           # Evita conflictos por saltos de línea
git config --global pull.rebase false            # Usa merge por defecto en 'git pull'
git config --global init.defaultBranch main      # Usa 'main' como rama por defecto
git config --global color.ui auto                # Colorea salidas del CLI
git config --global alias.st status              # Alias útil
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm "commit -m"
git config --global credential.helper cache      # Guarda credenciales temporalmente (útil para dev)
git config --global core.editor "nano"           # Cambia esto si prefieres otro editor

# Verificación
echo "✅ Git configurado correctamente con:"
git config --global --list
