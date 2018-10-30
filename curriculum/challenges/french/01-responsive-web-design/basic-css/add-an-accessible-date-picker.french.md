---
id: 587d778b367417b2b2512aa8
title: Ajouter un s�lecteur de date accessible
challengeType: 0
videoUrl: 'https://scrimba.com/c/cD9DJHr'
---

## Description
<section id='description'>
Les formulaires incluent souvent le champ <code>input</code>, qui peut �tre utilis� pour cr�er plusieurs contr�les de formulaire diff�rents. L'attribut <code>type</code> de cet �l�ment indique quel type d'entr�e sera cr��.
Vous avez peut-�tre remarqu� les types de saisie <code>text</code> et <code>submit</code> dans les d�fis pr�c�dents, et HTML5 introduisent une option pour sp�cifier un champ <code>date</code>. Selon la prise en charge du navigateur, un s�lecteur de date appara�t dans le champ <code>input</code>lorsqu'il obtient le focus, ce qui facilite le remplissage d'un formulaire pour tous les utilisateurs.

Pour les navigateurs plus anciens, le type sera par d�faut <code>text</code>, il est donc utile d'afficher le format de date pr�vu sur l'�tiquette ou sous forme de texte de remplacement au cas o�.
En voici un exemple :

<blockquote>&lt;label for=&quot;input1&quot;&gt;Entrer une date :&lt;/label&gt;<br>&lt;input type=&quot;date&quot; id=&quot;input1&quot; name=&quot;input1&quot;&gt;<br></blockquote>
</section>

Camper Cat est en train d'organiser un tournoi de Mortal Kombat et veut demander � ses comp�titeurs de voir quelle date est la meilleure. Ajouter un tag <code>input</code> avec un attribut <code>type</code> "date", un attribut <code>id</code> "pickdate", et un attribut <code>name</code> "date".
</section> </section

## Tests
<section id='tests'>

```yml
tests:
  - text: Votre code doit ajouter une balise <code>input</code> pour le champ de s�lection de la date.
    testString: assert($('input').length == 2, 'Votre code doit ajouter une balise <code>input</code> pour le champ de s�lection de la date.') ;
  - text: Votre balise <code>input</code> doit avoir un attribut <code>type</code> avec une valeur de date.
    testString: assert($('input').attr('type') =='date', 'Votre balise <code>input</code> devrait avoir un attribut <code>type</code> avec la valeur date') ;
  - text: Votre balise <code>input</code> doit avoir un attribut <code>id</code> avec la valeur pickdate.
    testString: assert($('input').attr('id') =='pickdate', 'Votre balise <code>input</code> doit avoir un attribut <code>id</code> avec la valeur pickdate') ;
  - text: Votre balise <code>input</code> doit avoir un attribut <code>name</code> avec une valeur de date.
    testString : assert($('input').attr('name') =='date', 'Votre balise <code>input</code> devrait avoir un attribut <code>name</code> avec le valeur date') ;
    
```

</section>

## Challenge Seed
<section id='challengeSeed'>

<div id='html-seed'>

```html
<body>
  <header>
    <h1>Tournois</h1>
  </header>
  <main>
    <section>
      <h2>Sondage pour le tournoi Mortal Kombat</h2>
      <form>
        <p>Veuillez indiquer votre meilleur choix de date pour la comp�tition</p>
        <label for="pickdate">Date pr�f�r�e</label>

        <!-- Ajoutez votre code sous cette ligne -->



        <!-- Ajoutez votre code au dessus de cette ligne -->

        <input type="submit" name="submit" value="Soumettre">
      </form>
    </section>
  </main>
  <footer>&copy; 2018 Camper Cat</footer>
</body>
```

</div>



</section>

## Solution
<section id='solution'>

```js
// solution requise
```
</section>
