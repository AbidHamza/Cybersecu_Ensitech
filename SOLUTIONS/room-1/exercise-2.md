# Solution - Exercice 2 : Évaluation des risques

## Évaluation détaillée

### Vulnérabilité A : Mots de passe en clair

**Probabilité d'exploitation** : ÉLEVÉE
- Un développeur a déjà accès à la base de données
- Aucune compétence technique spéciale requise
- Accès direct aux données

**Impact potentiel** : CRITIQUE
- Tous les comptes utilisateurs peuvent être compromis
- Réutilisation possible sur d'autres sites (credential stuffing)
- Pas de récupération possible (les mots de passe ne peuvent pas être "déhashés")

**Risque global** : CRITIQUE
- Priorité de correction : 1 (immédiate)

### Vulnérabilité B : XSS dans les commentaires

**Probabilité d'exploitation** : MOYENNE
- Nécessite des connaissances en JavaScript
- Nécessite que l'utilisateur voie le commentaire
- Peut être automatisée avec des scripts

**Impact potentiel** : ÉLEVÉ
- Vol de sessions utilisateurs
- Redirection vers des sites malveillants
- Vol de données via keyloggers JavaScript
- Défacing du site

**Risque global** : ÉLEVÉ
- Priorité de correction : 2 (urgente)

### Vulnérabilité C : Pas de rate limiting sur le login

**Probabilité d'exploitation** : ÉLEVÉE
- Facilement automatisable avec des scripts
- Aucune compétence technique spéciale requise
- Peut être effectuée 24/7

**Impact potentiel** : MOYEN
- Compromission de comptes avec mots de passe faibles
- Impact limité si les mots de passe sont forts
- Peut être combiné avec d'autres vulnérabilités

**Risque global** : MOYEN-ÉLEVÉ
- Priorité de correction : 3 (importante)

### Vulnérabilité D : Messages d'erreur informatifs

**Probabilité d'exploitation** : TRÈS ÉLEVÉE
- Aucune compétence technique requise
- Automatisable facilement
- Visible immédiatement

**Impact potentiel** : MOYEN
- Permet l'énumération des utilisateurs
- Facilite les attaques ciblées
- Peut être combiné avec d'autres attaques (brute force ciblée)

**Risque global** : MOYEN
- Priorité de correction : 4 (à corriger)

## Ordre de correction recommandé

1. **Vulnérabilité A** (Critique) - Immédiat
2. **Vulnérabilité B** (Élevé) - Urgent
3. **Vulnérabilité C** (Moyen-Élevé) - Important
4. **Vulnérabilité D** (Moyen) - À planifier

## Vulnérabilités combinées

**A + C** : Si les mots de passe sont en clair ET qu'il n'y a pas de rate limiting, un attaquant peut facilement obtenir tous les mots de passe.

**B + A** : Si XSS est possible ET que les mots de passe sont en clair, un attaquant peut voler les mots de passe via JavaScript.

**D + C** : Les messages d'erreur informatifs facilitent les attaques par force brute ciblées.

## Réduction des risques

### Pour réduire la probabilité

- **A** : Implémenter le hachage (réduit la probabilité à faible si la base est compromise)
- **B** : Implémenter l'échappement (réduit la probabilité à faible)
- **C** : Implémenter le rate limiting (réduit la probabilité à faible)
- **D** : Messages d'erreur génériques (réduit la probabilité à faible)

### Pour réduire l'impact

- **A** : Même avec hachage, utiliser des algorithmes robustes (bcrypt)
- **B** : Implémenter CSP pour réduire l'impact même si XSS réussit
- **C** : Implémenter 2FA pour réduire l'impact d'une compromission
- **D** : L'impact reste limité même après correction

## Conclusion

La vulnérabilité A est la plus critique car elle combine une probabilité élevée avec un impact critique. Elle doit être corrigée en priorité absolue. Les autres vulnérabilités, bien que moins critiques, doivent également être corrigées pour une sécurité complète.

