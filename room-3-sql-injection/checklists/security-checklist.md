# Checklist de sécurité - SQL Injection

Utilisez cette checklist pour vérifier que votre code est protégé contre les injections SQL.

## Utilisation de requêtes préparées

- [ ] Toutes les requêtes SQL utilisent des requêtes préparées (prepared statements)
- [ ] Aucune concaténation directe de variables dans les requêtes SQL
- [ ] Tous les paramètres passent par des placeholders (?, :name, $1, etc.)
- [ ] Les noms de tables/colonnes ne viennent jamais d'entrées utilisateur (utiliser une whitelist si nécessaire)

## Validation des entrées

- [ ] Les types de données sont validés avant utilisation dans les requêtes
- [ ] Les longueurs sont vérifiées (limites min/max)
- [ ] Les formats sont validés (regex, whitelist de caractères autorisés)
- [ ] Les IDs numériques sont validés comme des nombres entiers positifs

## Gestion des erreurs

- [ ] Les erreurs SQL ne sont pas exposées à l'utilisateur final
- [ ] Les messages d'erreur sont génériques en production
- [ ] Les logs contiennent les détails des erreurs (pour le debugging)
- [ ] Les stack traces ne sont pas exposées en production

## Principe du moindre privilège

- [ ] L'utilisateur de la base de données a uniquement les permissions nécessaires
- [ ] Pas de permissions DROP, ALTER, ou CREATE pour l'application
- [ ] Les requêtes utilisent des vues ou des procédures stockées si approprié
- [ ] Les backups sont sécurisés

## ORM et bibliothèques

- [ ] Si vous utilisez un ORM, vous comprenez comment il génère les requêtes
- [ ] L'ORM utilise des requêtes préparées par défaut
- [ ] Les méthodes "raw" ou "execute" sont utilisées avec précaution
- [ ] Les dépendances sont à jour (npm audit, etc.)

## Tests de sécurité

- [ ] Test d'injection classique : `' OR '1'='1`
- [ ] Test d'injection UNION : `' UNION SELECT ...--`
- [ ] Test d'injection avec commentaires : `'--`, `'/*`
- [ ] Test avec caractères spéciaux : `';`, `"`, `\`
- [ ] Test avec encodage : URL encoding, Unicode, etc.

## Bonnes pratiques générales

- [ ] Les requêtes sont optimisées (éviter les requêtes N+1)
- [ ] Les transactions sont utilisées pour les opérations multiples
- [ ] Les timeouts sont configurés pour éviter les attaques par déni de service
- [ ] La base de données est régulièrement mise à jour (patches de sécurité)

Si toutes les cases sont cochées, votre code est protégé contre les injections SQL de base. Pour des applications critiques, considérez également l'utilisation de WAF (Web Application Firewall) et de monitoring des requêtes suspectes.

