# Checklist de sécurité - XSS

## Échappement

- [ ] Toutes les données utilisateur sont échappées avant affichage HTML
- [ ] L'échappement est context-aware (HTML, JavaScript, CSS, URL)
- [ ] Les frameworks modernes échappent automatiquement (vérifié)
- [ ] Pas de `innerHTML` avec des données non échappées
- [ ] Pas de `eval()` ou `Function()` avec des données utilisateur

## Validation

- [ ] Les entrées sont validées (mais la validation ne protège pas contre XSS)
- [ ] Les formats sont vérifiés (whitelist de caractères si approprié)
- [ ] Les longueurs sont limitées

## Content Security Policy

- [ ] CSP est implémentée
- [ ] Les sources de scripts sont restreintes
- [ ] `unsafe-inline` est évité si possible
- [ ] Les headers CSP sont correctement configurés

## Bonnes pratiques

- [ ] Utilisation de frameworks modernes (React, Vue, etc.) qui échappent par défaut
- [ ] Pas de désactivation de l'échappement sauf cas très spécifiques
- [ ] Tests XSS effectués sur toutes les entrées utilisateur
- [ ] Sanitization pour le contenu riche (HTML) si nécessaire

