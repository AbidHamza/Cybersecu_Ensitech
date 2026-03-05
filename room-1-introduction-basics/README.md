# Room 1 - Introduction & Fondamentaux

## Objectif de la room

Cette première room vous introduit aux concepts fondamentaux de la sécurité web. Aucun code à écrire ici, uniquement de la réflexion et de l'analyse pour poser les bases de votre compréhension.

À la fin de cette room, vous serez capable de :
- Comprendre la différence entre vulnérabilité, menace, risque et attaque
- Identifier les principaux types de vulnérabilités web
- Comprendre l'importance de la sécurité dans le développement
- Analyser du pseudo-code pour identifier des problèmes de sécurité

## Par où commencer ?

Si c'est votre première room, lisez dans cet ordre :

1. Ce README (vous y êtes)
2. `scenarios/scenario-1.md` — un cas concret pour "sentir" le problème
3. `scenarios/scenario-2.md` — un deuxième cas pratique
4. `exercises/exercise-1.md` — analyse de code (environ 20 min)
5. `exercises/exercise-2.md` — évaluation des risques (environ 15 min)
6. `checklists/checklist-comprehension.md` — vérifiez que vous avez tout compris

**Durée totale estimée : 2h environ**

Pas besoin d'installer quoi que ce soit pour cette room. C'est uniquement de la réflexion et de l'analyse.

## Scénario narratif

Vous venez d'être embauché comme développeur junior dans une startup technologique. Votre premier jour, votre responsable technique vous montre un extrait de code d'une fonctionnalité critique :

```javascript
// Fonction de connexion utilisateur
function login(username, password) {
    const user = database.findUser(username);
    if (user.password === password) {
        session.create(user.id);
        return { success: true, message: "Connexion réussie" };
    }
    return { success: false, message: "Identifiants incorrects" };
}
```

"Ce code fonctionne", vous dit-il, "mais j'ai un mauvais pressentiment. Pouvez-vous analyser ce code et me dire ce qui pourrait poser problème ?"

Votre mission : comprendre pourquoi ce code pose problème, même s'il semble fonctionner correctement.

## Concepts de base

### Vulnérabilité

Une **vulnérabilité** est une faiblesse dans le code, la configuration, ou l'architecture d'une application qui peut être exploitée par un attaquant. Elle représente un défaut de sécurité qui existe indépendamment de toute tentative d'exploitation.

**Caractéristiques importantes** :
- Une vulnérabilité existe même si personne ne l'exploite
- Elle peut être découverte par des audits de code, des tests de sécurité, ou accidentellement
- Elle peut être corrigée (patchée) avant d'être exploitée

**Exemple** : Stocker les mots de passe en clair dans une base de données est une vulnérabilité. Si quelqu'un accède à la base de données, tous les mots de passe sont compromis. Cette vulnérabilité existe même si personne n'a encore accédé à la base de données.

**Types de vulnérabilités** :
- **Vulnérabilités de code** : Bugs dans le code source (injection SQL, XSS, etc.)
- **Vulnérabilités de configuration** : Paramètres incorrects (mots de passe par défaut, ports ouverts, etc.)
- **Vulnérabilités d'architecture** : Problèmes de conception (pas de chiffrement, pas d'authentification, etc.)

### Menace

Une **menace** est un danger potentiel qui peut exploiter une vulnérabilité. C'est l'entité ou l'événement qui représente un risque pour la sécurité.

**Caractéristiques importantes** :
- Une menace peut être intentionnelle (attaquant) ou accidentelle (erreur humaine)
- Elle peut être interne (employé) ou externe (hacker)
- Elle peut être automatisée (bot) ou manuelle

**Exemples de menaces** :
- **Attaquant externe** : Un hacker tentant d'accéder à des données via Internet
- **Utilisateur malveillant** : Un utilisateur légitime exploitant une faille pour accéder à des données non autorisées
- **Malware** : Un logiciel malveillant infectant le système
- **Erreur humaine** : Un développeur ou administrateur causant accidentellement une fuite de données
- **Catastrophe naturelle** : Incendie, inondation pouvant détruire les données

**Classification des menaces** :
- **Par intention** : Malveillante (intentionnelle) vs accidentelle
- **Par origine** : Interne (employé) vs externe (hacker)
- **Par capacité** : Élevée (expert) vs faible (script kiddie)

