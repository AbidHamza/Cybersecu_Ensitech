# Room 3 - SQL Injection

## Objectif de la room

Cette room vous apprend à comprendre et prévenir les injections SQL, l'une des vulnérabilités les plus dangereuses et courantes.

À la fin de cette room, vous serez capable de :
- Comprendre ce qu'est une injection SQL et comment elle fonctionne
- Identifier du code vulnérable aux injections SQL
- Utiliser les requêtes préparées pour prévenir les injections
- Valider et échapper les entrées utilisateur

## Scénario narratif

Vous travaillez sur une application de bibliothèque en ligne. Les utilisateurs peuvent rechercher des livres par titre, auteur, ou ISBN. Votre collègue a implémenté la fonctionnalité de recherche, mais vous suspectez qu'elle contient une vulnérabilité d'injection SQL.

Votre mission : analyser le code, comprendre la vulnérabilité, et implémenter une version sécurisée.

## Qu'est-ce qu'une injection SQL ?

Une **injection SQL** est une vulnérabilité qui se produit quand un attaquant injecte du code SQL malveillant dans une requête en manipulant les entrées utilisateur. C'est l'une des vulnérabilités les plus dangereuses et les plus courantes, classée #1 dans l'OWASP Top 10.

### Comment ça fonctionne ?

**Principe** : Si une application construit des requêtes SQL en concaténant directement des entrées utilisateur, un attaquant peut modifier la structure de la requête SQL en injectant des caractères spéciaux et du code SQL.

**Exemple simple et détaillé** :

**Code vulnérable** :
```javascript
const userInput = req.query.search; // L'utilisateur entre "Harry Potter"
const query = `SELECT * FROM books WHERE title = '${userInput}'`;
// Requête générée : SELECT * FROM books WHERE title = 'Harry Potter'
```

**Si l'utilisateur entre** : `' OR '1'='1`

**La requête devient** :
```sql
SELECT * FROM books WHERE title = '' OR '1'='1'
```

**Analyse de la requête modifiée** :
- `title = ''` : Cherche un titre vide (probablement aucun résultat)
- `OR` : Opérateur logique "OU"
- `'1'='1'` : Condition toujours vraie (1 est toujours égal à 1)
- **Résultat** : La condition `'1'='1'` étant toujours vraie, la requête retourne TOUS les livres de la table, indépendamment du titre

**Pourquoi c'est dangereux** : L'attaquant a modifié la logique de la requête pour contourner le filtre prévu par le développeur.

### Impact potentiel

Les injections SQL peuvent avoir des impacts catastrophiques :

- **Lecture de données** : Accès à toutes les données de la base (utilisateurs, mots de passe, informations personnelles, données financières)
- **Modification de données** : Modification ou suppression de données critiques (suppression de comptes, modification de prix, etc.)
- **Bypass d'authentification** : Connexion sans mot de passe en modifiant la requête de login
- **Exécution de commandes** : Sur certaines bases de données (comme SQL Server avec `xp_cmdshell`), exécution de commandes système sur le serveur
- **Escalade de privilèges** : Accès à des données ou fonctionnalités normalement réservées aux administrateurs
- **Exfiltration de données** : Extraction massive de données sensibles

**Exemple d'impact réel** : En 2017, Equifax a subi une fuite de données affectant 147 millions de personnes, en partie due à une injection SQL.

## Démarrage

### Prérequis

Avant de commencer, vérifiez que vous avez :

- Docker installé et fonctionnel
- Docker Compose installé et fonctionnel
- Un navigateur web moderne (Chrome, Firefox, Edge)

### Vérification de l'installation

#### Windows (PowerShell)

```powershell
# 1. Vérifier Docker
docker --version
# Résultat attendu : Docker version 20.10.x ou supérieur

# 2. Vérifier Docker Compose
docker-compose --version
# Résultat attendu : docker-compose version 1.29.x ou supérieur

# 3. Vérifier que Docker fonctionne
docker ps
# Résultat attendu : Liste des conteneurs (peut être vide, c'est normal)
```

