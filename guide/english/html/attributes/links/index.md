---
title: Links
---
## Links

<!-- This is a stub. <a href='https://github.com/freecodecamp/guides/tree/master/src/pages/html/attributes/links/index.md' target='_blank' rel='nofollow'>Help our community expand it</a>.

<!-- <a href='https://github.com/freecodecamp/guides/blob/master/README.md' target='_blank' rel='nofollow'>This quick style guide will help ensure your pull request gets accepted</a>. -->

<!-- The article goes here, in GitHub-flavored Markdown. Feel free to add YouTube videos, images, and CodePen/JSBin embeds  -->
Links are used everywhere on the web, with the purpose of directing users to various content items. They're usually indicated by your cursor turning into a hand icon. Links can be text, images or other elements contained within your HTML or webpage. 

You use an `<a>` tag or anchor element to define your link, which also also needs a destination address that you'll access with the `href` attribute. Here's a snippet that makes the phrase 'the freeCodeCamp Guide' a link:

```html
<a href="https://guide.freecodecamp.org">the freeCodeCamp Guide</a>
```

If you'd like your link to open in a new tab, you'll use the `target` attribute along with the `"_blank"` value inside your opening `<a>` tag. That looks like this:

```html
<a href="https://guide.freecodecamp.org" target="_blank">the freeCodeCamp Guide</a>
```

When you need to guide users to a specific part of your webpage, let's assume the very bottom, you first need to assign the hash `#` symbol to the `href` attribute, like this

```html
<a href="#footer>More about us<a/>
```

You'll then need to use an `id` attribute in the element you want to direct your user to - in this case the `<footer>` at the bottom of the webpage. 

```html
<footer id="footer">Powered by freeCodeCamp</footer>
```

#### More Information:
<!-- Please add any articles you think might be helpful to read before writing the article -->
<a href="https://www.w3schools.com/html/html_links.asp" target="_blank">w3schools.com - HTML Links</a>
