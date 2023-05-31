---
id: 646cecc9eb5c4f4f73dafd07
title: Step 21
challengeType: 0
dashedName: step-21
---

# --description--

Move the left ear into position by setting a position of `absolute`, a `top` of `-26px`, and a `left` of `-31px`.

# --hints--

Test 1

```js

```

# --seed--

## --seed-contents--

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>fCC Cat Painting</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <main>
      <div class="cat-head">
        <div class="cat-ears">
          <div class="left-ear">
            <div class="cat-left-inner-ear"></div>
          </div>
          <div class="right-ear">
            <div class="cat-right-inner-ear"></div>
          </div>
        </div>
      </div>
    </main>
</body>
</html>
```

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #c9d2fc;
}

.cat-head {
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: linear-gradient(#5e5e5e 85%, #45454f 100%);
  width: 205px;
  height: 180px;
  border: 1px solid #000;
  border-radius: 46%;
}

.left-ear {
  --fcc-editable-region--

  --fcc-editable-region--
  border-left: 35px solid transparent;
  border-right: 35px solid transparent;
  border-bottom: 70px solid #5e5e5e;
}
```
