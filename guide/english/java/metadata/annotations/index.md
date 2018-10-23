---
title: Annotations
---

## Annotations
Hmm, what is an annotation??

It is a form of metadata that provides information about the program that isn’t a part of the program itself. Some general uses of annotations are:

Ø  Runtime time execution: Informs the compiler what to do during compile time. E.g. @override. (Btw an annotation is preceded by the @ symbol. It is the way the compiler identifies that what follows is an annotation). It also provides information to the compiler regarding which errors to detect or warnings to suppress.

Ø  Compile time: S/W tools can process the annotations to generate XML files, codes…

So now that we know what an annotation is and what it’s uses are let’s get on with the format of it.

In its simplest form an annotation has the following form-

 @override.

Void myInherited_Method {}

The above function will override the properties and values it has inherited from the method in its parent class.

Annotations with a single value can be expressed as-

@SuppressWarnings(value = "unchecked") or @SuppressWarnings("unchecked")
 
The above discussed annotations are pre-defined in the Java.

Now that we have a basic idea of what an annotation is, let us check out it’s usage with respect to executing a test case.

ü  First before any test case the annotation @Test is prefixed which tells Junit that the method that follows is a to be considered as a test case. This annotation can also be parameterized.

ü  Let’s look at the @retention annotation:

o   RetentionPolicy.SOURCE: Discard during the compile. These annotations don't make any sense after the compile has completed, so they aren't written to the bytecode.
Example: @Override, @SuppressWarnings

o   RetentionPolicy.CLASS: Discard during class load. Useful when doing bytecode-level post-processing. Somewhat surprisingly, this is the default.

o   RetentionPolicy.RUNTIME: Do not discard. The annotation should be available for reflection at runtime. Example: @Deprecated

