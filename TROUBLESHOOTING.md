# Guide de Dépannage

Ce guide vous aide à résoudre les problèmes courants que vous pourriez rencontrer lors de l'utilisation de ce dépôt.

## Problèmes Docker

### Docker ne démarre pas

**Symptôme :** `docker: command not found` ou `Cannot connect to Docker daemon`

**Solutions :**

**Windows :**
1. Vérifiez que Docker Desktop est installé
2. Lancez Docker Desktop depuis le menu Démarrer
3. Attendez que l'icône Docker dans la barre des tâches soit verte (en bas à droite)
4. Redémarrez votre ordinateur si nécessaire
5. Réinstallez Docker Desktop si le problème persiste

**Mac :**
1. Vérifiez que Docker Desktop est installé
2. Lancez Docker Desktop depuis Applications
3. Attendez que l'icône Docker dans la barre de menu soit active (en haut à droite)
4. Redémarrez votre Mac si nécessaire

**Vérification :**
```bash
docker --version
# Doit afficher : Docker version 20.10.x ou supérieur
```

---

### Port déjà utilisé

**Symptôme :** `Error: bind: address already in use` ou `Port 3000 is already allocated`

**Solutions :**

**Windows (PowerShell) :**
```powershell
# 1. Trouvez quel programme utilise le port
netstat -ano | findstr :3000

# 2. Notez le PID (dernier nombre dans la ligne)
# 3. Arrêtez le processus
taskkill /PID [PID] /F

# Ou arrêtez tous les conteneurs Docker
docker stop $(docker ps -q)
```

**Mac/Linux (Terminal) :**
```bash
# 1. Trouvez quel programme utilise le port
lsof -i :3000

# 2. Notez le PID
# 3. Arrêtez le processus
kill -9 [PID]

# Ou arrêtez tous les conteneurs Docker
docker stop $(docker ps -q)
```

**Alternative :** Changez le port dans le fichier `docker-compose.yml` de la room

---

### Conteneur ne démarre pas

**Symptôme :** `docker-compose up` échoue ou le conteneur s'arrête immédiatement

**Solutions :**

1. **Vérifiez les logs :**
   ```bash
   docker-compose logs
   ```

2. **Vérifiez que tous les fichiers sont présents :**
   - `Dockerfile` dans chaque dossier src
   - `package.json` dans chaque dossier src
   - `server.js` dans chaque dossier src

3. **Réinstallez les dépendances :**
   ```bash
   docker-compose down
   docker-compose build --no-cache
   docker-compose up -d
   ```

4. **Vérifiez les erreurs dans les logs :**
   ```bash
   docker-compose logs -f
   ```

---

### Erreur "Cannot connect to Docker daemon"

**Symptôme :** Docker ne répond pas aux commandes

**Solutions :**

1. **Vérifiez que Docker Desktop est lancé**
   - Windows : Icône dans la barre des tâches
   - Mac : Icône dans la barre de menu

2. **Redémarrez Docker Desktop**
   - Windows : Clic droit sur l'icône → Restart
   - Mac : Docker Desktop → Quit, puis relancez

3. **Redémarrez votre ordinateur**

---

## Problèmes d'accès

### L'application ne répond pas

**Vérifications étape par étape :**

1. **Le conteneur est-il lancé ?**
   ```bash
   docker-compose ps
   ```
   Vous devriez voir "Up" dans la colonne State

2. **Les logs montrent-ils des erreurs ?**
   ```bash
   docker-compose logs
   ```
   Cherchez les messages d'erreur en rouge

3. **Essayez d'accéder à l'URL dans un navigateur privé**
   - Ouvrez une fenêtre de navigation privée (Ctrl+Shift+N ou Cmd+Shift+N)
   - Allez sur l'URL indiquée dans le README de la room

4. **Vérifiez le bon port :**
   - Room 2 : http://localhost:3000 (vulnérable) ou http://localhost:3001 (sécurisé)
   - Room 3 : http://localhost:3002 (vulnérable) ou http://localhost:3003 (sécurisé)
   - Room 4 : http://localhost:3004 (vulnérable) ou http://localhost:3005 (sécurisé)
   - Room 5 : http://localhost:3006 (vulnérable) ou http://localhost:3007 (sécurisé)
   - Room 6 : http://localhost:3008

---

### Erreur 404 (Page non trouvée)

**Causes possibles :**

