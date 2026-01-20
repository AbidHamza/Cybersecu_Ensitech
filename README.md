# Web Security Academy

Un dépôt pédagogique complet pour comprendre et pratiquer la sécurité des applications web.

## Objectif général

Ce dépôt a été conçu pour les développeurs débutants souhaitant acquérir des bases solides en sécurité web. Chaque room (salle) aborde un thème spécifique de manière progressive, avec des exemples concrets, du code vulnérable à analyser, des versions sécurisées pour comparaison, et des exercices guidés.

L'objectif n'est pas de devenir un expert en cybersécurité, mais de comprendre les vulnérabilités courantes, leurs impacts, et les bonnes pratiques pour les éviter dès le développement.

## Comment utiliser les rooms

Chaque room est indépendante mais suit une progression logique :

1. **Lisez le README de la room** pour comprendre le contexte et les objectifs
2. **Suivez le scénario narratif** pour vous immerger dans le contexte
3. **Analysez le code vulnérable** fourni dans `/src-vulnerable/`
4. **Réalisez les exercices** proposés dans `/exercises/`
5. **Consultez la checklist** pour vérifier votre compréhension
6. **Comparez avec la version sécurisée** dans `/src-secured/`
7. **Consultez les solutions** dans `/SOLUTIONS/` si besoin

**Important** : Ne consultez les solutions qu'après avoir tenté de résoudre les exercices par vous-même.

## Guide de Démarrage Ultra-Simple (Pour les étudiants très débutants)

Ce guide est conçu pour les étudiants qui n'ont jamais utilisé Docker, Git, ou même un terminal. Suivez les étapes une par une.

> **Note :** Pour un guide encore plus détaillé avec toutes les explications, consultez [GETTING_STARTED.md](./GETTING_STARTED.md).

---

### Étape 1 : Installer Docker (10 minutes)

**Qu'est-ce que Docker ?**

Docker est un outil qui permet de lancer des applications dans des conteneurs isolés. Pour vous, cela signifie que vous n'avez pas besoin d'installer Node.js, npm, ou d'autres outils. Docker fait tout pour vous.

**Windows :**

1. Allez sur https://www.docker.com/products/docker-desktop
2. Téléchargez Docker Desktop pour Windows
3. Installez-le (redémarrez votre ordinateur si demandé)
4. Lancez Docker Desktop depuis le menu Démarrer
5. Attendez que l'icône Docker dans la barre des tâches soit verte (en bas à droite)

**Mac :**

1. Allez sur https://www.docker.com/products/docker-desktop
2. Téléchargez Docker Desktop pour Mac
3. Installez-le
4. Lancez Docker Desktop depuis Applications
5. Attendez que l'icône Docker dans la barre de menu soit active (en haut à droite)

**Linux :**

Suivez les instructions officielles : https://docs.docker.com/get-docker/

**Vérification :**

Ouvrez PowerShell (Windows) ou Terminal (Mac/Linux) et tapez :
```bash
docker --version
```

**Résultat attendu :** `Docker version 20.10.x` ou supérieur

**Si vous voyez une erreur :**
- "command not found" → Docker n'est pas installé ou pas dans le PATH
- "Cannot connect to Docker daemon" → Docker Desktop n'est pas lancé

**Solutions :**
- Réinstallez Docker Desktop
- Lancez Docker Desktop depuis le menu Démarrer/Applications
- Redémarrez votre ordinateur

---

### Étape 2 : Installer Git (5 minutes)

**Qu'est-ce que Git ?**

Git est un outil qui permet de télécharger des projets depuis GitHub. C'est comme télécharger un fichier, mais pour du code.

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

**Vérification :**

Ouvrez PowerShell (Windows) ou Terminal (Mac) et tapez :
```bash
git --version
```

**Résultat attendu :** `git version 2.x.x`

---

### Étape 3 : Télécharger le projet

**Windows (PowerShell) :**

1. Ouvrez PowerShell
2. Tapez : `cd Desktop`
3. Appuyez sur Entrée
4. Tapez : `git clone https://github.com/AbidHamza/Cybersecu_Ensitech.git`
5. Appuyez sur Entrée
6. Attendez que le téléchargement se termine
7. Tapez : `cd Cybersecu_Ensitech`
8. Appuyez sur Entrée

**Mac (Terminal) :**

1. Ouvrez Terminal
2. Tapez : `cd ~/Desktop`
3. Appuyez sur Entrée
4. Tapez : `git clone https://github.com/AbidHamza/Cybersecu_Ensitech.git`
5. Appuyez sur Entrée
6. Attendez que le téléchargement se termine
7. Tapez : `cd Cybersecu_Ensitech`
8. Appuyez sur Entrée

**Vérification :**

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

### Étape 4 : Commencer avec Room 1 (Pas besoin de Docker)

**Room 1 est entièrement théorique, pas besoin de Docker !**

1. Ouvrez le dossier `room-1-introduction-basics`
2. Ouvrez le fichier `README.md` (double-cliquez dessus)
3. Lisez-le attentivement
4. Faites les exercices dans le dossier `exercises/`
5. Consultez les solutions dans `SOLUTIONS/room-1/` après avoir essayé

