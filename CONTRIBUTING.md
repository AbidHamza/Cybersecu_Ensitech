# Guide de contribution

Merci de votre intérêt pour contribuer à Web Security Academy. Ce document explique comment proposer des améliorations, tester les rooms, et maintenir la cohérence pédagogique du dépôt.

## Philosophie du projet

Ce dépôt a pour objectif d'être :
- **Pédagogique** : accessible aux débutants, progressif, bien expliqué
- **Pratique** : avec du code réel, des exercices concrets, des environnements fonctionnels
- **Professionnel** : ton sérieux, sans emojis, sans icônes superflues
- **Éthique** : toujours insister sur l'usage légal et responsable

## Comment proposer une amélioration

### Processus

1. **Ouvrez une issue** pour discuter de votre proposition avant de coder
2. **Forkez le dépôt** et créez une branche pour votre modification
3. **Testez votre modification** selon les guidelines ci-dessous
4. **Soumettez une Pull Request** avec une description claire

### Types d'améliorations acceptées

- Correction de bugs dans le code des rooms
- Amélioration de la clarté des explications
- Ajout d'exemples concrets
- Correction de fautes d'orthographe ou de grammaire
- Amélioration de la structure ou de l'organisation
- Ajout de nouveaux exercices (en cohérence avec la room)
- Amélioration des checklists

### Types d'améliorations à discuter d'abord

- Ajout d'une nouvelle room complète
- Modification majeure de la structure pédagogique
- Changement de technologie (ex: passer de Node.js à Python)
- Ajout de dépendances externes importantes

## Comment tester une room

### Tests à effectuer

1. **Test de démarrage** : l'environnement Docker doit démarrer sans erreur
   ```bash
   cd room-X-xxx
   docker-compose up -d
   ```

2. **Test de fonctionnement** : l'application doit être accessible et fonctionnelle
   - Vérifier que l'URL indiquée dans le README fonctionne
   - Tester les fonctionnalités de base de l'application

3. **Test de vulnérabilité** : la version vulnérable doit bien présenter la vulnérabilité
   - Suivre les instructions du README pour reproduire la vulnérabilité
   - Vérifier que l'exploitation fonctionne comme décrit

4. **Test de sécurisation** : la version sécurisée doit bien corriger la vulnérabilité
   - Vérifier que l'exploitation ne fonctionne plus
   - Vérifier que les fonctionnalités légitimes fonctionnent toujours

5. **Test des exercices** : les exercices doivent être réalisables
   - Suivre les instructions des exercices
   - Vérifier que les solutions proposées fonctionnent

6. **Test de lisibilité** : le README doit être clair
   - Relire le README comme si on découvrait la room
   - Vérifier que toutes les étapes sont compréhensibles

### Checklist de test

Avant de soumettre une modification, vérifiez :

- [ ] L'environnement Docker démarre sans erreur
- [ ] L'application est accessible
- [ ] La vulnérabilité est reproductible
- [ ] La version sécurisée fonctionne
- [ ] Les exercices sont réalisables
- [ ] Le README est à jour et clair
- [ ] Aucune information sensible n'est exposée (mots de passe, clés API, etc.)
- [ ] Le code respecte les bonnes pratiques de base (pas de code mort, commentaires utiles)

## Respecter l'architecture pédagogique

### Structure d'une room

Chaque room doit contenir :

1. **README.md** : document principal avec
   - Objectif de la room
   - Scénario narratif
   - Explications théoriques
   - Instructions de démarrage
   - Guide d'utilisation
   - Section dépannage
   - Erreurs fréquentes