**Si vous avez une erreur :**

- Docker n'est pas installé : Téléchargez Docker Desktop depuis https://www.docker.com/products/docker-desktop
- Docker n'est pas démarré : Lancez Docker Desktop depuis le menu Démarrer

#### Mac (Terminal)

```bash
# 1. Vérifier Docker
docker --version
# Résultat attendu : Docker version 20.10.x ou supérieur

# 2. Vérifier Docker Compose
docker-compose --version
# Résultat attendu : docker-compose version 1.29.x ou supérieur

# 3. Vérifier que Docker fonctionne
docker ps
# Résultat attendu : Liste des conteneurs (peut être vide, c'est normal)
```

**Si vous avez une erreur :**

- Docker n'est pas installé : Téléchargez Docker Desktop depuis https://www.docker.com/products/docker-desktop
- Docker n'est pas démarré : Lancez Docker Desktop depuis Applications

#### Linux (Terminal)

```bash
# 1. Vérifier Docker
docker --version
# Résultat attendu : Docker version 20.10.x ou supérieur

# 2. Vérifier Docker Compose
docker-compose --version
# Résultat attendu : docker-compose version 1.29.x ou supérieur

# 3. Vérifier que Docker fonctionne
docker ps
# Résultat attendu : Liste des conteneurs (peut être vide, c'est normal)
```

**Si vous avez une erreur :**

Installez Docker en suivant les instructions officielles : https://docs.docker.com/get-docker/

---

### Lancer l'environnement vulnérable

**Explication :** Nous allons lancer l'application vulnérable pour voir les injections SQL en action.

#### Windows (PowerShell)

```powershell
# 1. Ouvrez PowerShell
# 2. Naviguez vers le dossier de la room
cd C:\Users\VotreNom\Desktop\Cybersecu_Ensitech\room-3-sql-injection

# 3. Lancez Docker Compose
docker-compose up -d

# 4. Vérifiez que ça fonctionne
docker-compose ps
# Vous devriez voir un conteneur : room3-sql-vulnerable
```

**Que fait cette commande ?**

- `docker-compose up -d` : Lance le conteneur Docker en arrière-plan
- `-d` signifie "detached" (détaché) : le conteneur tourne en arrière-plan
- L'application démarre automatiquement

#### Mac (Terminal)

```bash
# 1. Ouvrez Terminal
# 2. Naviguez vers le dossier de la room
cd ~/Desktop/Cybersecu_Ensitech/room-3-sql-injection

# 3. Lancez Docker Compose
docker-compose up -d

# 4. Vérifiez que ça fonctionne
docker-compose ps
# Vous devriez voir un conteneur : room3-sql-vulnerable
```

#### Linux (Terminal)

```bash
# 1. Ouvrez Terminal
# 2. Naviguez vers le dossier de la room
cd ~/Desktop/Cybersecu_Ensitech/room-3-sql-injection

# 3. Lancez Docker Compose
docker-compose up -d

# 4. Vérifiez que ça fonctionne
docker-compose ps
# Vous devriez voir un conteneur : room3-sql-vulnerable
```

**Vérification :**

Ouvrez votre navigateur et allez sur :
- `http://localhost:3002` → Application vulnérable

**Si ça ne fonctionne pas :**

- Vérifiez les logs : `docker-compose logs`
- Vérifiez que le port 3002 n'est pas déjà utilisé
- Assurez-vous que Docker Desktop est lancé

---

### Lancer l'environnement sécurisé

**Explication :** Une fois que vous avez testé les injections SQL, lancez la version sécurisée pour comparer.

#### Windows (PowerShell)

```powershell
# Depuis le dossier room-3-sql-injection
docker-compose -f docker-compose.secured.yml up -d

# Vérifiez que ça fonctionne
docker-compose -f docker-compose.secured.yml ps
```

