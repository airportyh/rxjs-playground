# Exercises 1

You'll complete the following exercises by stacking operators using .pipe(). Please separate the solution as a separate observable so that you can easily animate them as individual
timelines.

1. Make an observable that emits the characters typed on the keyboard.
2. Extend #1 so that it emits the upper-cased version of the characters typed.
3. Extend #2 so that if they typed a number, emit that number squared. *Hint: search "string is numeric javascript"*.
4. Extend #3 to not emit anything new value if the key typed is neither a letter
or a number.
5. Extend #4 to only emit a character or a number if it is different from the previous result.
6. Extend #5 to artificially delay each emitted value by 500 milliseconds.

## Extra Credit

A. Research the RxJS scan operator on your own. Extend the above solution
to emit the current running total of all of the number keys that have
been pressed. For example, if the parent observable emits "1", "4", "A",
"G", "7". Then the new observable should emit 1, 5, 12.