2. **src-vulnerable/** : code vulnérable minimaliste
   - Code simple et lisible
   - Vulnérabilité claire et identifiable
   - Commentaires expliquant le problème (optionnel)

3. **src-secured/** : version sécurisée
   - Code corrigé avec explications
   - Commentaires sur les corrections apportées
   - Même fonctionnalité que la version vulnérable

4. **exercises/** : exercices guidés
   - Instructions claires
   - Objectifs précis
   - Niveau de difficulté indiqué si pertinent

5. **checklists/** : checklist de vérification
   - Points à vérifier pour comprendre la room
   - Points à vérifier pour sécuriser son propre code

6. **scenarios/** (si applicable) : scénarios narratifs supplémentaires

### Ton et style

- **Professionnel** : pas de langage familier excessif
- **Clair** : explications simples, vocabulaire accessible
- **Progressif** : partir du simple vers le complexe
- **Concret** : toujours illustrer avec des exemples de code
- **Rassurant** : ne pas intimider le débutant, encourager l'apprentissage

### Format des fichiers

- **Markdown** : utiliser le format Markdown standard
- **Code** : toujours avec syntax highlighting approprié
- **Commentaires** : commentaires utiles dans le code, pas de sur-commentaire
- **Noms de fichiers** : clairs et descriptifs (pas d'espaces, utiliser des tirets)

## Comment écrire une nouvelle room

### Processus de création

1. **Proposer l'idée** : ouvrir une issue pour discuter de la pertinence et du contenu
2. **Valider la structure** : s'assurer que la room s'intègre bien dans la progression
3. **Créer le contenu** : suivre la structure standard d'une room
4. **Tester complètement** : suivre la checklist de test ci-dessus
5. **Rédiger les solutions** : créer le contenu dans `/SOLUTIONS/room-X/`
6. **Soumettre la PR** : avec une description détaillée

### Critères d'acceptation d'une nouvelle room

- Le sujet est pertinent pour des développeurs débutants
- La room s'intègre dans la progression pédagogique
- Le contenu est pédagogique et accessible
- Le code est fonctionnel et testé
- Les exercices sont réalisables et guidés
- La documentation est complète et claire
- L'aspect éthique est bien traité

### Ordre de création recommandé

Si vous souhaitez créer une nouvelle room, respectez l'ordre pédagogique :
1. Concepts de base
2. Authentification
3. Injection (SQL, NoSQL, etc.)
4. XSS et injection de code
5. Sécurisation d'APIs
6. Audit et pentest

## Standards de code

### Code vulnérable

- Doit être **minimaliste** : juste assez pour montrer la vulnérabilité
- Doit être **lisible** : pas de code complexe inutile
- Doit être **fonctionnel** : l'application doit marcher (même si vulnérable)

### Code sécurisé

- Doit **corriger** la vulnérabilité
- Doit **conserver** les fonctionnalités légitimes
- Doit être **commenté** : expliquer pourquoi c'est sécurisé
- Doit suivre les **bonnes pratiques** : pas de code "quick fix" douteux

### Technologies

- **Backend** : Node.js avec Express (pour la cohérence)
- **Base de données** : SQLite ou MySQL selon les besoins
- **Frontend** : HTML/CSS/JavaScript vanilla (pour la simplicité)
- **Containerisation** : Docker et Docker Compose

## Gestion des dépendances

- **Minimiser** les dépendances : utiliser le strict nécessaire
- **Documenter** : expliquer pourquoi chaque dépendance est nécessaire
- **Sécuriser** : utiliser des versions à jour, sans vulnérabilités connues
- **Documenter l'installation** : dans le README de la room

## Gestion des données sensibles

**Jamais** de :
- Mots de passe réels ou de production
- Clés API réelles
- Tokens d'authentification réels
- Données personnelles réelles

**Toujours** utiliser :
- Données de test clairement identifiées
- Variables d'environnement pour les configurations
- Fichiers `.env.example` pour documenter les variables nécessaires

## Questions et support

Si vous avez des questions sur comment contribuer :
1. Consultez d'abord ce document
2. Consultez les issues existantes
3. Ouvrez une nouvelle issue pour poser votre question

Merci de contribuer à rendre Web Security Academy meilleur !

