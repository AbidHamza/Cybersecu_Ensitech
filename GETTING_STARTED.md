# Guide de Démarrage Ultra-Simple

## Pour les étudiants qui n'ont jamais utilisé Docker

Ce guide est conçu pour les étudiants qui n'ont jamais utilisé Docker, Git, ou même un terminal. Suivez les étapes une par une.

---

## Étape 1 : Installer Docker (10 minutes)

### Qu'est-ce que Docker ?

Docker est un outil qui permet de lancer des applications dans des conteneurs isolés. Pour vous, cela signifie que vous n'avez pas besoin d'installer Node.js, npm, ou d'autres outils. Docker fait tout pour vous.

### Installation

**Windows :**

1. Allez sur https://www.docker.com/products/docker-desktop
2. Cliquez sur "Download for Windows"
3. Téléchargez le fichier `Docker Desktop Installer.exe`
4. Double-cliquez sur le fichier téléchargé
5. Suivez les instructions d'installation
6. Redémarrez votre ordinateur si demandé
7. Lancez Docker Desktop depuis le menu Démarrer
8. Attendez que l'icône Docker dans la barre des tâches soit verte (en bas à droite)

**Mac :**

1. Allez sur https://www.docker.com/products/docker-desktop
2. Cliquez sur "Download for Mac"
3. Téléchargez le fichier `.dmg`
4. Double-cliquez sur le fichier téléchargé
5. Glissez Docker dans le dossier Applications
6. Lancez Docker Desktop depuis Applications
7. Attendez que l'icône Docker dans la barre de menu soit active (en haut à droite)

**Linux :**

Suivez les instructions officielles : https://docs.docker.com/get-docker/

### Vérification

**Comment savoir si Docker fonctionne ?**

1. Ouvrez PowerShell (Windows) ou Terminal (Mac)
2. Tapez : `docker --version`
3. Appuyez sur Entrée

**Résultat attendu :**
```
Docker version 20.10.x
```

**Si vous voyez une erreur :**
- "command not found" → Docker n'est pas installé ou pas dans le PATH
- "Cannot connect to Docker daemon" → Docker Desktop n'est pas lancé

**Solutions :**
- Réinstallez Docker Desktop
- Lancez Docker Desktop depuis le menu Démarrer/Applications
- Redémarrez votre ordinateur

---

## Étape 2 : Installer Git (5 minutes)

### Qu'est-ce que Git ?

Git est un outil qui permet de télécharger des projets depuis GitHub. C'est comme télécharger un fichier, mais pour du code.

### Installation

**Windows :**

1. Allez sur https://git-scm.com/download/win
2. Téléchargez Git pour Windows
3. Installez-le avec les options par défaut
4. Redémarrez PowerShell si nécessaire

**Mac :**

Git est généralement déjà installé. Vérifiez avec :
```bash
git --version
```

Si ce n'est pas installé :
```bash
xcode-select --install
```

**Linux :**

```bash
sudo apt-get install git
```

### Vérification

Ouvrez PowerShell (Windows) ou Terminal (Mac) et tapez :
```bash
git --version
```

**Résultat attendu :**
```
git version 2.x.x
```

---

## Étape 3 : Télécharger le projet

### Windows (PowerShell)

1. Ouvrez PowerShell
2. Tapez : `cd Desktop`
3. Appuyez sur Entrée
4. Tapez : `git clone https://github.com/AbidHamza/Cybersecu_Ensitech.git`
5. Appuyez sur Entrée
6. Attendez que le téléchargement se termine
7. Tapez : `cd Cybersecu_Ensitech`
8. Appuyez sur Entrée

**Vous devriez maintenant être dans le dossier du projet.**

### Mac (Terminal)

1. Ouvrez Terminal
2. Tapez : `cd ~/Desktop`
3. Appuyez sur Entrée
4. Tapez : `git clone https://github.com/AbidHamza/Cybersecu_Ensitech.git`
5. Appuyez sur Entrée
6. Attendez que le téléchargement se termine
7. Tapez : `cd Cybersecu_Ensitech`
8. Appuyez sur Entrée

