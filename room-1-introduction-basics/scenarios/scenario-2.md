# Scénario 2 : Le formulaire de contact

## Contexte

Vous travaillez sur un site web pour un client. Le site contient un formulaire de contact simple où les visiteurs peuvent laisser leur nom, email et message.

## Situation

Le développeur précédent a laissé ce code pour traiter les messages du formulaire :

```javascript
// Traitement d'un message de contact
function processContactMessage(name, email, message) {
    // Enregistrer le message
    const logEntry = `Message reçu de ${name} (${email}): ${message}`;
    console.log(logEntry);
    
    // Afficher un message de confirmation
    document.getElementById('confirmation').innerHTML = 
        `Merci ${name} ! Votre message a été envoyé.`;
    
    // Envoyer par email (simplifié)
    sendEmail('admin@site.com', `Message de ${name}`, message);
}
```

Le client vous demande de vérifier si ce code est sécurisé avant de le mettre en production.

## Votre mission

1. Identifier tous les problèmes de sécurité dans ce code
2. Expliquer l'impact de chaque problème
3. Classer les problèmes par niveau de criticité (faible, moyen, élevé)

## Questions de réflexion

- Que se passe-t-il si un utilisateur entre du code HTML ou JavaScript dans les champs ?
- Les données sont-elles validées avant d'être utilisées ?
- Quelles informations pourraient être exposées dans les logs ?
- Que pourrait faire un attaquant avec ce code ?

## Indices

- Pensez à ce qui se passe quand `name`, `email` ou `message` contiennent du code HTML/JavaScript
- Réfléchissez à ce qui est enregistré dans les logs
- Considérez ce qui est affiché directement dans la page HTML
- Pensez aux attaques XSS (Cross-Site Scripting)

## Réflexion éthique

Vous analysez le code d'un client pour l'aider à sécuriser son application. C'est votre responsabilité en tant que développeur professionnel.

**Rappel** : Toujours tester les vulnérabilités uniquement sur des systèmes que vous possédez ou avec autorisation explicite.

