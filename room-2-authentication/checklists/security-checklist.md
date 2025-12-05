# Checklist de sécurité - Authentification

Utilisez cette checklist pour vérifier que votre implémentation d'authentification est sécurisée.

## Stockage des mots de passe

- [ ] Les mots de passe sont hashés (jamais stockés en clair)
- [ ] Utilisation d'un algorithme robuste (bcrypt, argon2, scrypt)
- [ ] Pas d'utilisation de MD5, SHA1, ou SHA256 seul
- [ ] Un salt unique est utilisé pour chaque mot de passe (bcrypt le fait automatiquement)
- [ ] Le coût du hachage est approprié (10 rounds minimum pour bcrypt)

## Validation des entrées

- [ ] Les champs username et password sont validés avant traitement
- [ ] Les types de données sont vérifiés (string, pas d'objets)
- [ ] Les longueurs minimales et maximales sont vérifiées
- [ ] Les caractères spéciaux sont gérés correctement

## Protection contre les attaques

- [ ] Rate limiting est implémenté sur l'endpoint de login
- [ ] Le nombre de tentatives est limité (ex: 5 tentatives / 15 minutes)
- [ ] Les messages d'erreur sont génériques (ne révèlent pas si l'utilisateur existe)
- [ ] Pas de timing attack (temps de réponse similaire pour utilisateur existant ou non)

## Gestion des sessions

- [ ] Les cookies de session utilisent le flag `httpOnly` (protection XSS)
- [ ] Les cookies utilisent le flag `secure` en production (HTTPS uniquement)
- [ ] Les cookies utilisent `sameSite: 'strict'` ou `'lax'` (protection CSRF)
- [ ] L'ID de session est généré de manière sécurisée (crypto.randomBytes)
- [ ] Les sessions ont une expiration appropriée (ex: 24 heures)
- [ ] Les sessions sont régénérées après login (protection fixation de session)
- [ ] Les sessions expirées sont supprimées du stockage

## Gestion des erreurs

- [ ] Les messages d'erreur ne révèlent pas d'informations sensibles
- [ ] Les erreurs de base de données ne sont pas exposées à l'utilisateur
- [ ] Les logs ne contiennent pas de mots de passe ou données sensibles
- [ ] Les stack traces ne sont pas exposées en production

## Autorisation

- [ ] Les endpoints sensibles vérifient l'authentification
- [ ] Les endpoints sensibles vérifient les permissions (authorization)
- [ ] Pas d'exposition de données sensibles dans les réponses API
- [ ] Les IDs utilisateur dans les URLs sont vérifiés (pas d'accès aux données d'autrui)

## Bonnes pratiques générales

- [ ] HTTPS est utilisé en production
- [ ] Les dépendances sont à jour (npm audit)
- [ ] Les variables d'environnement sont utilisées pour les configurations sensibles
- [ ] Les mots de passe par défaut sont changés
- [ ] Un système de réinitialisation de mot de passe sécurisé est en place (si applicable)

## Tests de sécurité

- [ ] Test de brute force : vérifier que le rate limiting fonctionne
- [ ] Test de timing attack : vérifier que les temps de réponse sont similaires
- [ ] Test de session hijacking : vérifier que les cookies sont sécurisés
- [ ] Test d'injection : vérifier que les entrées sont bien validées
- [ ] Test d'exposition de données : vérifier que les mots de passe ne sont jamais exposés

## Documentation

- [ ] Les bonnes pratiques sont documentées
- [ ] Les vulnérabilités connues sont documentées
- [ ] Les procédures de réinitialisation de mot de passe sont documentées
- [ ] Les procédures de gestion des sessions sont documentées

Si toutes les cases sont cochées, votre implémentation d'authentification est sécurisée selon les standards de base. Pour des applications critiques, considérez également l'implémentation de 2FA (authentification à deux facteurs).

