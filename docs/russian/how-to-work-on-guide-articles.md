<table>
    <tr>
        <td> Read these guidelines in </td>
        <td><a href="/CONTRIBUTING.md"> English </a></td>
        <td><a href="/docs/chinese/CONTRIBUTING.md"> 中文 </a></td>
        <td><a href="/docs/russian/CONTRIBUTING.md"> русский </a></td>
        <td><a href="/docs/arabic/CONTRIBUTING.md"> عربى </a></td>
        <td><a href="/docs/spanish/CONTRIBUTING.md"> Español </a></td>
        <td><a href="/docs/portuguese/CONTRIBUTING.md"> Português </a></td>
    </tr>
</table>

# Как работать над статьями руководства

С вашей помощью мы можем создать удобный справочный инструмент, который годами будет помогать миллионам людей, обучающихся программированию. 💛

Вы можете:

- [Помочь нам в создании и редактировании статей руководства](#steps-for-creating-and-editing-guide-articles).
- [Помочь нам в проверке pull requests для статей руководства]()

## Шаги для создания и редактирования статей руководства

1. 🍴 [Сделайте ответвление (форк) этого репозитория](https://github.com/freeCodeCamp/freeCodeCamp#fork-destination-box)
2. 👀️ Следуйте рекомендациям, указанным ниже.
3. 🔧 Сделайте свои замечательные изменения!
4. 📖 Прочитайте это [руководство по лучшим практикам стиля](/docs/style-guide-for-guide-articles).
5. 👉 [Создайте pull request](https://github.com/freeCodeCamp/freeCodeCamp/compare)
6. 🎉 Дождитесь, пока ваш pull request будет одобрен - победа!

Или просто [создайте issue](https://github.com/freeCodeCamp/freeCodeCamp/issues) - важна любая, даже небольшая помощь! 😊

### [Следуйте этим рекомендуемым правилам из нашего Руководства по стилю для написания хорошей статьи руководства](/docs/style-guide-for-guide-articles.md)

### Создание Pull request (PR) для того, чтобы предложить изменения

После того, как вы отредактировали или добавили статью в руководство, вы можете предложить это изменение двумя способами:

- [Используя веб-интерфейс Гитхаба в вашем браузере](#using-the-github-web-interface-on-your-browser).
- [Работая на вашей локальной машине](#working-on-your-local-machine) (_рекомендуется_ для предварительного просмотра изменений).

#### Используя веб-интерфейс Гитхаба в вашем браузере

Посмотрите видео-демонстрацию или следуйте шагам ниже ее:

**[TODO]** Обновить запись GIF.

![GIF показывает шаги для интерфейса Гитхаба](#)

1. Зайдите в папку **"pages"** (находится в [`client/src/pages/guide`](/client/src/pages/guide)) и найдите заглушку статьи, которую вы бы хотели написать или отредактировать.

    > Все заглушки будут в файле index.md

2. Нажмите на <kbd>Edit this file</kbd> иконку карандаша и сделайте ваши изменения в файле в разметке Гитхаба.

    > Если иконка серая и выдает вам предупреждение "Вы должны зайти в ветку, чтобы создать этот файл или предложить изменения для него" ("You must be on a branch to make or propose changes to this file"), тогда вы, вероятно, работаете с деревом другого человека. Сверху слева на странице есть выпадающее меню, которое показывает "Дерево: #######" ("Tree: #######"). Нажмите на выпадающее меню и поменяйте ветку на "master". Теперь должно быть возможно нажать на иконку карандаша.

3. Прокрутите вниз и добавьте сообщение коммита, объясняющее ваши изменения.

    (Опционально): Мы очень рекомендуем писать стндартные сообщения коммитов. Это хорошая практика, и вы увидите подобное во многих популярных репозиториях с открытым кодом. Это будет побуждать вас, как разработчика, следовать стандартным практикам.

    Несколько примеров стандартного сообщения коммита:

    ```md
    fix: update HTML guide article
    fix: update build scripts for Travis-CI
    feat: add article for JavaScript hoisting
    docs: update contributing guidelines
    ```

    Они должны быть короткими, не более 50 знаков. Вы всегда можете добавить дополнительную информацию в описании сообщения коммита.

    Это не занимает больше времени, чем нестандартное сообщение типа 'update file' или 'add index.md'

    Вы можете узнать больше о том, [почему вы должны использовать стандартные сообщения тут](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#why-use-conventional-commits).

4. Тогда выберите опцию радиокнопки **"Create a new branch for this commit and start a pull request"** и нажмите <kbd>Propose file changes</kbd>.

5. В следующем окне вы можете добавить любые другие детали о вашем PR, потом нажмите <kbd>Create pull request</kbd>.

Поздравляем 🎉! Вы только что создали pull request.

#### При работе на вашей локальной машине (_рекомендуется_ для предварительного просмотра изменений)

Вам не обязательно работать на вашей локальной машине, разве что вы хотели бы предварительно просмотреть ваши изменения или работать над исправлениями и улучшениями интерфейса пользователя. Это также рекомендуется если у вас возникли проблемы с git, такие как конфликты слияния (merge conflicts), перебазирование (rebasing) и так далее.

##### Прочитайте это руководство о том, [как настроить freeCodeCamp локально](/docs/how-to-setup-freecodecamp-locally.md)

### Чтобы PR был одобрен

Вот несколько правил для людей, проверяющих код PR:

- есть соответствующее описание и название
- PR соответствует [руководству по стилю](/docs/style-guide-for-guide-articles)
- мы следуем общим советам в [руководстве модератора](https://forum.freecodecamp.org/t/freecodecamp-moderator-guidelines/18295)
- если pull request улучшает или расширяет руководство, мы принимаем его, даже если английский в нем несовершенен или его содержание фрагментарно
- более старые pull requests проверяются в первую очередь

#### Метки

- **content** предназначен для pull requests, которые изменяют содержание статей в руководстве (добавляют новую статью или обновляют существующую статью)
- **duplicate** предназначен для pull requests, содержание которых дублирует другой открытый PR
- **changes requested** предназначен для pull requests, в которых требуются изменения перед сливанием
- **stale** предназначен для pull requests с меткой _"changes requested"_, в которых нет активности по прошествии примерно 2 недель, впоследствии они будут закрыты.
- PS с меткой _stale_ должен быть закрыт.
  - Вот [пример](https://github.com/freeCodeCamp/freeCodeCamp/pull/235).

#### Конфликты/Дубли

PR считается **duplicate** (дублем) если он делает изменения в той же статье, как и другой PR.

В общем, человек, проверяющий код, сделает следующее:

1. Рассортирует PR с самого старого
2. Будет искать PRs с одинаковым содержанием
3. Сольет от самого старого к новейшему

Весьма вероятно, что с дублями PR будут ошибки слияния.

Проверяющие приложат все усилия, чтобы решить эти конфликты и слить дубли PRs.

#### Требование изменений

Если pull request не вполне идеален, проверяющий может:

- потребовать, чтобы автор сделал изменения и добавить метку *changes requested*
- исправить мелкие недостатки и сделать коммит поверх этого PR

#### Билд с Travis CI

Все PRs должны пройти проверки Travis CI перед тем, как мы можем их слить.

Если PR ломает билд (проверка Travis CI проваливается и он показывает красный "X"), этому есть три вероятных причины.

Вы должны будете исправить проблему перед тем, как мы сможем слить ваш PR:

1. Ваш PR создает новую статью и где-то не хватает файла `index.md`.
    - В каждом каталоге в `src/pages` должен быть файл `index.md` (и название должно быть `index.md`).
    - Два возможных сценария:
      - вы назвали файл новой статьи как-то иначе, не `index.md`, или
      - вы создали новый каталог, потом вложенный каталог, вы написали новую статью во вложенном каталоге, но забыли положить заглушку файла `index.md` в новый каталог
2. Ваш PR создает новый каталог и название каталога неправильно отформатировано.
    - Название вашего каталога должно состоять из прописных букв и должно быть отформатировано в кебаб-стиле (напр. my-new-folder).
3. У статьи нет поля `title` наверху.
    - Пожалуйста, обратитесь к отделу [Название](#title) в [Руководстве по стилю при написании статей](/docs/style-guide-for-guide-articles.md).

### Когда мы закрываем pull requests

Мы закрываем pull request

- если слит более старый PR для той же статьи и ваш PR не добавляет нового содержания
- если к нему приложено нисколько/очень мало усилий (напр. все скопировано из другого источника, такого как Википедия)
- еси в нем есть текст, скопированный из источника, защищенного авторским правом, - см. [Проблемы цитирования](https://github.com/freeCodeCamp/freeCodeCamp/issues/2503)
- если он не следует [Руководству по стилю при написании статей](/docs/style-guide-for-guide-articles.md)
- если он не следует [Политике академическо честности](https://www.freecodecamp.org/academic-honesty)
- если он заморожен (если требуются изменения и в нем нет активности примерно 2 недели)

Также, если вы работаете над статьей-заглушкой, ваши изменения должны быть достаточно значительными, чтобы заменить текст заглушки.

Мы не примем PR, который только добавляет ссылки в раздел "Больше информации:".

В репозитории есть скрипт `Normalise.js`, который добавляет атрибуты к ссылкам, но также проверяет на текст "Это заглушка..." при помощи RegEx.

Если найдет, он вернет текст статьи назад к общему тексту заглушки (и сотрет ваши изменения).

Это желаемое поведение, поскольку это позволяет обновить все заглушки, если шаблон заглушек меняется по какой-либо причине.

### Получение помощи

Существует сообщество поддержки от всей команды вкладывающихся в проект, где вы можете протестировать идеи и попросить мнений о ваших текстах.

Оставайтесь активными в [чате сообщества](https://gitter.im/freecodecamp/contributors) и задавайте множество вопросов.

---

## Шаги по проверке pull requests для статей руководства

> Этот раздел предназначен для проверяющих этого репозитория.

## Сжать и слить

Мы используем опцию <kcd>Squash and merge</kcd> при слиянии PR, чтобы сохранить историю коммитов чистой.

![GIF - Squash and merge](https://files.gitter.im/FreeCodeCamp/Contributors/56MQ/9cb8db153d7bb1b3576cd1ffc207e39d.gif)

### Фильтры PRs

> PR, Открытый, Самый старый первый, Билд Travis CI Build удачен, никто не назначен, нет комментариев

[`is:pr is:open sort:updated-asc status:success no:assignee comments:0`](https://github.com/freeCodeCamp/freeCodeCamp/pulls?utf8=%E2%9C%93&q=is%3Apr%20is%3Aopen%20sort%3Aupdated-asc%20status%3Asuccess%20no%3Aassignee%20comments%3A0)

> PR, Открытый, Самый старый первый, Без меток: `platform`, `enhancement`, `invalid` или `changes requested`

[`is:pr is:open sort:updated-asc -label:platform -label:enhancement -label:invalid -label:"changes requested"`](https://github.com/freeCodeCamp/freeCodeCamp/pulls?utf8=%E2%9C%93&q=is%3Apr%20is%3Aopen%20sort%3Aupdated-asc%20-label%3Aplatform%20-label%3Aenhancement%20-label%3Ainvalid%20-label%3A%22changes%20requested%22).

### Шаблоны

> Вы можете сделать ваш собственный при помощи встроенного инструмента Гитхаба [**Saved replies**](https://github.com/settings/replies/) или использовать один из предлагаемых ниже.

#### Спасибо

```markdown
Thank you for your contribution to the page! 👍
We're happy to accept these changes, and look forward to future contributions. 🎉
```

#### Спасибо и поздравляем

> Чтобы поблагодарить и подбодрить тех, кто делает свой первый PR.

```markdown
Hi @username. Congrats on your first pull request (PR)! 🎉

Thank you for your contribution to the page! 👍
We're happy to accept these changes, and look forward to future contributions. 📝
```

#### Ошибка билда

```markdown
Hey @username

So I'd love to be able to merge your changes but it looks like there is an error with the Travis CI build. ⚠️

Once you resolve these issues, I will be able to review your PR and merge it. 😊

---

> Feel free to reference the [Style guide for writing articles](https://github.com/freeCodeCamp/freeCodeCamp#article-title) for this repo on formatting an article correctly so your Travis CI build passes. ✅
>
> Also, it's good practice on GitHub to write a brief description of your changes when creating a PR. 📝
```

#### Синхронизация ответвления

> Когда PR не синхронизирован с веткой `master`.

``````markdown
Hey @username

So I'd love to be able to merge your changes but it looks like there is an error with the Travis CI build. ⚠️

```bash
Error: ENOTDIR: not a directory, open 'src/pages/java/data-abstraction/index.md'
```

This particular error was not actually caused by your file but was an old error caused by merging faulty code to the `master` branch. It has since been resolved.

To pass the build, you will have to sync the latest changes from the `master` branch of the `freeCodeCamp/freeCodeCamp` repo.

Using the command line, you can do this in three easy steps:

```bash
git remote add upstream git://github.com/freeCodeCamp/freeCodeCamp.git

git fetch upstream

git pull upstream master
```

If you're using a GUI, you can simply `Add a new remote...` and use the link `git://github.com/freeCodeCamp/freeCodeCamp.git` from above.

Once you sync your fork and pass the build, I will be able to review your PR and merge it. 😊

---

> Feel free to reference the [Syncing a Fork](https://help.github.com/articles/syncing-a-fork/) article on GitHub for more insight on how to keep your fork up-to-date with the upstream repository. 🔄
>
> Also, it's good practice on GitHub to write a brief description of your changes when creating a PR. 📝
``````

#### Конфликты слияния

> Когда у PR есть ошибки слияния, которые должны быть решены.¹

```markdown
Hey @username

So I'd love to be able to merge your changes but it looks like you have some merge conflicts. ⚠️

Once you resolve these conflicts, I will be able to review your PR and merge it. 😊

---

> If you're not familiar with the merge conflict process, feel free to look over GitHub's guide on ["Resolving a merge conflict"](https://help.github.com/articles/resolving-a-merge-conflict-on-github/). 🔍️
>
> Also, it's good practice on GitHub to write a brief description of your changes when creating a PR. 📝
```
¹ Если ошибка слияния возникает у человека, который делает вклад в проект в первый раз, конфликт будет решен для этого человека.

#### Дубль

> Когда PR повторяет и дублирует другой.

```markdown
Hey @username

It seems that similar changes have already been accepted earlier for this article you're editing, sorry about that. 😓

If you feel you have more to add, please feel free to open up a new PR.

Thanks again! 😊

---

> If you have any questions, feel free to reach out through [Gitter](https://gitter.im/FreeCodeCamp/Contributors) or by commenting below. 💬
```

#### При закрытии пустых pull requests

> Если PR пустой.

```markdown
Hey @username

You haven't actually added any content so I will be  invalid pull requests this PR and marking it as `invalid`. 😓️

Feel free to open another PR though! 👍
```
