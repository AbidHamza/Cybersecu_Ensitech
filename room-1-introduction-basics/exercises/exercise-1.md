# Exercice 1 : Analyse de code vulnérable

## Objectif

Analyser un extrait de code et identifier les problèmes de sécurité.

## Code à analyser

```javascript
// Fonction pour récupérer les informations d'un utilisateur
function getUserProfile(userId) {
    const sql = `SELECT * FROM users WHERE id = ${userId}`;
    const user = database.query(sql);
    
    if (user) {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role
        };
    }
    return null;
}
```

## Questions

1. **Identification des problèmes** : Listez tous les problèmes de sécurité que vous identifiez dans ce code.

2. **Classification** : Pour chaque problème identifié, indiquez :
   - Le type de vulnérabilité (injection, exposition de données, etc.)
   - Le niveau de criticité (faible, moyen, élevé, critique)
   - L'impact potentiel (que pourrait faire un attaquant ?)

3. **Exploitation** : Pour le problème le plus critique, expliquez comment un attaquant pourrait l'exploiter concrètement.

4. **Amélioration** : Proposez des améliorations conceptuelles (pas besoin de coder) pour corriger chaque problème.

## Indices

- Pensez à qui contrôle la variable `userId`
- Réfléchissez à ce qui est retourné dans la réponse
- Considérez ce qui se passe si `userId` contient autre chose qu'un nombre
- Pensez aux données sensibles qui ne devraient pas être exposées

## Réflexion

Après avoir identifié les problèmes, réfléchissez à :
- Pourquoi ces erreurs sont-elles courantes ?
- Comment un développeur pourrait éviter ces erreurs ?
- Quelle est la meilleure approche pour sécuriser ce code ?

## Solution

Une fois que vous avez terminé votre analyse, consultez la solution dans `/SOLUTIONS/room-1/exercise-1.md` pour comparer votre analyse.

