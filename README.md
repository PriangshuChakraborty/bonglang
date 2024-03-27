
# Bonglang

Bonglang is a fun programming language written in Javascript. It use bengali language as a keyword.
# Usage

- First clone this repository to your local system ( use ```git clone``` if you have git bash terminal or download from github ).
- Go to bonglang folder
- Create a file with ```.bong``` extension
- Write your code with bonglang language on that folder
- Open terminal of bonglang folder
- To run this code type ```npm start yourFileName.bong``` like if your file name is ```main.bong``` type ```npm start main.bong```

# Documentation
## Print

```lekh``` is a keyword in bonglang to print anything .

### input 
```Javascript
lekh "hello world"
```
### output
``` Javascript
hello world 
```
## Variables

To declare any variable in bonglang, use ``` eta ``` keyword. You can declare ```number``` ```string``` ```boolean``` ```null``` types in bonglang.
### input 
```Javascript
eta a = 10
eta b = 4.568
eta c = true
eta d = false
# this is comment line #
eta e = "kolkata"
eta f = null

lekh a,b,c,d,e,f
```
### output
``` Javascript
10 4.568 true false kolkata null
```
## Expression and Equation

Expression and equation are in bonglang but there is no pre or post increment or decrement opatrators in bonglang. 

### input 
```Javascript
eta a = 10
a += 5

eta b = 10
b = (b/2)-2

eta sum = a+b
eta sub = a-b
eta div = a/b
eta mul = a*b

lekh a,b
lekh sum,sub,div,mul,a%b
```
### output
``` Javascript
15 3
18 12 5 45 0
```
## Conditionals

Bonglang support conditionals i.e. if-else-if ladder, ```jodi``` keyword is use instead of if condition, otherwise for the else if condition the ```othoba``` keyword is use and at the last if above conditions are not true the ```noito``` keyword is use instead of else. You also use conditionals in nested form.
### input 
```Javascript
eta age = 25

jodi(age<18){
    lekh "Child"
}othoba(age>=18 && age<35){
    lekh "Perfect"
}noito{
    lekh "Old"
}
```
### output
``` Javascript
Perfect
```
## Loops

Bonglang support loops, statement inside ```porjonto``` execute till the condition is true. If the condition become false the loops end. Use ```chol``` to continue within loop and ```tham``` to break the loop. You als can use nested loop.
### input 
```Javascript
eta a=0

porjonto(a<=10){
    a += 1
    jodi(a===5){
        chol
    }
    jodi(a===7){
        tham
    }  
    lekh a
}
```
### output
``` Javascript
1
2
3
4
6
```
