# Exercice 1 : Implémenter le hachage de mots de passe

## Objectif

Modifier le code vulnérable pour implémenter le hachage de mots de passe avec bcrypt.

## Contexte

Dans le code vulnérable, les mots de passe sont stockés en clair. Votre mission est de modifier le code pour utiliser bcrypt.

## Étapes

### Étape 1 : Installer bcrypt

```bash
cd room-2-authentication/src-vulnerable
npm install bcrypt
```

### Étape 2 : Modifier l'initialisation de la base de données

Modifiez la partie qui crée les utilisateurs de test pour hasher les mots de passe avant de les insérer.

**Indice** : Utilisez `bcrypt.hash(password, 10)` pour hasher un mot de passe.

### Étape 3 : Modifier la fonction de login

Remplacez la comparaison directe `user.password === password` par une comparaison avec bcrypt.

**Indice** : Utilisez `bcrypt.compare(password, user.passwordHash)` pour comparer.

### Étape 4 : Tester

1. Redémarrez l'application
2. Essayez de vous connecter avec les identifiants de test
3. Vérifiez que la connexion fonctionne toujours

## Questions de réflexion

- Pourquoi bcrypt est-il préférable à MD5 ou SHA1 ?
- Que se passe-t-il si vous oubliez de hasher les mots de passe lors de la création d'un utilisateur ?
- Pourquoi utilise-t-on `bcrypt.compare()` au lieu de hasher le mot de passe entré et comparer les hashs ?

## Solution

Consultez `/SOLUTIONS/room-2/exercise-1.md` pour voir la solution complète.