### Risque

Le **risque** est la combinaison d'une vulnérabilité et d'une menace, pondérée par l'impact potentiel. Il représente la probabilité qu'un événement indésirable se produise et les conséquences de cet événement.

**Formule simplifiée** : Risque = Vulnérabilité × Menace × Impact

**Composantes du risque** :
- **Probabilité** : Quelle est la chance que la menace exploite la vulnérabilité ?
- **Impact** : Quelles sont les conséquences si l'exploitation réussit ?

**Exemple détaillé** : 
- **Vulnérabilité** : Mots de passe stockés en clair dans la base de données (niveau : ÉLEVÉ)
- **Menace** : Accès à la base de données par un attaquant (probabilité : MOYENNE)
- **Impact** : Vol de tous les comptes utilisateurs, accès non autorisé, perte de confiance (niveau : CRITIQUE)
- **Risque calculé** : ÉLEVÉ × MOYENNE × CRITIQUE = **RISQUE CRITIQUE**

**Niveaux de risque** :
- **Critique** : Impact majeur, probabilité élevée → Action immédiate requise
- **Élevé** : Impact important, probabilité moyenne → Action urgente requise
- **Moyen** : Impact modéré, probabilité variable → Action planifiée
- **Faible** : Impact limité, probabilité faible → Surveillance

### Attaque

Une **attaque** est l'exploitation concrète d'une vulnérabilité par une menace. C'est l'action réelle d'un attaquant utilisant une vulnérabilité pour atteindre un objectif malveillant.

**Caractéristiques importantes** :
- Une attaque est l'exploitation active d'une vulnérabilité
- Elle nécessite qu'une menace (attaquant) agisse
- Elle peut réussir (exploitation réussie) ou échouer (protection en place)

**Exemple détaillé** : Un attaquant découvre qu'une application est vulnérable aux injections SQL. Il envoie une requête malveillante `' OR '1'='1` dans un champ de recherche. Le serveur exécute la requête SQL modifiée et retourne toutes les données de la base. C'est une attaque concrète exploitant la vulnérabilité d'injection SQL.

**Types d'attaques** :
- **Attaque active** : L'attaquant modifie ou interrompt des données (ex: injection SQL, XSS)
- **Attaque passive** : L'attaquant observe sans modifier (ex: écoute réseau, analyse de trafic)
- **Attaque par déni de service (DoS)** : Rendre le service indisponible
- **Attaque par force brute** : Tenter toutes les combinaisons possibles

**Cycle d'une attaque** :
1. **Reconnaissance** : L'attaquant identifie la cible et cherche des vulnérabilités
2. **Exploitation** : L'attaquant exploite une vulnérabilité identifiée
3. **Escalade** : L'attaquant tente d'obtenir plus de privilèges ou d'accès
4. **Persistence** : L'attaquant maintient son accès (backdoor, etc.)
5. **Exfiltration** : L'attaquant extrait des données

## OWASP Top 10 expliqué simplement

L'OWASP (Open Web Application Security Project) publie chaque année une liste des 10 risques de sécurité les plus critiques pour les applications web. La version actuelle est l'**OWASP Top 10 2021**. Voici une explication simplifiée de chacun :

### A01 - Contrôle d'accès défaillant

**Qu'est-ce que c'est ?** C'est la vulnérabilité numéro 1. Les restrictions sur ce que les utilisateurs peuvent faire ne sont pas correctement appliquées.

**Exemples** : Un utilisateur peut accéder aux données d'un autre en modifiant l'URL (`/profil/123` → `/profil/456`). Un utilisateur normal accède à une page d'administration.

**Impact** : Accès non autorisé à des données, modification ou suppression de données, prise de contrôle de compte.

### A02 - Défaillances cryptographiques

**Qu'est-ce que c'est ?** Des données sensibles sont mal protégées par manque ou mauvais usage de la cryptographie.

**Exemples** : Mots de passe stockés en clair ou avec MD5, données transmises en HTTP au lieu de HTTPS, clés de chiffrement codées en dur dans le code source.

**Impact** : Vol de mots de passe, vol de données bancaires, usurpation d'identité.

### A03 - Injection

