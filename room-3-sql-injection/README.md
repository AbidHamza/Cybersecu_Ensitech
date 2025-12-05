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

### Lancer l'environnement vulnérable

```bash
cd room-3-sql-injection
docker-compose up -d
```

L'application vulnérable sera accessible sur `http://localhost:3002`

### Lancer l'environnement sécurisé

```bash
cd room-3-sql-injection
docker-compose -f docker-compose.secured.yml up -d
```

L'application sécurisée sera accessible sur `http://localhost:3003`

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

## Types d'injections SQL

### Injection classique

```sql
' OR '1'='1
```

### Injection avec UNION

```sql
' UNION SELECT username, password FROM users--
```

### Injection aveugle (Blind SQL Injection)

Quand les résultats ne sont pas directement visibles, mais on peut déduire des informations via des réponses conditionnelles.

### Injection basée sur le temps (Time-based)

```sql
'; WAITFOR DELAY '00:00:05'--
```

## Vérification finale

Avant de passer à la Room 4, assurez-vous d'avoir :

- [ ] Compris comment fonctionnent les injections SQL
- [ ] Testé des injections SQL sur l'application vulnérable
- [ ] Réalisé l'exercice de correction
- [ ] Compris pourquoi les requêtes préparées sont la solution
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

- Vérifiez la syntaxe SQL de votre requête préparée
- Vérifiez que tous les paramètres sont bien passés
- Consultez les logs de la base de données

### Erreur "SQLITE_ERROR"

- Vérifiez que la table existe
- Vérifiez la syntaxe SQL
- Vérifiez les types de données

## Prochaines étapes

Une fois que vous maîtrisez les injections SQL, vous êtes prêt pour la **Room 4 - XSS**, où vous apprendrez à protéger contre l'injection de scripts JavaScript.

