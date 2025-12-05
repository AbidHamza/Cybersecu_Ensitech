# Room 5 - Sécuriser une API

## Objectif de la room

Cette room vous apprend à sécuriser une API REST complète en appliquant toutes les bonnes pratiques apprises dans les rooms précédentes.

À la fin de cette room, vous serez capable de :
- Identifier les erreurs courantes dans une API
- Implémenter la validation d'input complète
- Ajouter le rate limiting
- Gérer les erreurs de manière sécurisée
- Tester la sécurité d'une API avec Postman

## Scénario narratif

Vous devez auditer et sécuriser une API REST existante. L'API gère des utilisateurs et des produits. Votre mission : identifier toutes les vulnérabilités et implémenter les corrections.

## Démarrage

```bash
cd room-5-secure-api
docker-compose up -d
```

API vulnérable : `http://localhost:3006`
API sécurisée : `http://localhost:3007`

## Erreurs courantes identifiées

1. Absence d'authentification sur endpoints sensibles
2. Manque de validation d'input
3. Exposition de données sensibles
4. Pas de rate limiting
5. Messages d'erreur trop informatifs
6. Pas de headers de sécurité

## Bonnes pratiques à implémenter

- Validation complète des entrées
- Rate limiting sur tous les endpoints
- Authentification et autorisation
- Gestion d'erreurs sécurisée
- Headers de sécurité (CORS, CSP, etc.)
- Logging des événements importants

## Ressources pédagogiques

### Ordre recommandé de consultation

Pour tirer le meilleur parti de cette room, suivez cet ordre :

1. **Lisez ce README** pour comprendre les erreurs courantes dans les APIs
2. **Analysez l'API vulnérable** pour identifier toutes les vulnérabilités
3. **Réalisez l'exercice** dans `/exercises/` pour sécuriser l'API
4. **Testez avec Postman** en utilisant la collection dans `/tests-postman/`
5. **Vérifiez votre implémentation** avec la checklist de sécurité

### Exercices guidés

L'exercice vous guide pour sécuriser l'API complète :

- **[Exercice 1 : Sécuriser une API vulnérable](./exercises/exercise-1.md)** - Identifier et corriger toutes les vulnérabilités dans l'API fournie

**Conseil** : Utilisez les connaissances acquises dans les rooms précédentes (authentication, SQL injection, validation, etc.). Consultez la solution dans `/SOLUTIONS/room-5/` uniquement après avoir tenté de résoudre par vous-même.

### Tests Postman

Consultez `/tests-postman/` pour une collection de tests de sécurité qui vous permettront de :
- Tester les endpoints de l'API
- Vérifier les protections en place
- Identifier les vulnérabilités restantes

### Checklist de sécurité

Utilisez la **[checklist de sécurité complète](./checklists/security-checklist.md)** pour vérifier que votre API est sécurisée avant déploiement. Cette checklist couvre :

- Validation complète des inputs
- Authentification et autorisation
- Rate limiting
- Gestion d'erreurs sécurisée
- Headers de sécurité (CORS, CSP, HSTS, etc.)
- Protection des données sensibles
- Logging approprié

**Conseil** : Utilisez cette checklist comme référence lors du développement de vos propres APIs.

## Comment partager vos réponses et votre code

Pour partager votre API sécurisée, c'est très simple :

### Méthode simple : Créer une Issue GitHub

1. Allez sur la page GitHub du dépôt
2. Cliquez sur **"Issues"** puis **"New Issue"**
3. Dans le **titre**, écrivez : `[Room 5] API sécurisée - Votre nom`
4. Dans le **corps**, collez directement votre code

**C'est tout !** Collez simplement votre code dans l'issue.

### Format simple pour partager

Copiez-collez ce format :

````
# Mes réponses - Room 5

## Vulnérabilités que j'ai identifiées :
1. [Nom de la vulnérabilité] : [Description]
2. [Nom de la vulnérabilité] : [Description]
3. [Nom de la vulnérabilité] : [Description]

## Corrections que j'ai apportées :
- [Liste de vos corrections]
- [Ce que vous avez changé]

## Code sécurisé :

```javascript
// Collez ici votre code API sécurisé
// Vous pouvez coller plusieurs blocs de code si nécessaire
```

## Tests que j'ai effectués :
- [Liste des tests]
- [Ce que vous avez vérifié]
````

**Astuce** : Si votre code est très long, vous pouvez créer plusieurs issues (une pour chaque endpoint ou fonctionnalité).

### Si vous avez des questions

Créez une issue avec le titre : `[Question] Room 5 - Votre question`

Expliquez :
- Ce que vous essayez de faire
- Le problème que vous rencontrez
- Ce que vous avez déjà essayé

## Prochaines étapes

Une fois que vous maîtrisez la sécurisation d'API, vous êtes prêt pour la **Room 6 - Mini Pentest Web**.