**Qu'est-ce que c'est ?** Un attaquant injecte du code malveillant dans une application via des entrées utilisateur non validées. Cette catégorie inclut les injections SQL, les injections de commandes, et le XSS (Cross-Site Scripting).

**Exemple** : En entrant `' OR '1'='1` dans un champ de recherche, un attaquant peut récupérer toutes les données de la base. En entrant `<script>alert('XSS')</script>` dans un commentaire, il peut exécuter du JavaScript chez les autres utilisateurs.

**Impact** : Accès non autorisé aux données, modification ou suppression de données, vol de sessions.

### A04 - Conception non sécurisée

**Qu'est-ce que c'est ?** Des failles de conception qui ne peuvent pas être corrigées par une simple mise à jour du code. La sécurité n'a pas été prise en compte dès le départ.

**Exemples** : Un système de réinitialisation de mot de passe qui envoie le mot de passe en clair par email. Une application qui n'a pas prévu de mécanisme de verrouillage de compte.

**Impact** : Des vulnérabilités structurelles difficiles à corriger sans refonte.

### A05 - Configuration de sécurité incorrecte

**Qu'est-ce que c'est ?** Des paramètres par défaut dangereux, des configurations manquantes, ou des fonctionnalités inutiles activées.

**Exemples** : Mots de passe par défaut non changés, fonctionnalités de debug activées en production, headers de sécurité manquants, messages d'erreur trop détaillés.

**Impact** : Exposition de l'application à des attaques connues et documentées.

### A06 - Composants vulnérables et obsolètes

**Qu'est-ce que c'est ?** Utilisation de bibliothèques, frameworks, ou dépendances avec des vulnérabilités connues et non corrigées.

**Exemple** : Utiliser une version ancienne de Node.js, Express, ou jQuery avec une faille de sécurité connue. Ne pas mettre à jour ses `npm packages`.

**Impact** : Exposition à des attaques connues, souvent automatisées par des bots.

### A07 - Défaillances d'identification et d'authentification

**Qu'est-ce que c'est ?** Problèmes dans la vérification de l'identité des utilisateurs et la gestion des sessions.

**Exemples** : Mots de passe faibles autorisés, sessions non expirées après déconnexion, absence de protection contre les attaques par force brute, mots de passe stockés en clair.

**Impact** : Prise de contrôle de comptes utilisateurs, accès non autorisé.

### A08 - Défaillances d'intégrité des données et logiciels

**Qu'est-ce que c'est ?** Le code ou les données peuvent être modifiés sans vérification d'intégrité. Inclut la désérialisation non sécurisée et les mises à jour logicielles non vérifiées.

**Exemple** : Une application accepte un objet sérialisé d'une source non fiable sans vérification. Un pipeline CI/CD récupère des dépendances sans vérifier leur authenticité.

**Impact** : Exécution de code malveillant, compromission de la chaîne de distribution logicielle.

### A09 - Journalisation et surveillance insuffisantes

**Qu'est-ce que c'est ?** L'application ne trace pas suffisamment les événements importants, rendant les attaques indétectables et les incidents impossibles à investiguer.

**Exemples** : Les tentatives de connexion échouées ne sont pas loggées. Les alertes générées ne sont pas surveillées. Les logs ne contiennent pas assez d'informations pour reconstituer une attaque.

**Impact** : Incapacité à détecter les attaques en cours, difficulté à investiguer après un incident.

### A10 - Falsification de requête côté serveur (SSRF)

**Qu'est-ce que c'est ?** Un attaquant force le serveur à envoyer des requêtes vers des ressources internes auxquelles il n'aurait normalement pas accès.

**Exemple** : Une fonctionnalité "prévisualiser une URL" peut être détournée pour que le serveur accède à `http://169.254.169.254/` (méta-données cloud internes) ou à d'autres services internes.

**Impact** : Accès à des ressources internes, exfiltration de données, contournement de pare-feux.

## Analyse de code vulnérable

Analysons le code du scénario initial :

```javascript
function login(username, password) {
    const user = database.findUser(username);
    if (user.password === password) {
        session.create(user.id);
        return { success: true, message: "Connexion réussie" };
    }
    return { success: false, message: "Identifiants incorrects" };
}
```

### Problèmes identifiés