1. **Mauvaise URL** : Vérifiez le port dans le README de la room
2. **L'application n'est pas complètement démarrée** : Attendez 10-15 secondes après `docker-compose up`
3. **Le conteneur s'est arrêté** : Vérifiez avec `docker-compose ps`

**Solution :**
```bash
# Vérifiez l'état
docker-compose ps

# Redémarrez si nécessaire
docker-compose restart

# Consultez les logs pour voir les erreurs
docker-compose logs
```

---

### L'application charge mais ne fonctionne pas

**Vérifications :**

1. **Vérifiez les logs de l'application :**
   ```bash
   docker-compose logs -f
   ```

2. **Vérifiez la console du navigateur :**
   - Appuyez sur F12
   - Allez dans l'onglet "Console"
   - Cherchez les erreurs JavaScript

3. **Vérifiez les requêtes réseau :**
   - Appuyez sur F12
   - Allez dans l'onglet "Network"
   - Rechargez la page
   - Vérifiez si des requêtes échouent (rouge)

---

## Problèmes de code

### Erreur "module not found"

**Symptôme :** `Error: Cannot find module 'express'` ou similaire

**Solution :**
Les dépendances ne sont pas installées. Docker devrait les installer automatiquement, mais si ça échoue :

```bash
# Arrêtez les conteneurs
docker-compose down

# Reconstruisez sans cache
docker-compose build --no-cache

# Relancez
docker-compose up -d

# Vérifiez les logs
docker-compose logs
```

---

### Erreur de syntaxe dans le code

**Symptôme :** `SyntaxError` ou erreurs de compilation

**Solution :**
Vous avez peut-être modifié les fichiers par erreur. Restaurez-les depuis Git :

```bash
# Depuis le dossier de la room
git checkout -- .

# Ou depuis la racine pour restaurer tout
cd ..
git checkout -- .
```

---

### L'application démarre mais les fonctionnalités ne marchent pas

**Vérifications :**

1. **Vérifiez que la base de données est initialisée :**
   - Consultez les logs : `docker-compose logs`
   - Cherchez les messages d'initialisation de la base de données

2. **Vérifiez les erreurs dans la console du navigateur :**
   - F12 → Console
   - Cherchez les erreurs JavaScript

3. **Vérifiez les requêtes réseau :**
   - F12 → Network
   - Vérifiez si les requêtes API fonctionnent

---

## Problèmes spécifiques Windows

### PowerShell ne reconnaît pas les commandes

**Symptôme :** `&&` n'est pas reconnu

**Solution :**
Utilisez `;` au lieu de `&&` dans PowerShell, ou faites les commandes sur des lignes séparées :

```powershell
# Au lieu de :
cd room-2; docker-compose up -d

# Utilisez :
cd room-2
docker-compose up -d
```

---

### Problèmes de permissions

**Symptôme :** `Access denied` ou erreurs de permissions

**Solutions :**

1. **Lancez PowerShell en tant qu'administrateur :**
   - Clic droit sur PowerShell → Exécuter en tant qu'administrateur

2. **Ajoutez votre utilisateur au groupe Docker :**
   - Ouvrez "Gestion de l'ordinateur"
   - Utilisateurs et groupes locaux → Groupes → docker-users
   - Ajoutez votre utilisateur

3. **Redémarrez votre ordinateur**

---

### Docker Desktop ne démarre pas

**Solutions :**

1. **Vérifiez les prérequis :**
   - Windows 10 64-bit ou supérieur
   - WSL 2 activé (Windows Subsystem for Linux)

2. **Activez WSL 2 :**
   ```powershell
   # En tant qu'administrateur
   wsl --install
   ```

3. **Réinstallez Docker Desktop**

---

## Problèmes spécifiques Mac

### Docker demande des permissions

**Solution :**
1. Allez dans Préférences Système → Sécurité et confidentialité
2. Autorisez Docker Desktop

---

### Erreur "Docker Desktop is starting"

**Solution :**
Attendez quelques minutes. Docker Desktop peut prendre du temps au premier démarrage.

---

### Problèmes de performance

**Symptôme :** Docker est très lent

**Solutions :**

1. **Allouez plus de ressources à Docker :**
   - Docker Desktop → Settings → Resources
   - Augmentez la RAM et les CPU

2. **Vérifiez l'espace disque :**
   - Docker Desktop → Settings → Resources → Advanced
   - Nettoyez les images inutilisées : `docker system prune -a`

---

## Problèmes spécifiques Linux

### Docker nécessite sudo

**Symptôme :** Il faut utiliser `sudo docker` à chaque fois

**Solution :**
Ajoutez votre utilisateur au groupe docker :

