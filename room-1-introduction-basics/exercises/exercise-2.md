# Exercice 2 : Évaluation des risques

## Objectif

Apprendre à évaluer le niveau de risque d'une vulnérabilité.

## Scénario

Vous analysez une application web de gestion de bibliothèque. L'application permet aux utilisateurs de :
- Rechercher des livres
- Emprunter des livres
- Consulter leur historique d'emprunts
- Laisser des commentaires sur les livres

## Vulnérabilités identifiées

### Vulnérabilité A
Les mots de passe sont stockés en clair dans la base de données. Un développeur a accès à la base de données pour le debugging.

### Vulnérabilité B
Les commentaires laissés par les utilisateurs sont affichés directement dans la page HTML sans échappement. Un utilisateur peut laisser un commentaire contenant du code JavaScript.

### Vulnérabilité C
Il n'y a pas de limitation du nombre de tentatives de connexion. Un attaquant peut tenter autant de mots de passe qu'il veut.

### Vulnérabilité D
Les messages d'erreur de connexion indiquent si le nom d'utilisateur existe ou non ("Nom d'utilisateur incorrect" vs "Mot de passe incorrect").

## Exercice

Pour chaque vulnérabilité (A, B, C, D), évaluez :

1. **La probabilité d'exploitation** : 
   - Faible : difficile à exploiter, nécessite des conditions spéciales
   - Moyenne : exploitable avec des connaissances moyennes
   - Élevée : facilement exploitable, même par un débutant

2. **L'impact potentiel** :
   - Faible : impact limité, données peu sensibles
   - Moyen : impact modéré, certaines données sensibles
   - Élevé : impact important, données très sensibles ou fonctionnalités critiques
   - Critique : impact majeur, compromission complète du système

3. **Le niveau de risque global** :
   - Utilisez la formule : Risque = Probabilité × Impact
   - Classez chaque vulnérabilité par ordre de priorité de correction

## Questions de réflexion

- Quelle vulnérabilité corrigeriez-vous en premier ? Pourquoi ?
- Y a-t-il des vulnérabilités qui, combinées, créent un risque encore plus élevé ?
- Comment pourriez-vous réduire la probabilité d'exploitation de chaque vulnérabilité ?
- Comment pourriez-vous réduire l'impact potentiel de chaque vulnérabilité ?

## Solution

Consultez `/SOLUTIONS/room-1/exercise-2.md` pour voir une évaluation détaillée et comparer avec votre analyse.

