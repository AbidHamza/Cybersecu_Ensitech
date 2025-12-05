# Solution Room 3 - Vue d'ensemble

## Corrections principales

### 1. Utilisation de requêtes préparées

**Avant (vulnérable)** :
```javascript
const query = `SELECT * FROM books WHERE title LIKE '%${search}%'`;
db.all(query, (err, books) => { ... });
```

**Après (sécurisé)** :
```javascript
const query = `SELECT * FROM books WHERE title LIKE ?`;
db.all(query, [`%${search}%`], (err, books) => { ... });
```

### 2. Validation des entrées

Toujours valider avant d'utiliser dans les requêtes :
- Type de données
- Longueur
- Format (pour les IDs numériques)

### 3. Gestion d'erreurs sécurisée

Ne pas exposer les détails des erreurs SQL à l'utilisateur final.

## Points clés à retenir

1. **Jamais de concaténation** dans les requêtes SQL
2. **Toujours des requêtes préparées** pour les paramètres
3. **Validation + requêtes préparées** = double protection
4. **Principe du moindre privilège** pour l'utilisateur de la base de données