#### Mac/Linux (Terminal)

```bash
# Depuis le dossier room-3-sql-injection
docker-compose -f docker-compose.secured.yml up -d

# Vérifiez que ça fonctionne
docker-compose -f docker-compose.secured.yml ps
```

**Vérification :**

Ouvrez votre navigateur et allez sur :
- `http://localhost:3003` → Application sécurisée

## Analyse du code vulnérable

Le code vulnérable se trouve dans `/src-vulnerable/`. Voici les problèmes principaux :

### Problème 1 : Concaténation directe

```javascript
// VULNÉRABLE
const query = `SELECT * FROM books WHERE title LIKE '%${searchTerm}%'`;
db.all(query, (err, books) => { ... });
```

**Pourquoi c'est dangereux** : L'utilisateur contrôle `searchTerm` et peut injecter du SQL.

### Problème 2 : Pas de validation

```javascript
// VULNÉRABLE
app.get('/api/books', (req, res) => {
    const search = req.query.search || '';
    // Pas de validation, utilisation directe
});
```

**Pourquoi c'est dangereux** : N'importe quelle chaîne peut être injectée.

## Version sécurisée

Le code sécurisé utilise des **requêtes préparées** (prepared statements).

### Solution : Requêtes préparées

```javascript
// SÉCURISÉ
const query = `SELECT * FROM books WHERE title LIKE ?`;
db.all(query, [`%${searchTerm}%`], (err, books) => { ... });
```

**Pourquoi c'est sécurisé** : La base de données traite les paramètres séparément du SQL, empêchant l'injection.

### Autres protections

1. **Validation des entrées** : Vérifier le type et le format avant utilisation
2. **Principe du moindre privilège** : L'utilisateur de la base de données n'a que les permissions nécessaires
3. **Échappement** : En dernier recours, échapper les caractères spéciaux (mais les requêtes préparées sont préférables)

## Ressources pédagogiques

### Ordre recommandé de consultation

Pour tirer le meilleur parti de cette room, suivez cet ordre :

1. **Lisez ce README** pour comprendre les injections SQL et leurs impacts
2. **Lancez l'application vulnérable** et testez des injections SQL pour voir comment elles fonctionnent
3. **Analysez le code vulnérable** dans `/src-vulnerable/` pour identifier les problèmes
4. **Réalisez l'exercice** dans `/exercises/` pour corriger le code
5. **Comparez avec la version sécurisée** dans `/src-secured/` pour voir les bonnes pratiques
6. **Vérifiez votre implémentation** avec la checklist de sécurité

### Exercices guidés

L'exercice vous guide pour sécuriser le code :

- **[Exercice 1 : Corriger les injections SQL](./exercises/exercise-1.md)** - Remplacer les concaténations par des requêtes préparées et ajouter la validation

**Conseil** : Testez d'abord les injections SQL sur l'application vulnérable pour bien comprendre le problème avant de corriger. Consultez la solution dans `/SOLUTIONS/room-3/` uniquement après avoir tenté de résoudre par vous-même.

### Checklist de sécurité

Utilisez la **[checklist de sécurité complète](./checklists/security-checklist.md)** pour vérifier que votre code est protégé contre les injections SQL. Cette checklist couvre :

