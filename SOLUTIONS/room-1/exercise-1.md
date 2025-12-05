# Solution - Exercice 1 : Analyse de code vulnérable

## Problèmes identifiés

### 1. Injection SQL (CRITIQUE)

**Localisation** : Ligne avec `const sql = \`SELECT * FROM users WHERE id = ${userId}\`;`

**Cause** : La variable `userId` est directement concaténée dans la requête SQL sans validation ni requête préparée.

**Impact** : Un attaquant peut modifier la requête SQL pour :
- Lire toutes les données : `1 OR 1=1`
- Lire les données d'autres utilisateurs : `1 UNION SELECT * FROM users`
- Supprimer des données : `1; DROP TABLE users;--`

**Exploitation** : 
```
GET /api/user/1 OR 1=1
GET /api/user/1 UNION SELECT username, password FROM users--
```

### 2. Exposition de données sensibles (ÉLEVÉ)

**Localisation** : Le mot de passe est retourné dans la réponse JSON.

**Cause** : Aucun filtrage des données sensibles avant l'envoi de la réponse.

**Impact** : Si un attaquant réussit à exploiter l'injection SQL, il obtient directement les mots de passe.

### 3. Pas de validation d'input (MOYEN)

**Localisation** : Aucune validation de `userId`.

**Cause** : Pas de vérification du type ou du format de `userId`.

**Impact** : Permet l'injection SQL et peut causer des erreurs applicatives.

### 4. Gestion d'erreur insuffisante (FAIBLE)

**Localisation** : Si `database.query()` échoue, l'erreur peut exposer des informations.

**Impact** : Peut révéler la structure de la base de données ou des chemins de fichiers.

## Améliorations proposées

### Correction 1 : Utiliser des requêtes préparées

```javascript
function getUserProfile(userId) {
    // Validation de l'ID
    const id = parseInt(userId, 10);
    if (isNaN(id) || id <= 0) {
        return { error: 'ID invalide' };
    }
    
    // Requête préparée
    const sql = `SELECT * FROM users WHERE id = ?`;
    const user = database.query(sql, [id]);
    
    if (user) {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            // Ne PAS retourner le mot de passe
            role: user.role
        };
    }
    return null;
}
```

### Correction 2 : Filtrer les données sensibles

Ne jamais retourner de mots de passe, tokens, ou autres données sensibles dans les réponses API.

### Correction 3 : Validation stricte

Toujours valider et typer les entrées avant utilisation.

### Correction 4 : Gestion d'erreur sécurisée

```javascript
try {
    const user = database.query(sql, [id]);
    // ...
} catch (error) {
    console.error('Erreur base de données:', error);
    return { error: 'Erreur serveur' }; // Message générique
}
```

## Ce qui doit être retenu

1. **Jamais de concaténation directe** dans les requêtes SQL
2. **Toujours utiliser des requêtes préparées** pour les paramètres
3. **Ne jamais exposer de données sensibles** dans les réponses
4. **Valider toutes les entrées** avant utilisation
5. **Gérer les erreurs** sans exposer d'informations sensibles

## Erreurs fréquentes

- Penser que la validation suffit (elle ne protège pas contre l'injection SQL)
- Oublier de filtrer les données sensibles dans les réponses
- Utiliser des requêtes préparées partiellement (tous les paramètres doivent être préparés)