**Temps estimé :** 1-2 heures

**Conseil :** Prenez votre temps. Room 1 pose les bases essentielles pour comprendre les rooms suivantes.

---

### Étape 5 : Tester Room 2 avec Docker (Votre première application)

**Une fois Room 1 terminée, testez Room 2 avec Docker :**

**Windows (PowerShell) :**

1. Ouvrez PowerShell
2. Tapez : `cd Desktop\Cybersecu_Ensitech\room-2-authentication`
3. Appuyez sur Entrée
4. Tapez : `docker-compose up -d`
5. Appuyez sur Entrée
6. Attendez 10-15 secondes

**Mac (Terminal) :**

1. Ouvrez Terminal
2. Tapez : `cd ~/Desktop/Cybersecu_Ensitech/room-2-authentication`
3. Appuyez sur Entrée
4. Tapez : `docker-compose up -d`
5. Appuyez sur Entrée
6. Attendez 10-15 secondes

**Vérification :**

1. Ouvrez votre navigateur (Chrome, Firefox, Edge)
2. Allez sur : http://localhost:3000
3. Vous devriez voir l'application !

**Si ça ne fonctionne pas :**
- Vérifiez que Docker Desktop est lancé
- Attendez 10-15 secondes après `docker-compose up -d`
- Consultez [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## Préparer son environnement

### Prérequis techniques

**Option recommandée (avec Docker)** :
- **Docker** et **Docker Compose** : pour lancer les environnements isolés
- **Node.js** (version 18 ou supérieure) : optionnel si vous utilisez Docker
- **Postman** (optionnel) : pour tester les APIs dans la Room 5
- **Un éditeur de code** : VS Code, WebStorm, ou autre
- **Git** : pour cloner et versionner

**Option alternative (sans Docker)** :
- **Node.js** (version 18 ou supérieure) : obligatoire pour lancer les applications localement
- **Un éditeur de code** : VS Code, WebStorm, ou autre
- **Git** : pour cloner et versionner

> **Note** : Si vous n'avez pas Docker, consultez la section [Utiliser le dépôt sans Docker](#utiliser-le-dépôt-sans-docker) ci-dessous pour les instructions détaillées.

### Installation rapide (avec Docker)

1. **Clonez le dépôt** :
   
   Ouvrez votre terminal (PowerShell sur Windows, Terminal sur Mac) et exécutez :
   
   ```bash
   git clone https://github.com/AbidHamza/Cybersecu_Ensitech.git
   cd Cybersecu_Ensitech
   ```
   
   **Où exécuter** : Dans le dossier où vous voulez télécharger le projet (ex: `C:\Users\VotreNom\Desktop` ou `~/Desktop`)

2. **Vérifiez Docker** :
   
   Dans le même terminal, vérifiez que Docker est installé :
   
   **Windows (PowerShell)** :
   ```powershell
   docker --version
   docker-compose --version
   ```
   
   **Mac (Terminal)** :
   ```bash
   docker --version
   docker-compose --version
   ```
   
   **Où exécuter** : N'importe où dans votre terminal
   
   Si Docker n'est pas installé, téléchargez-le sur [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

3. **Lancez un environnement de test** :
   
   Naviguez vers une room et lancez Docker :
   
   **Windows (PowerShell)** :
   ```powershell
   cd room-2-authentication
   docker-compose up
   ```
   
   **Mac (Terminal)** :
   ```bash
   cd room-2-authentication
   docker-compose up
   ```
   
   **Où exécuter** : Depuis le dossier racine du projet (`Cybersecu_Ensitech`)
   
   **Résultat attendu** : Vous devriez voir les logs de l'application démarrer. L'application sera accessible sur `http://localhost:3000`

## Lancer les environnements

Chaque room contient un `docker-compose.yml` pour lancer l'environnement vulnérable et/ou sécurisé.

### Lancer une room spécifique

**Étape 1** : Ouvrez votre terminal et naviguez vers le dossier de la room

**Windows (PowerShell)** :
```powershell
# Depuis le dossier racine du projet (Cybersecu_Ensitech)
cd room-3-sql-injection
docker-compose up -d
```

**Mac (Terminal)** :
```bash
# Depuis le dossier racine du projet (Cybersecu_Ensitech)
cd room-3-sql-injection
docker-compose up -d
```

**Où exécuter** : Depuis le dossier racine du projet (`Cybersecu_Ensitech`)

**Explication** :
- `cd room-3-sql-injection` : Change de répertoire vers la room 3
- `docker-compose up -d` : Lance les conteneurs en arrière-plan (`-d` = detached mode)

L'application sera accessible sur le port indiqué dans le README de la room (généralement `http://localhost:3002` pour la room 3).

### Arrêter un environnement

**Windows (PowerShell)** :
```powershell
# Depuis le dossier de la room (ex: room-3-sql-injection)
docker-compose down
```

**Mac (Terminal)** :
```bash
# Depuis le dossier de la room (ex: room-3-sql-injection)
docker-compose down
```

**Où exécuter** : Depuis le dossier de la room où vous avez lancé Docker (ex: `room-3-sql-injection`)

**Explication** : `docker-compose down` arrête et supprime les conteneurs de la room.

### Voir les logs

**Windows (PowerShell)** :
```powershell
# Depuis le dossier de la room
docker-compose logs -f
```

**Mac (Terminal)** :
```bash
# Depuis le dossier de la room
docker-compose logs -f
```

**Où exécuter** : Depuis le dossier de la room où Docker est lancé

**Explication** : `-f` suit les logs en temps réel (comme `tail -f`). Appuyez sur `Ctrl+C` pour quitter.

### Exemple complet : Lancer la Room 2

**Windows (PowerShell)** :
```powershell
# 1. Ouvrez PowerShell
# 2. Naviguez vers le dossier du projet
cd C:\Users\VotreNom\Desktop\Cybersecu_Ensitech

# 3. Allez dans la room 2
cd room-2-authentication

# 4. Lancez Docker
docker-compose up -d

# 5. Vérifiez que ça fonctionne (optionnel)
docker-compose ps

# 6. Pour voir les logs
docker-compose logs -f

# 7. Pour arrêter (dans un autre terminal ou après Ctrl+C)
docker-compose down
```

**Mac (Terminal)** :
```bash
# 1. Ouvrez Terminal
# 2. Naviguez vers le dossier du projet
cd ~/Desktop/Cybersecu_Ensitech

# 3. Allez dans la room 2
cd room-2-authentication

# 4. Lancez Docker
docker-compose up -d

# 5. Vérifiez que ça fonctionne (optionnel)
docker-compose ps

# 6. Pour voir les logs
docker-compose logs -f

# 7. Pour arrêter (dans un autre terminal ou après Ctrl+C)
docker-compose down
```

## Utiliser le dépôt sans Docker

Si vous n'avez pas Docker installé, vous pouvez quand même utiliser ce dépôt, mais avec quelques limitations.

### Ce que vous pouvez faire sans Docker

- **Room 1 - Introduction & Fondamentaux** : Entièrement accessible sans Docker (contenu théorique uniquement)
- **Lire et analyser le code** : Tous les fichiers source sont disponibles et peuvent être lus
- **Comprendre les concepts** : Tous les README, exercices et solutions sont accessibles

### Ce que vous ne pourrez pas faire sans Docker

- **Lancer les applications** : Les applications vulnérables et sécurisées nécessitent Docker
- **Tester les vulnérabilités** : Impossible de reproduire les attaques sans l'environnement
- **Comparer le code vulnérable vs sécurisé** : Difficile de voir la différence sans tester

### Alternative : Installation locale (sans Docker)

Si vous ne pouvez pas installer Docker, vous pouvez installer les dépendances localement :

#### Prérequis pour installation locale

1. **Node.js** (version 18 ou supérieure) : [nodejs.org](https://nodejs.org/)
2. **SQLite** : Généralement inclus avec Node.js, ou téléchargeable séparément
3. **npm** : Inclus avec Node.js

#### Étapes pour lancer une application localement

**Exemple avec Room 2 - Authentication :**

**Windows (PowerShell)** :
```powershell
# 1. Ouvrez PowerShell et naviguez vers le dossier du projet
cd C:\Users\VotreNom\Desktop\Cybersecu_Ensitech

# 2. Aller dans le dossier de l'application vulnérable
cd room-2-authentication\src-vulnerable

# 3. Installer les dépendances
npm install

# 4. Lancer l'application
npm start
```

**Mac (Terminal)** :
```bash
# 1. Ouvrez Terminal et naviguez vers le dossier du projet
cd ~/Desktop/Cybersecu_Ensitech

# 2. Aller dans le dossier de l'application vulnérable
cd room-2-authentication/src-vulnerable

# 3. Installer les dépendances
npm install

# 4. Lancer l'application
npm start
```

**Où exécuter** :
- Étape 1 : Depuis n'importe où (votre dossier Desktop par exemple)
- Étapes 2-4 : Depuis le dossier racine du projet (`Cybersecu_Ensitech`)

**Résultat attendu** : L'application sera accessible sur `http://localhost:3000` (ou le port indiqué dans le code).

**Note** : Sur Windows, utilisez des backslashes (`\`) pour les chemins. Sur Mac/Linux, utilisez des slashes (`/`).

**Important** : 
- Vous devrez adapter les ports si plusieurs applications tournent en même temps
- Les bases de données SQLite seront créées localement dans le dossier de l'application
- Certaines configurations peuvent nécessiter des ajustements

#### Limitations de l'installation locale

- **Pas d'isolation** : Les applications tournent directement sur votre machine
- **Configuration manuelle** : Vous devrez peut-être adapter les ports et configurations
- **Base de données** : SQLite sera créée localement (fichiers `.db` dans le dossier)
- **Dépendances système** : Certaines dépendances peuvent nécessiter des outils système supplémentaires

### Recommandation

**Docker est fortement recommandé** car :
- Environnements isolés et pré-configurés
- Pas de conflits avec vos autres projets
- Fonctionne de la même manière sur tous les systèmes
- Facile à nettoyer (supprimer les conteneurs)

**Si vous ne pouvez vraiment pas installer Docker** :
- Suivez la Room 1 (entièrement accessible)
- Lisez et analysez le code des autres rooms
- Consultez les solutions pour comprendre les corrections
- Installez Node.js localement si vous voulez tester (voir instructions ci-dessus)

### Obtenir de l'aide pour l'installation

Si vous avez des difficultés à installer Docker ou Node.js :
1. Consultez la documentation officielle :
   - Docker : [docs.docker.com](https://docs.docker.com/get-docker/)
   - Node.js : [nodejs.org](https://nodejs.org/)
2. Créez une issue sur GitHub avec le tag `[Question]` pour obtenir de l'aide

## Pourquoi la sécurité concerne chaque développeur

La sécurité n'est pas uniquement l'affaire des experts en cybersécurité. En tant que développeur, vous êtes la première ligne de défense :

- **Vous écrivez le code** : les vulnérabilités naissent souvent d'erreurs de développement
- **Vous connaissez l'architecture** : vous savez où sont les points sensibles
- **Vous pouvez prévenir** : il est plus facile d'éviter une vulnérabilité que de la corriger après coup
- **Les utilisateurs vous font confiance** : leurs données personnelles transitent par votre code

Un code sécurisé dès le départ réduit les risques, protège les utilisateurs, et évite des coûts de correction importants.

## Introduction au OWASP Top 10

L'OWASP (Open Web Application Security Project) publie régulièrement une liste des 10 risques de sécurité les plus critiques pour les applications web. Ce dépôt couvre plusieurs d'entre eux :

1. **Injection** (Room 3) : SQL, NoSQL, OS, LDAP
2. **Authentification défaillante** (Room 2) : gestion incorrecte des sessions et identités
3. **Exposition de données sensibles** (Room 5) : données non chiffrées ou mal protégées
4. **XSS - Cross-Site Scripting** (Room 4) : injection de scripts malveillants
5. **Contrôle d'accès défaillant** : permissions insuffisantes ou mal configurées
6. **Configuration de sécurité incorrecte** : paramètres par défaut dangereux
7. **XSS basé sur le DOM** : variante du XSS
8. **Désérialisation non sécurisée** : manipulation d'objets sérialisés
9. **Utilisation de composants avec vulnérabilités connues** : dépendances obsolètes
10. **Journalisation et surveillance insuffisantes** : manque de traçabilité

## Glossaire des notions fondamentales

### Vulnérabilité
Une faiblesse dans le code, la configuration, ou l'architecture d'une application qui peut être exploitée. Une vulnérabilité existe indépendamment de toute tentative d'exploitation et peut être corrigée avant d'être exploitée. Elle peut être découverte par des audits de code, des tests de sécurité, ou accidentellement.

**Types** : Vulnérabilités de code (bugs), de configuration (paramètres incorrects), ou d'architecture (problèmes de conception).

### Menace
Un danger potentiel qui peut exploiter une vulnérabilité. Une menace peut être intentionnelle (attaquant malveillant) ou accidentelle (erreur humaine), interne (employé) ou externe (hacker), automatisée (bot) ou manuelle.

**Exemples** : Attaquant externe, utilisateur malveillant, malware, erreur humaine, catastrophe naturelle.

### Risque
La combinaison d'une vulnérabilité et d'une menace, pondérée par l'impact potentiel. Le risque représente la probabilité qu'un événement indésirable se produise et les conséquences de cet événement.

**Formule** : Risque = Vulnérabilité × Menace × Impact

**Niveaux** : Critique (action immédiate), Élevé (action urgente), Moyen (action planifiée), Faible (surveillance).

### Attaque
L'exploitation concrète d'une vulnérabilité par une menace. C'est l'action réelle d'un attaquant utilisant une vulnérabilité pour atteindre un objectif malveillant. Une attaque peut réussir (exploitation réussie) ou échouer (protection en place).

**Types** : Attaque active (modifie les données), passive (observe sans modifier), par déni de service (rend le service indisponible), par force brute (tente toutes les combinaisons).

### Exploit
Un code ou une technique utilisée pour exploiter une vulnérabilité. C'est la "recette" concrète qui permet à un attaquant d'utiliser une vulnérabilité pour atteindre son objectif.

**Exemple** : Un script qui envoie `' OR '1'='1` dans un champ de recherche pour exploiter une injection SQL.

### Mitigation
Une mesure de protection mise en place pour réduire ou éliminer un risque. Les mitigations peuvent être techniques (code sécurisé, configuration), organisationnelles (procédures, formation), ou physiques (sécurité des locaux).

**Exemples** : Requêtes préparées (mitigation contre injection SQL), échappement HTML (mitigation contre XSS), rate limiting (mitigation contre brute force).

### Authentication (Authentification)
Le processus de vérification de l'identité d'un utilisateur. Répond à la question "Qui êtes-vous ?". Généralement effectué via un nom d'utilisateur et un mot de passe, mais peut aussi utiliser des méthodes plus avancées (2FA, biométrie, certificats).

**Exemple** : Un utilisateur se connecte avec son nom d'utilisateur et son mot de passe. Le système vérifie que ces identifiants correspondent à un compte existant.

### Authorization (Autorisation)
Le processus de vérification des permissions d'un utilisateur. Répond à la question "Que pouvez-vous faire ?". Vérifie si un utilisateur authentifié a le droit d'accéder à une ressource ou d'effectuer une action.

**Exemple** : Un utilisateur authentifié essaie d'accéder à une page d'administration. Le système vérifie si cet utilisateur a le rôle "admin" avant d'autoriser l'accès.

**Mnémonique** : Authentication = "Qui êtes-vous ?", Authorization = "Que pouvez-vous faire ?"

### Hash (Hachage)
Une fonction cryptographique unidirectionnelle qui transforme une donnée (comme un mot de passe) en une chaîne de caractères de taille fixe, de manière irréversible. C'est une transformation à sens unique : on peut hasher un mot de passe, mais on ne peut pas "déhasher" pour retrouver le mot de passe original.

**Caractéristiques** : Unidirectionnel, déterministe (même entrée = même sortie avec le même salt), lent par design (résistant aux attaques par force brute), résistant aux collisions.

**Algorithme recommandé pour mots de passe** : bcrypt, argon2, scrypt (éviter MD5, SHA1, SHA256 qui sont trop rapides).

### Salt (Sel)
Une valeur aléatoire unique ajoutée au mot de passe avant le hachage. Chaque utilisateur a son propre salt, qui est généralement stocké avec le hash.

**Pourquoi essentiel** : Protège contre les rainbow tables (tables pré-calculées), assure l'unicité des hashs (même mot de passe = hashs différents), renforce la résistance aux attaques.

**Bonnes pratiques** : Aléatoire, unique pour chaque utilisateur, suffisamment long (au moins 16 caractères), stocké avec le hash (pas besoin de le cacher).

### Injection
L'injection de code malveillant dans une application via des entrées utilisateur non validées. L'attaquant modifie la structure d'une requête ou d'une commande en injectant des caractères spéciaux et du code malveillant.

**Types** : SQL Injection (injection de code SQL), NoSQL Injection, Command Injection (injection de commandes système), LDAP Injection, XPath Injection.

**Impact** : Accès non autorisé aux données, modification ou suppression de données, exécution de commandes, bypass d'authentification.

### XSS (Cross-Site Scripting)
L'injection de scripts JavaScript malveillants dans une page web vue par d'autres utilisateurs. Le JavaScript injecté s'exécute dans le contexte du site web légitime, avec les mêmes privilèges que le JavaScript légitime.

**Types** : XSS Réfléchi (code reflété immédiatement), XSS Stocké (code stocké dans la base de données), XSS basé sur le DOM (code injecté via manipulation JavaScript).

**Impact** : Vol de cookies de session, modification du contenu de la page, redirection vers des sites malveillants, vol de données saisies par l'utilisateur.

### CSRF (Cross-Site Request Forgery)
Une attaque qui force un utilisateur authentifié à exécuter des actions non désirées sur une application web où il est authentifié. L'attaquant exploite le fait que le navigateur envoie automatiquement les cookies de session avec chaque requête.

**Scénario** : Un utilisateur est connecté sur site.com. Il visite un site malveillant qui envoie une requête à site.com pour changer son mot de passe. Le navigateur envoie automatiquement le cookie de session, et la requête est exécutée comme si l'utilisateur l'avait demandée.

**Protection** : Tokens CSRF, vérification de l'origine de la requête, flag SameSite sur les cookies.

### Rate Limiting
La limitation du nombre de requêtes qu'un utilisateur (ou une IP) peut effectuer dans un laps de temps donné. Protège contre les abus, les attaques par force brute, et les attaques par déni de service.

**Exemple** : Limiter les tentatives de connexion à 5 par 15 minutes pour protéger contre les attaques par force brute.

**Configuration** : Fenêtre de temps (ex: 15 minutes), nombre maximum de requêtes (ex: 5), méthode d'identification (IP, utilisateur, combinaison).

## Roadmap pédagogique

### Room 1 - Introduction & fondamentaux

Comprendre les concepts de base, le vocabulaire, et l'importance de la sécurité. Aucun code à écrire, uniquement de la réflexion et de l'analyse.

### Room 2 - Authentication & sessions

Apprendre à implémenter une authentification sécurisée : hachage de mots de passe, gestion de sessions, protection contre les attaques courantes.

### Room 3 - SQL Injection

Comprendre les injections SQL, leurs impacts, et comment les prévenir avec les requêtes préparées.

### Room 4 - XSS

Analyser les différentes formes de XSS, leurs mécanismes, et les techniques de protection (échappement, sanitization, CSP).

### Room 5 - Sécuriser une API

Appliquer les bonnes pratiques pour sécuriser une API REST : validation, rate limiting, gestion des erreurs, headers de sécurité.

### Room 6 - Mini Pentest Web

Mettre en pratique toutes les connaissances acquises en réalisant un audit de sécurité simplifié sur une application vulnérable.

## Bonnes pratiques générales de sécurité

### 1. Ne jamais faire confiance aux entrées utilisateur
Toute donnée provenant de l'utilisateur (formulaires, URLs, headers) doit être validée et échappée.

### 2. Utiliser des requêtes préparées
Pour toute interaction avec une base de données, utiliser des requêtes préparées ou des ORM sécurisés.

### 3. Hacher les mots de passe
Jamais de stockage en clair. Utiliser des algorithmes robustes (bcrypt, argon2) avec un salt.

### 4. Gérer les sessions correctement
Cookies sécurisés (HttpOnly, Secure, SameSite), expiration appropriée, régénération après login.

### 5. Valider côté serveur
La validation côté client est une commodité, pas une sécurité. Toujours valider côté serveur.

### 6. Gérer les erreurs proprement
Ne pas exposer d'informations sensibles dans les messages d'erreur (chemins de fichiers, stack traces, etc.).

### 7. Utiliser HTTPS
Toujours chiffrer les communications, surtout pour l'authentification et les données sensibles.

### 8. Limiter les tentatives
Mettre en place un rate limiting pour les actions sensibles (login, réinitialisation de mot de passe).

### 9. Maintenir les dépendances à jour
Utiliser des outils pour détecter les vulnérabilités dans les dépendances (npm audit, Snyk, etc.).

### 10. Journaliser les événements importants
Logger les tentatives de connexion, les erreurs critiques, les actions sensibles (sans stocker de données sensibles).

## Règles d'éthique indispensables

**Ce dépôt est destiné à un usage éducatif uniquement.**

### Ce que vous DEVEZ faire
- Utiliser ces connaissances pour sécuriser vos propres applications
- Tester uniquement sur des applications que vous possédez ou avez l'autorisation de tester
- Respecter la vie privée et les données des utilisateurs
- Signaler de manière responsable les vulnérabilités trouvées

### Ce que vous NE DEVEZ PAS faire
- Tester sur des applications sans autorisation
- Exploiter des vulnérabilités à des fins malveillantes
- Accéder à des données sans autorisation
- Perturber des services en production

**Rappel légal** : L'accès non autorisé à un système informatique est un délit dans la plupart des juridictions. Les connaissances acquises ici doivent être utilisées de manière éthique et légale.

## Comment lire une vulnérabilité et une mitigation

### Structure d'analyse d'une vulnérabilité

1. **Identification** : Quel type de vulnérabilité ?
2. **Localisation** : Où se trouve-t-elle dans le code ?
3. **Cause** : Pourquoi existe-t-elle ? (code non validé, mauvaise configuration, etc.)
4. **Impact** : Que peut faire un attaquant ? (vol de données, prise de contrôle, etc.)
5. **Exploitation** : Comment un attaquant pourrait l'exploiter ? (exemple concret)

### Structure d'une mitigation

1. **Solution technique** : Quelle technique utiliser ? (requêtes préparées, échappement, validation, etc.)
2. **Implémentation** : Comment l'implémenter dans le code ?
3. **Vérification** : Comment s'assurer que la mitigation fonctionne ?
4. **Bonnes pratiques** : Quelles règles générales retenir ?

Dans chaque room, vous trouverez des exemples concrets de cette analyse.

## Dépannage

Pour un guide de dépannage complet avec toutes les solutions aux problèmes courants, consultez **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**.

### Dépannage rapide

### Problèmes Docker

#### Docker ne démarre pas

**Symptôme :** `docker: command not found` ou `Cannot connect to Docker daemon`

**Solutions :**

**Windows :**
1. Vérifiez que Docker Desktop est installé
2. Lancez Docker Desktop depuis le menu Démarrer
3. Attendez que l'icône Docker dans la barre des tâches soit verte
4. Redémarrez votre ordinateur si nécessaire
5. Réinstallez Docker Desktop si le problème persiste

**Mac :**
1. Vérifiez que Docker Desktop est installé
2. Lancez Docker Desktop depuis Applications
3. Attendez que l'icône Docker dans la barre de menu soit active
4. Redémarrez votre Mac si nécessaire

**Vérification :**
```bash
docker --version
# Doit afficher : Docker version 20.10.x ou supérieur
```

---

#### Port déjà utilisé

**Symptôme :** `Error: bind: address already in use` ou `Port 3000 is already allocated`

**Solutions :**

**Windows (PowerShell) :**
```powershell
# 1. Trouvez quel programme utilise le port
netstat -ano | findstr :3000

# 2. Notez le PID (dernier nombre)
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

#### Conteneur ne démarre pas

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

### Problèmes d'accès

#### L'application ne répond pas

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

#### Erreur 404 (Page non trouvée)

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
```

---

### Problèmes de code

#### Erreur "module not found"

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

#### Erreur de syntaxe dans le code

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

### Problèmes spécifiques Windows

#### PowerShell ne reconnaît pas les commandes

**Symptôme :** `&&` n'est pas reconnu

**Solution :**
Utilisez `;` au lieu de `&&` dans PowerShell :

```powershell
# Au lieu de :
cd room-2; docker-compose up -d

# Utilisez :
cd room-2
docker-compose up -d
```

---

#### Problèmes de permissions

**Symptôme :** `Access denied` ou erreurs de permissions

**Solution :**
1. Lancez PowerShell en tant qu'administrateur (clic droit → Exécuter en tant qu'administrateur)
2. Ou ajoutez votre utilisateur au groupe Docker

---

### Problèmes spécifiques Mac

#### Docker demande des permissions

**Solution :**
1. Allez dans Préférences Système → Sécurité et confidentialité
2. Autorisez Docker Desktop

---

### Besoin d'aide supplémentaire ?

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

3. **Vérifiez la documentation Docker :**
   - https://docs.docker.com/get-docker/
   - https://docs.docker.com/compose/gettingstarted/

### L'application ne répond pas

**Windows (PowerShell)** :
```powershell
# Depuis le dossier de la room (ex: room-2-authentication)
cd C:\Users\VotreNom\Desktop\Cybersecu_Ensitech\room-2-authentication

# 1. Vérifiez que le conteneur est bien lancé
docker-compose ps

# 2. Vérifiez les logs de l'application
docker-compose logs -f app

# 3. Vérifiez que le port n'est pas déjà utilisé
netstat -ano | findstr :3000
```

**Mac (Terminal)** :
```bash
# Depuis le dossier de la room (ex: room-2-authentication)
cd ~/Desktop/Cybersecu_Ensitech/room-2-authentication

# 1. Vérifiez que le conteneur est bien lancé
docker-compose ps

# 2. Vérifiez les logs de l'application
docker-compose logs -f app

# 3. Vérifiez que le port n'est pas déjà utilisé
lsof -i :3000
```

**Où exécuter** : Depuis le dossier de la room concernée

### Erreurs de dépendances Node.js

**Windows (PowerShell)** :
```powershell
# Depuis le dossier de l'application (ex: room-2-authentication\src-vulnerable)
cd C:\Users\VotreNom\Desktop\Cybersecu_Ensitech\room-2-authentication\src-vulnerable

# Supprimez les dépendances
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Réinstallez
npm install

# Vérifiez la version de Node.js
node --version
```

**Mac (Terminal)** :
```bash
# Depuis le dossier de l'application (ex: room-2-authentication/src-vulnerable)
cd ~/Desktop/Cybersecu_Ensitech/room-2-authentication/src-vulnerable

# Supprimez les dépendances
rm -rf node_modules
rm package-lock.json

# Réinstallez
npm install

# Vérifiez la version de Node.js
node --version
```

**Où exécuter** : Depuis le dossier `src-vulnerable` ou `src-secured` de la room concernée

**Note** : La version de Node.js doit être >= 18. Si ce n'est pas le cas, téléchargez une version plus récente sur [nodejs.org](https://nodejs.org/)

### Base de données ne se connecte pas

**Windows (PowerShell)** :
```powershell
# Depuis le dossier de la room (ex: room-3-sql-injection)
cd C:\Users\VotreNom\Desktop\Cybersecu_Ensitech\room-3-sql-injection

# 1. Vérifiez que le conteneur de base de données est lancé
docker-compose ps

# 2. Consultez les logs de la base de données
docker-compose logs db

# 3. Vérifiez les variables d'environnement dans docker-compose.yml
Get-Content docker-compose.yml
```

**Mac (Terminal)** :
```bash
# Depuis le dossier de la room (ex: room-3-sql-injection)
cd ~/Desktop/Cybersecu_Ensitech/room-3-sql-injection

# 1. Vérifiez que le conteneur de base de données est lancé
docker-compose ps

# 2. Consultez les logs de la base de données
docker-compose logs db

# 3. Vérifiez les variables d'environnement dans docker-compose.yml
cat docker-compose.yml
```

**Où exécuter** : Depuis le dossier de la room concernée

### Code ne fonctionne pas comme attendu
- Relisez attentivement le README de la room
- Vérifiez que vous avez bien suivi les instructions
- Consultez la section "Erreurs fréquentes" dans le README de la room
- Comparez avec le code de référence dans `/src-secured/`

### Questions générales
- Consultez d'abord le README de la room concernée
- Vérifiez la section dépannage de cette room
- Consultez les solutions dans `/SOLUTIONS/` si vous êtes bloqué

## Structure du dépôt

```
web-sec-academy/
├── README.md (ce fichier)
├── docker-compose.yml
├── CONTRIBUTING.md
├── room-1-introduction-basics/
│   ├── README.md
│   ├── scenarios/
│   └── checklists/
├── room-2-authentication/
│   ├── README.md
│   ├── src-vulnerable/
│   ├── src-secured/
│   ├── exercises/
│   └── checklists/
├── room-3-sql-injection/
│   ├── README.md
│   ├── src-vulnerable/
│   ├── src-secured/
│   ├── exercises/
│   └── checklists/
├── room-4-xss/
│   ├── README.md
│   ├── src-vulnerable/
│   ├── src-secured/
│   ├── exercises/
│   └── checklists/
├── room-5-secure-api/
│   ├── README.md
│   ├── src-vulnerable/
│   ├── src-secured/
│   ├── tests-postman/
│   └── checklists/
├── room-6-mini-pentest-web/
│   ├── README.md
│   ├── src-app/
│   ├── guides/
│   ├── report-template/
│   └── checklists/
└── SOLUTIONS/
    ├── room-1/
    ├── room-2/
    ├── room-3/
    ├── room-4/
    ├── room-5/
    └── room-6/
```

## Comment partager vos réponses (pour les étudiants)

Ce dépôt est public et destiné à l'apprentissage. Pour partager vos réponses, c'est très simple :

### Méthode simple : Créer une Issue GitHub

1. **Allez sur la page GitHub du dépôt**
2. **Cliquez sur l'onglet "Issues"** (en haut de la page)
3. **Cliquez sur le bouton vert "New Issue"**
4. **Dans le titre**, écrivez : `[Room X] Exercice - Votre nom`
   - Exemple : `[Room 1] Exercice 1 - Jean Dupont`
   - Exemple : `[Room 2] Exercice 1 - Hachage bcrypt - Marie Martin`
   - Exemple : `[Room 3] Code sécurisé - SQL Injection - Pierre Dubois`
5. **Dans le corps de l'issue**, collez directement vos réponses ou votre code

**C'est tout !** Pas besoin de Gist, Pastebin ou autre service. Collez simplement vos réponses dans l'issue GitHub.

### Pour partager du code

Si vous avez du code à partager, collez-le directement dans l'issue en utilisant trois backticks (```) avant et après :

````
```javascript
// Votre code ici
function maFonction() {
    // ...
}
```
````

GitHub formatera automatiquement votre code avec la coloration syntaxique.

### Tags à utiliser dans les titres

- `[Room 1]` : Pour la Room 1 - Introduction
- `[Room 2]` : Pour la Room 2 - Authentication
- `[Room 3]` : Pour la Room 3 - SQL Injection
- `[Room 4]` : Pour la Room 4 - XSS
- `[Room 5]` : Pour la Room 5 - Sécuriser une API
- `[Room 6]` : Pour la Room 6 - Mini Pentest
- `[Question]` : Pour poser une question
- `[Aide]` : Pour demander de l'aide

### Exemples simples

**Pour partager des réponses écrites** :
```
Titre : [Room 1] Exercice 1 - Jean Dupont

Corps :
# Mes réponses

## Problèmes identifiés :
1. Mots de passe en clair
2. Pas de validation
...
```

**Pour partager du code** :
```
Titre : [Room 2] Exercice 1 - Hachage bcrypt - Marie Martin

Corps :
# Mon code

```javascript
const bcrypt = require('bcrypt');
// Mon code ici
```
```

**Pour poser une question** :
```
Titre : [Question] Room 3 - Erreur SQL - Sophie

Corps :
Bonjour,

Je rencontre cette erreur : SQLITE_ERROR: no such column

J'ai essayé de [décrire ce que vous avez fait]

Pouvez-vous m'aider ?
```

### Important

- **Ne modifiez pas** les fichiers existants du dépôt
- **Collez directement** vos réponses dans l'issue (pas besoin de fichiers externes)
- **Soyez respectueux** dans vos messages
- **Respectez l'éthique** : ce dépôt est à des fins éducatives uniquement

### Obtenir de l'aide

Si vous êtes bloqué :

1. Consultez d'abord les solutions dans `/SOLUTIONS/room-X/`
2. Relisez le README de la room concernée
3. Créez une issue avec le tag `[Question]` ou `[Aide]`
4. Décrivez clairement :
   - Ce que vous essayez de faire
   - Où vous êtes bloqué
   - Les erreurs que vous rencontrez (copiez-collez le message d'erreur)

## Prochaines étapes

1. **Commencez par la Room 1** pour acquérir les fondamentaux (pas besoin de Docker)
2. **Suivez l'ordre des rooms** pour une progression naturelle
3. **Prenez le temps de comprendre** chaque concept avant de passer au suivant
4. **Pratiquez avec les exercices** proposés dans chaque room
5. **Consultez les solutions** uniquement après avoir tenté de résoudre les exercices
6. **Partagez vos réponses** et posez vos questions via les issues GitHub

## Besoin d'aide ?

- **Première fois avec Docker/Git ?** Consultez [GETTING_STARTED.md](./GETTING_STARTED.md) pour un guide ultra-détaillé
- **Problèmes techniques ?** Consultez [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Questions sur une room ?** Consultez le README de la room concernée
- **Questions générales ?** Créez une issue GitHub avec le tag `[Question]`

## Ressources supplémentaires

- **Documentation Docker :** https://docs.docker.com/get-docker/
- **Documentation Docker Compose :** https://docs.docker.com/compose/gettingstarted/
- **OWASP Top 10 :** https://owasp.org/www-project-top-ten/
- **MDN Web Docs :** https://developer.mozilla.org/ (pour comprendre HTML, CSS, JavaScript)

Bonne chance dans votre apprentissage de la sécurité web !

