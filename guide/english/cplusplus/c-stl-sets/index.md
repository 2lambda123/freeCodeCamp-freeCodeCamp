---
title: C++ STL Sets
---

## Introduction of sets in C++ STL library
Sets are a type of associative containers in which each element has to be unique.The value of the element cannot be modified once it is added to the set, though it is possible to remove and add the modified value of that element. They are implemented using red-black tree.

## Benefits of using sets
1. It stores only unique values.
2. Value of the element identifies itself. The value of an element is also the key used to identify it.
3. Provides a fast lookup (O(log n)) using keys i.e. element itself.
4. There are many inbuilt functions in class defining sets that ease the programming.

Example:
```cpp
#include<bits/stdc++.h>
using namespace std;
int main()
{
  set <int> s;

  s.insert(2);    //insert element 2 in set s
  s.insert(3);
  s.insert(5);
  s.insert(2);    //inserting same element 2
  s.insert(6);
  for(auto i:s)
    cout<<i<<" ";
  cout<<s.size()<<endl; //gives the size of set

  s.erase(5);     // erasing element 5 from set s
return 0;
}
```

Creating a set object
```cpp
set <int> s;
```

Insertion
```cpp
s.insert(value_to_be_inserted);
```

Accessing set elements
```cpp
set <int>::iterator it;
for(it=s.begin(); it!=s.end(); ++it)
  cout<<*it;
```
## A few more stl use cases in cpp

include the #include<bits/stdc++.h> for importing all the major libraries in one go.

### Implementing an integer stack

Initialisse the stack as follows

stack<int> s;
  
It has the following operations

s.push(), s.pop(), s.empty() to check whether stack is empty or not