**Vous devriez maintenant être dans le dossier du projet.**

### Vérification

Tapez : `ls` (Mac/Linux) ou `dir` (Windows)

**Vous devriez voir :**
- room-1-introduction-basics/
- room-2-authentication/
- room-3-sql-injection/
- room-4-xss/
- room-5-secure-api/
- room-6-mini-pentest-web/
- README.md
- etc.

---

## Étape 4 : Commencer avec Room 1 (Pas besoin de Docker)

**Room 1 est entièrement théorique, pas besoin de Docker !**

1. Ouvrez le dossier `room-1-introduction-basics`
2. Ouvrez le fichier `README.md` (double-cliquez dessus)
3. Lisez-le attentivement
4. Faites les exercices dans le dossier `exercises/`
5. Consultez les solutions dans `SOLUTIONS/room-1/` après avoir essayé

**Temps estimé :** 1-2 heures

**Conseil :** Prenez votre temps. Room 1 pose les bases essentielles pour comprendre les rooms suivantes.

---

## Étape 5 : Tester Room 2 avec Docker (Votre première application)

**Une fois Room 1 terminée, testez Room 2 avec Docker :**

### Windows (PowerShell)

1. Ouvrez PowerShell
2. Tapez : `cd Desktop\Cybersecu_Ensitech\room-2-authentication`
3. Appuyez sur Entrée
4. Tapez : `docker-compose up -d`
5. Appuyez sur Entrée
6. Attendez 10-15 secondes

**Vérification :**

1. Ouvrez votre navigateur (Chrome, Firefox, Edge)
2. Allez sur : http://localhost:3000
3. Vous devriez voir l'application !

### Mac (Terminal)

1. Ouvrez Terminal
2. Tapez : `cd ~/Desktop/Cybersecu_Ensitech/room-2-authentication`
3. Appuyez sur Entrée
4. Tapez : `docker-compose up -d`
5. Appuyez sur Entrée
6. Attendez 10-15 secondes

**Vérification :**

1. Ouvrez votre navigateur
2. Allez sur : http://localhost:3000
3. Vous devriez voir l'application !

---

## Problèmes courants

### "docker: command not found"

**Solution :**
- Docker n'est pas installé → Installez Docker Desktop
- Docker n'est pas lancé → Lancez Docker Desktop
- PowerShell/Terminal n'a pas été redémarré → Fermez et rouvrez PowerShell/Terminal

### "Port 3000 is already allocated"

**Solution :**
Un autre programme utilise le port 3000. Arrêtez-le ou changez le port dans docker-compose.yml.

### "Cannot connect to Docker daemon"

**Solution :**
- Lancez Docker Desktop
- Attendez que l'icône soit verte/active
- Redémarrez votre ordinateur si nécessaire

### L'application ne s'affiche pas dans le navigateur

**Vérifications :**

1. Le conteneur est-il lancé ?
   ```bash
   docker-compose ps
   ```
   Vous devriez voir "Up" dans la colonne State

2. Attendez 10-15 secondes après `docker-compose up -d`

3. Essayez de recharger la page (F5)

4. Essayez en navigation privée (Ctrl+Shift+N ou Cmd+Shift+N)

---

## Prochaines étapes

Une fois que Room 2 fonctionne :

1. Suivez les instructions dans le README de Room 2
2. Testez l'application vulnérable
3. Comparez avec l'application sécurisée
4. Faites les exercices
5. Passez à Room 3, puis Room 4, etc.

---

## Besoin d'aide ?

Si vous avez des problèmes :

1. Consultez [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
2. Consultez le README de la room concernée
3. Créez une issue GitHub avec le tag `[Question]`

---

## Félicitations !

Vous avez maintenant :
- Docker installé et fonctionnel
- Le projet téléchargé
- Room 1 complétée (ou en cours)
- Room 2 lancée et fonctionnelle

Vous êtes prêt à apprendre la sécurité web !
