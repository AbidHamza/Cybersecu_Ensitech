# Scénario 1 : La startup TechCorp

## Contexte

Vous êtes développeur junior dans TechCorp, une startup qui développe une plateforme de gestion de projets. L'application permet aux équipes de collaborer, partager des fichiers, et gérer des tâches.

## Situation

Votre responsable technique, Sarah, vous montre un extrait de code de la fonctionnalité de recherche d'utilisateurs :

```javascript
// Recherche d'utilisateurs par nom
function searchUsers(query) {
    const sql = `SELECT * FROM users WHERE name LIKE '%${query}%'`;
    return database.query(sql);
}
```

"Ce code fonctionne bien", dit Sarah, "mais j'ai entendu parler de quelque chose appelé 'SQL Injection'. Est-ce que ce code pourrait avoir un problème ?"

## Votre mission

1. Analyser ce code et identifier les problèmes potentiels
2. Expliquer pourquoi ces problèmes sont dangereux
3. Proposer une solution conceptuelle (pas besoin de coder pour l'instant)

## Questions de réflexion

- Que se passe-t-il si un utilisateur entre une requête normale comme "John" ?
- Que se passe-t-il si un utilisateur entre quelque chose d'inattendu comme "'; DROP TABLE users; --" ?
- Pourquoi la construction de la requête SQL de cette manière est-elle dangereuse ?
- Quelles données pourraient être exposées ou modifiées ?

## Indices

- Pensez à ce qui se passe quand la variable `query` est directement insérée dans la chaîne SQL
- Réfléchissez à ce qu'un attaquant pourrait vouloir faire : lire des données, modifier des données, supprimer des données
- Considérez que l'attaquant contrôle la valeur de `query` (c'est une entrée utilisateur)

## Réflexion éthique

Dans ce scénario, vous analysez le code de votre propre entreprise pour l'améliorer. C'est parfaitement légitime et encouragé.

**Rappel** : N'utilisez jamais ces techniques sur des systèmes que vous ne possédez pas ou pour lesquels vous n'avez pas d'autorisation explicite.