- Utilisation de requêtes préparées (prepared statements)
- Validation des entrées (types, formats, longueurs)
- Gestion des erreurs (messages génériques, pas d'exposition de détails SQL)
- Principe du moindre privilège (permissions de la base de données)
- Tests de sécurité (différents types d'injections à tester)

**Conseil** : Utilisez cette checklist comme référence lors du développement de vos propres applications.

## Exemples de payloads SQL à tester

**Note importante :** Ces tests sont pour l'apprentissage uniquement. Ne les utilisez jamais sur des sites réels sans autorisation.

### Payload 1 : Bypass d'authentification

```
' OR '1'='1
```

**Où tester :** Champ de recherche ou formulaire de login

**Explication :** Cette injection modifie la condition SQL pour qu'elle soit toujours vraie.

**Comment ça marche :**

Requête normale :
```sql
SELECT * FROM books WHERE title = 'Harry Potter'
```

Avec l'injection :
```sql
SELECT * FROM books WHERE title = '' OR '1'='1'
```

La condition `'1'='1'` est toujours vraie, donc tous les livres sont retournés.

---

### Payload 2 : Commentaire SQL

```
' OR '1'='1'--
```

**Où tester :** Champ de recherche

**Explication :** Le `--` commente le reste de la requête SQL, ce qui permet d'ignorer les conditions suivantes.

**Comment ça marche :**

Si la requête originale est :
```sql
SELECT * FROM books WHERE title = 'input' AND author = 'test'
```

Avec l'injection :
```sql
SELECT * FROM books WHERE title = '' OR '1'='1'--' AND author = 'test'
```

Tout après `--` est ignoré, donc la condition `author = 'test'` n'est pas vérifiée.

---

### Payload 3 : UNION pour extraire des données

```
' UNION SELECT username, password FROM users--
```

**Où tester :** Champ de recherche (si la table a le bon nombre de colonnes)

**Explication :** UNION permet de combiner deux requêtes SQL. Si la première requête retourne 2 colonnes, vous pouvez utiliser UNION pour extraire des données d'une autre table.

**Comment ça marche :**

Requête originale :
```sql
SELECT title, author FROM books WHERE title = 'input'
```

Avec l'injection :
```sql
SELECT title, author FROM books WHERE title = '' UNION SELECT username, password FROM users--'
```

Cela retourne d'abord les livres, puis les utilisateurs avec leurs mots de passe.

**Important :** Le nombre de colonnes doit correspondre. Si la première requête retourne 2 colonnes, UNION doit aussi retourner 2 colonnes.

---

### Payload 4 : Erreur SQL pour identifier la structure

```
' OR 1=1 AND 1=2--
```

**Où tester :** N'importe quel champ

**Explication :** Génère une erreur qui peut révéler la structure de la base de données.

**Comment ça marche :**

Si vous entrez ce payload et que vous voyez une erreur comme :
```
SQLITE_ERROR: no such column: password
```

Cela vous indique que la colonne s'appelle peut-être `password_hash` au lieu de `password`.

---

### Payload 5 : Injection avec guillemets doubles

```
" OR "1"="1
```

**Où tester :** Si les guillemets simples sont échappés

**Explication :** Parfois les applications échappent les guillemets simples mais pas les doubles.

---

### Payload 6 : Injection avec encodage URL

```
%27 OR %271%27=%271
```

**Où tester :** Dans l'URL directement

**Explication :** Version encodée URL de `' OR '1'='1`. Certaines applications décodent automatiquement.

---

## Comment tester ces payloads

### Test 1 : Injection SQL basique

**Étapes :**

1. Allez sur `http://localhost:3002`
2. Dans le champ de recherche, entrez : `' OR '1'='1`
3. Cliquez sur "Rechercher"

**Résultat attendu (vulnérable) :**

- Vous voyez tous les livres au lieu de seulement ceux correspondant à votre recherche
- Cela prouve que l'injection SQL fonctionne

**Résultat attendu (sécurisé) :**

- Vous voyez un message d'erreur ou aucun résultat
- L'injection ne fonctionne pas grâce aux requêtes préparées

---

### Test 2 : Vérifier les erreurs SQL

**Étapes :**

1. Allez sur `http://localhost:3002`
2. Dans le champ de recherche, entrez : `'`
3. Cliquez sur "Rechercher"

**Résultat attendu (vulnérable) :**

- Vous voyez une erreur SQL qui révèle des informations sur la base de données
- Exemple : `SQLITE_ERROR: near "title": syntax error`

**Résultat attendu (sécurisé) :**

- Vous voyez un message d'erreur générique
- Aucune information sur la structure de la base de données n'est révélée

---

### Test 3 : Comparer vulnérable vs sécurisé

**Étapes :**

1. Testez le même payload sur les deux applications
2. Comparez les résultats

**Application vulnérable (http://localhost:3002) :**
- Entrez : `' OR '1'='1`
- Résultat : Tous les livres s'affichent

**Application sécurisée (http://localhost:3003) :**
- Entrez : `' OR '1'='1`
- Résultat : Aucun livre ou message d'erreur
- L'injection ne fonctionne pas

---

## Types d'injections SQL

### Injection classique

```sql
' OR '1'='1
```

**Utilisation :** Pour bypasser des conditions ou récupérer toutes les données.

---

### Injection avec UNION

```sql
' UNION SELECT username, password FROM users--
```

**Utilisation :** Pour extraire des données d'autres tables.

**Prérequis :** Connaître le nombre de colonnes retournées par la requête originale.

---

### Injection aveugle (Blind SQL Injection)

Quand les résultats ne sont pas directement visibles, mais on peut déduire des informations via des réponses conditionnelles.

**Exemple :**
```sql
' OR (SELECT COUNT(*) FROM users WHERE username='admin') > 0--
```

Si la page répond différemment, on sait que l'utilisateur 'admin' existe.

---

### Injection basée sur le temps (Time-based)

```sql
'; WAITFOR DELAY '00:00:05'--
```

**Utilisation :** Pour confirmer une injection SQL même si les résultats ne sont pas visibles. Si la page met 5 secondes à répondre, l'injection fonctionne.

**Note :** Cette syntaxe fonctionne sur SQL Server. Pour SQLite, utilisez :
```sql
'; SELECT CASE WHEN 1=1 THEN 1 ELSE 1/0 END--
```

## Arrêter l'environnement

Quand vous avez terminé, arrêtez les conteneurs :

```bash
# Depuis le dossier room-3-sql-injection

# Arrêter la version vulnérable
docker-compose down

# Arrêter la version sécurisée
docker-compose -f docker-compose.secured.yml down
```

**Que fait cette commande ?**

- Arrête tous les conteneurs de cette room
- Libère les ports utilisés
- Nettoie les ressources Docker

---

## Questions fréquentes

**Q : Pourquoi les requêtes préparées protègent-elles contre les injections SQL ?**

R : Les requêtes préparées séparent le code SQL des données. La base de données traite d'abord la structure SQL, puis les données séparément. Même si vous injectez du SQL dans les données, il sera traité comme une valeur, pas comme du code.

**Q : Est-ce que la validation suffit ?**

R : Non ! La validation vérifie que les données sont correctes, mais elle ne protège pas contre les injections SQL. Il faut toujours utiliser des requêtes préparées.

**Q : Comment savoir combien de colonnes retourne une requête ?**

R : Pour utiliser UNION, vous devez connaître le nombre de colonnes. Testez avec :
```sql
' UNION SELECT NULL--
' UNION SELECT NULL, NULL--
' UNION SELECT NULL, NULL, NULL--
```
Quand vous n'avez plus d'erreur, vous avez le bon nombre de colonnes.

**Q : Toutes les bases de données sont-elles vulnérables ?**

R : Oui, toutes les bases de données SQL peuvent être vulnérables si le code concatène directement les entrées utilisateur dans les requêtes.

---

## Vérification finale

Avant de passer à la Room 4, assurez-vous d'avoir :

- [ ] Compris comment fonctionnent les injections SQL
- [ ] Testé des injections SQL sur l'application vulnérable avec les payloads ci-dessus
- [ ] Réalisé l'exercice de correction
- [ ] Compris pourquoi les requêtes préparées sont la solution
- [ ] Comparé les résultats entre version vulnérable et sécurisée
- [ ] Consulté la [checklist de sécurité](./checklists/security-checklist.md) et vérifié votre code

## Erreurs fréquentes

### Erreur 1 : Penser que la validation suffit

**Symptôme** : Valider l'input mais toujours utiliser la concaténation

**Solution** : Toujours utiliser des requêtes préparées, même avec validation

### Erreur 2 : Échappement manuel

**Symptôme** : Essayer d'échapper manuellement les caractères spéciaux

**Solution** : Utiliser les requêtes préparées, c'est plus sûr et plus simple

### Erreur 3 : Requêtes préparées partiellement

**Symptôme** : Utiliser des requêtes préparées pour certains paramètres mais pas tous

**Solution** : Tous les paramètres doivent passer par des requêtes préparées

## Comment partager vos réponses et votre code

Pour partager votre code sécurisé, c'est très simple :

### Méthode simple : Créer une Issue GitHub

1. Allez sur la page GitHub du dépôt
2. Cliquez sur **"Issues"** puis **"New Issue"**
3. Dans le **titre**, écrivez : `[Room 3] Code sécurisé - Votre nom`
   - Exemple : `[Room 3] Requêtes préparées - Sophie Bernard`
4. Dans le **corps de l'issue**, collez directement votre code

**C'est tout !** Collez simplement votre code dans l'issue.

### Format simple pour partager

Copiez-collez ce format :

````
# Mes réponses - Room 3

## Injections SQL que j'ai testées :
- `' OR '1'='1` : [Décrivez ce qui s'est passé]
- `' UNION SELECT ...` : [Décrivez ce qui s'est passé]

## Code sécurisé :

```javascript
// Collez ici votre code avec les requêtes préparées
// Par exemple, votre endpoint /api/books sécurisé
```

## Modifications que j'ai apportées :
- [Liste de vos corrections]
- [Ce que vous avez changé]
````

**Astuce** : Utilisez trois backticks (```) avant et après votre code pour qu'il soit bien formaté.

### Si vous avez des questions

Créez une issue avec le titre : `[Question] Room 3 - Votre question`

Expliquez :
- Ce que vous essayez de faire
- L'erreur que vous rencontrez (copiez-collez le message)
- Ce que vous avez déjà essayé

## Dépannage

### La requête ne fonctionne pas

**Vérifications :**

1. Consultez les logs de la base de données :
   ```bash
   docker-compose logs
   ```

2. Vérifiez la syntaxe SQL de votre requête préparée

3. Vérifiez que tous les paramètres sont bien passés

4. Vérifiez que la table existe dans la base de données

### Erreur "SQLITE_ERROR"

**Causes possibles :**

1. **Table n'existe pas** : Vérifiez que la base de données est bien initialisée
2. **Syntaxe SQL incorrecte** : Vérifiez votre requête
3. **Types de données incorrects** : Vérifiez que vous passez les bons types

**Solution :**

```bash
# Consultez les logs détaillés
docker-compose logs -f

# Redémarrez les conteneurs
docker-compose restart
```

### L'application ne répond pas

**Vérifications :**

1. Vérifiez que le conteneur est lancé : `docker-compose ps`
2. Vérifiez les logs : `docker-compose logs`
3. Vérifiez que le port 3002 (ou 3003) n'est pas déjà utilisé

### Les injections SQL ne fonctionnent pas

**Si vous testez sur l'application sécurisée :**

C'est normal ! L'application sécurisée utilise des requêtes préparées, donc les injections ne fonctionnent pas. Testez sur l'application vulnérable (port 3002).

**Si vous testez sur l'application vulnérable :**

1. Vérifiez que vous utilisez le bon port (3002)
2. Essayez différents payloads (certains peuvent être filtrés)
3. Regardez les erreurs dans la console du navigateur (F12)

Pour plus de détails, consultez [TROUBLESHOOTING.md](../../TROUBLESHOOTING.md) à la racine du projet.

## Prochaines étapes

Une fois que vous maîtrisez les injections SQL, vous êtes prêt pour la **Room 4 - XSS**, où vous apprendrez à protéger contre l'injection de scripts JavaScript.