```bash
sudo usermod -aG docker $USER
# Déconnectez-vous et reconnectez-vous
```

---

## Problèmes Git

### Erreur "git: command not found"

**Windows :**
- Téléchargez Git depuis https://git-scm.com/download/win
- Installez-le avec les options par défaut

**Mac :**
```bash
xcode-select --install
```

**Linux :**
```bash
sudo apt-get install git
```

---

### Erreur lors du clone

**Symptôme :** `Permission denied` ou erreur de connexion

**Solutions :**

1. **Vérifiez votre connexion Internet**

2. **Essayez avec HTTPS au lieu de SSH :**
   ```bash
   git clone https://github.com/AbidHamza/Cybersecu_Ensitech.git
   ```

3. **Vérifiez que Git est installé :**
   ```bash
   git --version
   ```

---

## Problèmes de navigateur

### L'application ne s'affiche pas correctement

**Solutions :**

1. **Videz le cache du navigateur :**
   - Ctrl+Shift+Delete (Windows) ou Cmd+Shift+Delete (Mac)
   - Cochez "Images et fichiers en cache"
   - Cliquez sur "Effacer les données"

2. **Essayez un navigateur différent :**
   - Chrome, Firefox, Edge

3. **Essayez en navigation privée :**
   - Ctrl+Shift+N (Windows) ou Cmd+Shift+N (Mac)

---

### Les outils développeur ne s'ouvrent pas

**Solutions :**

1. **Raccourcis clavier :**
   - Windows/Linux : F12 ou Ctrl+Shift+I
   - Mac : Cmd+Option+I

2. **Menu du navigateur :**
   - Chrome : Menu (⋮) → Plus d'outils → Outils de développement
   - Firefox : Menu (☰) → Outils de développement web
   - Edge : Menu (⋯) → Plus d'outils → Outils de développement

---

## Problèmes Postman (Room 5)

### Postman ne peut pas se connecter à l'API

**Vérifications :**

1. **L'API est-elle lancée ?**
   ```bash
   docker-compose ps
   ```

2. **L'URL est-elle correcte ?**
   - API vulnérable : http://localhost:3006
   - API sécurisée : http://localhost:3007

3. **Testez dans le navigateur d'abord :**
   - Allez sur http://localhost:3006/api/products
   - Si ça fonctionne, le problème vient de Postman

---

### Erreur CORS dans Postman

**Note :** Les erreurs CORS n'affectent généralement pas Postman. Si vous voyez une erreur CORS, vérifiez que vous utilisez la bonne URL.

---

## Besoin d'aide supplémentaire ?

Si vous avez toujours des problèmes :

1. **Consultez les logs détaillés :**
   ```bash
   docker-compose logs -f
   ```

2. **Créez une issue GitHub :**
   - Allez sur https://github.com/AbidHamza/Cybersecu_Ensitech/issues
   - Cliquez sur "New Issue"
   - Titre : `[Question] Problème avec [Room X] - [Description]`
   - Décrivez :
     - Ce que vous essayez de faire
     - Les commandes que vous avez exécutées
     - Les messages d'erreur complets (copiez-collez)
     - Votre système d'exploitation (Windows/Mac/Linux)
     - Les logs Docker si pertinents

3. **Vérifiez la documentation Docker :**
   - https://docs.docker.com/get-docker/
   - https://docs.docker.com/compose/gettingstarted/

4. **Vérifiez le README de la room concernée :**
   - Chaque room a sa propre section de dépannage
   - Consultez-la avant de créer une issue

---

## Commandes utiles

### Voir tous les conteneurs Docker
```bash
docker ps -a
```

### Arrêter tous les conteneurs
```bash
docker stop $(docker ps -q)
```

### Supprimer tous les conteneurs
```bash
docker rm $(docker ps -aq)
```

### Nettoyer Docker (libère de l'espace)
```bash
docker system prune -a
```

### Voir l'utilisation des ressources
```bash
docker stats
```

---

## Prévention des problèmes

Pour éviter les problèmes :

1. **Toujours vérifier que Docker Desktop est lancé** avant d'utiliser `docker-compose`

2. **Arrêter les conteneurs** quand vous avez terminé :
   ```bash
   docker-compose down
   ```

3. **Ne pas modifier les fichiers** dans `src-vulnerable/` et `src-secured/` sauf si c'est demandé dans les exercices

4. **Lire les README** des rooms avant de commencer

5. **Suivre les instructions étape par étape** sans sauter d'étapes