1. **Mots de passe en clair** : La comparaison `user.password === password` suggère que les mots de passe sont stockés en clair. Si la base de données est compromise, tous les mots de passe sont exposés.

2. **Pas de protection contre les attaques par force brute** : Un attaquant peut tenter autant de mots de passe qu'il veut sans limitation.

3. **Messages d'erreur trop informatifs** : Le message "Identifiants incorrects" peut aider un attaquant à déterminer si un nom d'utilisateur existe.

4. **Pas de validation d'input** : Les paramètres `username` et `password` ne sont pas validés avant utilisation.

5. **Gestion d'erreur insuffisante** : Si `database.findUser()` échoue ou retourne `null`, le code plantera.

### Version améliorée (conceptuelle)

```javascript
function login(username, password) {
    // Validation des entrées
    if (!username || !password || username.length < 3 || password.length < 8) {
        return { success: false, message: "Erreur d'authentification" };
    }
    
    // Vérification du nombre de tentatives
    if (rateLimiter.hasExceededLimit(username)) {
        return { success: false, message: "Trop de tentatives. Réessayez plus tard." };
    }
    
    const user = database.findUser(username);
    if (!user) {
        // Même message pour ne pas révéler si l'utilisateur existe
        rateLimiter.recordAttempt(username);
        return { success: false, message: "Erreur d'authentification" };
    }
    
    // Comparaison avec hash (pas de comparaison directe)
    if (bcrypt.compare(password, user.passwordHash)) {
        session.create(user.id);
        rateLimiter.resetAttempts(username);
        return { success: true, message: "Connexion réussie" };
    }
    
    rateLimiter.recordAttempt(username);
    return { success: false, message: "Erreur d'authentification" };
}
```

## Ressources pédagogiques

### Ordre recommandé de consultation

Pour tirer le meilleur parti de cette room, suivez cet ordre :

1. **Lisez d'abord ce README** pour comprendre les concepts de base
2. **Consultez les scénarios** dans `/scenarios/` pour vous immerger dans des situations concrètes
3. **Réalisez les exercices** dans `/exercises/` pour mettre en pratique vos connaissances
4. **Vérifiez votre compréhension** avec les checklists dans `/checklists/`

### Exercices d'analyse

Les exercices vous permettront de mettre en pratique l'analyse de code vulnérable :

- **[Exercice 1 : Analyse de code vulnérable](./exercises/exercise-1.md)** - Identifier les problèmes de sécurité dans un extrait de code
- **[Exercice 2 : Évaluation des risques](./exercises/exercise-2.md)** - Apprendre à évaluer et prioriser les risques

**Conseil** : Essayez de résoudre les exercices par vous-même avant de consulter les solutions dans `/SOLUTIONS/room-1/`.

### Scénarios narratifs

Les scénarios vous plongent dans des situations réalistes :

- **[Scénario 1 : La startup TechCorp](./scenarios/scenario-1.md)** - Analyse d'une fonction de recherche vulnérable
- **[Scénario 2 : Le formulaire de contact](./scenarios/scenario-2.md)** - Identification de problèmes dans un formulaire

**Conseil** : Lisez les scénarios après avoir compris les concepts de base pour mieux visualiser les problèmes.

### Checklists

Utilisez les checklists pour vérifier votre compréhension et votre préparation :

- **[Checklist de compréhension](./checklists/checklist-comprehension.md)** - Vérifiez que vous maîtrisez les concepts fondamentaux avant de passer à la Room 2
- **[Checklist de préparation technique](./checklists/checklist-preparation.md)** - Vérifiez que votre environnement est prêt pour les rooms pratiques

**Conseil** : Ne passez à la Room 2 que si vous avez coché la majorité des cases de la checklist de compréhension.

## Erreurs fréquentes de débutant

### "Ça fonctionne, donc c'est sécurisé"

**Erreur** : Confondre fonctionnalité et sécurité. Un code peut fonctionner parfaitement tout en étant vulnérable.

**Exemple** : Un formulaire de connexion qui fonctionne mais stocke les mots de passe en clair.

### "Personne ne s'intéressera à mon application"

**Erreur** : Sous-estimer l'intérêt des attaquants. Les applications petites ou peu connues sont aussi ciblées, souvent de manière automatisée.

