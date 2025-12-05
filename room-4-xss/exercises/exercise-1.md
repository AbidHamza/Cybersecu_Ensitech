# Exercice 1 : Échapper les données utilisateur

## Objectif

Implémenter une fonction d'échappement HTML et l'utiliser pour sécuriser l'affichage.

## Instructions

### Étape 1 : Créer une fonction d'échappement

Créez une fonction `escapeHtml()` qui échappe les caractères spéciaux HTML :
- `&` → `&amp;`
- `<` → `&lt;`
- `>` → `&gt;`
- `"` → `&quot;`
- `'` → `&#039;`

### Étape 2 : Appliquer l'échappement

Utilisez cette fonction sur toutes les données utilisateur avant affichage.

## Tests

Testez avec des entrées contenant :
- `<script>alert('XSS')</script>`
- `<img src=x onerror=alert('XSS')>`
- `Hello <strong>World</strong>`

Les scripts ne doivent pas s'exécuter, et le HTML doit être affiché comme du texte.

## Solution

Consultez `/SOLUTIONS/room-4/exercise-1.md` pour la solution complète.

