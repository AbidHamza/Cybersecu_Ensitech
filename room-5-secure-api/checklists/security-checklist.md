# Checklist de sécurité - API

## Validation

- [ ] Tous les inputs sont validés
- [ ] Schémas de validation stricts (types, formats, longueurs)
- [ ] Validation côté serveur (jamais uniquement côté client)

## Authentification

- [ ] Tous les endpoints sensibles requièrent une authentification
- [ ] Tokens/JWT sont validés correctement
- [ ] Sessions sont gérées de manière sécurisée

## Autorisation

- [ ] Les permissions sont vérifiées pour chaque requête
- [ ] Pas d'accès aux données d'autres utilisateurs (IDOR)
- [ ] Rôles et permissions sont correctement implémentés

## Rate Limiting

- [ ] Rate limiting sur les endpoints sensibles
- [ ] Configuration appropriée (pas trop strict, pas trop permissif)
- [ ] Messages d'erreur clairs

## Gestion d'erreurs

- [ ] Messages d'erreur génériques (pas d'informations sensibles)
- [ ] Codes HTTP appropriés
- [ ] Logs détaillés (sans données sensibles)

## Headers de sécurité

- [ ] CORS configuré correctement
- [ ] Headers de sécurité (HSTS, CSP, etc.)
- [ ] Pas d'exposition d'informations serveur (X-Powered-By, etc.)

## Données sensibles

- [ ] Pas d'exposition de mots de passe, tokens, clés
- [ ] Données personnelles protégées
- [ ] Chiffrement en transit (HTTPS)

## Logging

- [ ] Événements importants sont loggés
- [ ] Pas de données sensibles dans les logs
- [ ] Rotation et rétention des logs