**Réalité** : Les attaquants utilisent des bots pour scanner automatiquement des milliers d'applications à la recherche de vulnérabilités connues.

### "La sécurité, c'est pour plus tard"

**Erreur** : Reporter la sécurité à "après" le développement. Il est beaucoup plus difficile et coûteux de sécuriser une application après coup.

**Bon réflexe** : Intégrer la sécurité dès le début du développement (Security by Design).

### "Je vais juste tester rapidement en production"

**Erreur** : Utiliser des données de production pour tester. Cela peut causer des fuites de données ou des perturbations.

**Bon réflexe** : Toujours avoir un environnement de développement/test séparé.

### "Les frameworks gèrent la sécurité pour moi"

**Erreur** : Croire que les frameworks rendent automatiquement le code sécurisé.

**Réalité** : Les frameworks aident, mais le développeur doit toujours appliquer les bonnes pratiques et comprendre ce qu'il fait.

## Vérification de compréhension

Avant de passer à la Room 2, consultez la **[checklist de compréhension complète](./checklists/checklist-comprehension.md)** pour vérifier que vous maîtrisez :

- [ ] La différence entre vulnérabilité, menace, risque et attaque
- [ ] Au moins 5 risques de l'OWASP Top 10
- [ ] L'identification de problèmes de sécurité dans un code simple
- [ ] Pourquoi "ça fonctionne" ne signifie pas "c'est sécurisé"
- [ ] L'importance de la sécurité dès le développement

**Important** : Ne passez à la Room 2 que si vous avez coché la majorité des cases. Les concepts de cette room sont fondamentaux pour comprendre les rooms suivantes.

## Prochaines étapes

Une fois que vous maîtrisez ces concepts fondamentaux, vous êtes prêt pour la **Room 2 - Authentication & Sessions**, où vous apprendrez à implémenter une authentification sécurisée.

## Comment partager vos réponses

Ce dépôt est public et destiné à l'apprentissage. Pour partager vos réponses aux exercices, c'est très simple :

### Méthode simple : Créer une Issue GitHub

1. Allez sur la page GitHub du dépôt
2. Cliquez sur l'onglet **"Issues"** (en haut de la page)
3. Cliquez sur le bouton vert **"New Issue"**
4. Dans le **titre**, écrivez : `[Room 1] Exercice X - Votre nom`
   - Exemple : `[Room 1] Exercice 1 - Jean Dupont`
   - Exemple : `[Room 1] Exercice 2 - Marie Martin`
5. Dans le **corps de l'issue**, collez directement vos réponses

**C'est tout !** Pas besoin de Gist, Pastebin ou autre. Collez simplement vos réponses dans l'issue.

### Format simple pour vos réponses

Copiez-collez ce format et remplissez-le :

```
# Mes réponses - Room 1

## Exercice 1 : Analyse de code vulnérable

### Problèmes que j'ai identifiés :
1. [Écrivez votre réponse ici]
2. [Écrivez votre réponse ici]
3. [Écrivez votre réponse ici]

## Exercice 2 : Évaluation des risques

### Vulnérabilité A :
- Probabilité : [Votre réponse]
- Impact : [Votre réponse]
- Risque : [Votre réponse]

### Vulnérabilité B :
- Probabilité : [Votre réponse]
- Impact : [Votre réponse]
- Risque : [Votre réponse]
```

### Si vous avez des questions

Créez une issue avec le titre : `[Question] Room 1 - Votre question`

Dans le corps, expliquez :
- Ce que vous avez essayé
- Où vous êtes bloqué
- Votre question précise

### Important

- **Ne modifiez pas** les fichiers existants du dépôt
- **Collez directement** vos réponses dans l'issue (pas besoin de fichiers externes)
- **Soyez respectueux** dans vos messages

## Dépannage

### "Je ne comprends pas certains termes"

Consultez le glossaire dans le README principal du dépôt. Les termes techniques sont expliqués de manière simple.

### "Les concepts sont trop abstraits"

C'est normal pour cette première room. Les rooms suivantes vous donneront des exemples concrets avec du code réel. Cette room pose juste les bases théoriques.

### "Je veux voir du code maintenant"

Patience ! La Room 2 vous permettra de manipuler du code réel. Cette room est importante pour comprendre le vocabulaire et les concepts avant de passer à la pratique.

