---
id: 65ef1aacca094bbcc2e2a3c8
title: Step 9
challengeType: 20
dashedName: step-9
---

# --description--

The variables `low` and `high` will be used to define the initial interval where the square root lies.

Inside the else condition, initialize the `low` variable to `0` and the `high` variable to be the maximum either `1` or `square_target`.

# --hints--

Remove the pass keyword.

```js
({
    test: () => 
    {
        assert.isFalse(runPython(`_Node(_code).find_function("square_root_bisection").find_ifs()[1].find_bodies()[2].has_pass()`))
    }
})
```

Your low variable should be `0` and your `high` variable should be the maximum of `1` or `square_target`, use the built in `max` function.

```js
({
    test: () => 
    {
        assert(runPython(`_Node(_code).find_function("square_root_bisection").find_ifs()[1].find_bodies()[2].is_equivalent("low = 0\\nhigh = max(1, square_target)")`));
    }
})

```
# --seed--

## --seed-contents--

```py
def square_root_bisection(square_target, tolerance=1e-7, max_iterations=100):
    if square_target < 0:
        raise ValueError('Square root of negative number is not defined in real numbers')
    if square_target == 1:
        root = 1
        print(f'The square root of {square_target} is 1')
    elif square_target == 0:
        root = 0
        print(f'The square root of {square_target} is 0')
--fcc-editable-region--
    else:
        pass
--fcc-editable-region--
```
