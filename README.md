# advanced-javaScript
## Objects and Prototype
- Everything other than primitives are Objects in javaScript.
- **Primitives:** number, string, boolean, undefined, null
- **Objects:** Array, Funtions, Object, Wrappers for primitives etc.
- **Wrapper objects:** none of the primitive values hold any properties, to provide properties on primitive types, javascript provide Wrapper objects corrsponding to each primitive such as *String* for *string* and so on. 
- When accessing the properties directly on any primitive value, javascript internally type coerse it into its Wrapper object and later remove the object.
```javascript
    var x = 'String value';
    console.log('type of x: ',typeof x);
    var y = new String('another String  value');
    console.log('type of y: ',typeof y);
    console.log('length: ',x.length);
```
## Inheritance in javaScript
- Javascript is a prototype based language.
- Inheritance is possible through the prtotype feature.
- Every JavaScript object has a **prototype property**, which make the inheritance possible.
- proptotype property is where we put the methods and properties that we want other objects to inherit.
- The Contructor's proptotype property is not just the constructor's prototype, it is the prototype of all the instances that are created through it.
- **Prototype Chain**: when a certain property/method is called, the search starts from the current object itself, if not found, then search in it's prototype, if still not found search in it's prototype and so on until reaches the object *Object*, if not found even on *Object* return undefined.
## Object Contructor Function
- Constructor funation is away to create the blue print for objects(OOP), we can create instances of this type by using the **new** keyword with Constructor.
- The **this** variable is not pointing to the global object but to the new empty object that has been created by invoking the **new**.
```javascript
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    var shafi = new Person("Shafi", 31);
    var sudheesh = new Person("Sudheesh", 32);
    console.log('typeof: ', typeof shafi);//object
    console.log('instanceof:', shafi instanceof Person);//true
    console.log('name:', shafi.name);
```
## Prototype vs non-prototype
```javascript
    //without prototype
    function Person(name, age) {
        this.name = name;
        this.age = age;
        this.printAge = function(){
            console.log(this.name + '\'s age is: ',this.age);
        }

    }
    var shafi = new Person("Shafi", 31);
    shafi.printAge();                               //Shafi's age is:  31
    console.log('shafi object:', shafi);            //shafi object: Person {name: "Shafi", age: 31, printAge: ƒ}

    //with prototype
    var Employee =  function (name, age) {
        this.name = name;
        this.age = age;
    }
    Employee.prototype.printAge = function(){
        console.log(this.name + '\'s age is: ',this.age);
    }

    var sudheesh = new Employee('Sudheesh', 32);
    sudheesh.printAge();                             //Sudheesh's age is:  32
    console.log('sudheesh object:', sudheesh);       //sudheesh object: Employee {name: "Sudheesh", age: 32}     
```
- using Prototypes we can define methods to all instances of a particular object, the methods applied to the prototype are not attached directly to all the object, it is stores in the memory only once, but every object can access it. 
## __proto__ vs prototype
references:   
https://stackoverflow.com/questions/9959727/proto-vs-prototype-in-javascript
http://dmitrysoshnikov.com/ecmascript/javascript-the-core/
- __proto__ is the actual object that is used in the lookup chain to resolve methods.
- prototype is the object that is used to build __proto__ when you create an object with *new*.  

```javascript
    console.log('Employee.prototype: ',Employee.prototype);  //exists
    console.log('sudheesh.prototype: ', sudheesh.prototype); //undefined
    var o = {}
    var obj = new Object();
    var f = new Function();
    console.log('o.prototype',o.prototype);                 //undefined
    console.log('obj.prototype',obj.prototype);             //undefined
    console.log('f.prototype',f.prototype);                 //exists
    console.log('Object.prototype',Object.prototype);       //exists
    console.log('Function.prototype',Function.prototype);   //exists
```
![Prototype vs __proto__](https://github.com/muhdshafi-javascript/advanced-javaScript/blob/master/proto.png)

## Object.create() vs new()
- when use constructor funtion, a new object will be be created and the constructor function's prototype will set as the proto for the new object, also the constructor function's prototypes contains a *constructor* property by default which point to the function constructor itself.
- *Constructor correction:*  In ES5 and earlier, JavaScript itself didn't use constructor for anything. It defined that the default object on a function's  prototype property would have it and that it would refer back to the function, and that was it. That changed in ES2015 (ES6), which started using it in relation to inheritance hierarchies. It is a good idea to correct the constructor when subclasisng.
other wise the subclass will have the prototype.constructor points to it's parent class constructor function.
```javascript
// when subclassing
Student.prototype = Object.create(Person.prototype);
//do this
Student.prototype.constructor = Student;
//when use class it is not required, it is handled for us.
class Student extends Person {}
```
- 
- when use Object.create(), a new object will be created and the provided prototype object will be set as the proto for the newly created object.
- when use Object.create(), other properties of the object have to be set explicitly or pass it as the 2nd argument in the required format.
- All objects (with the exception of objects created with Object.create(null)) will have a constructor property on it.  
- 

```javascript
    //new()
    var Employee =  function (name, age) {
        this.name = name;
        this.age = age;
    }
    Employee.prototype.printAge = function(){
        console.log(this.name + '\'s age is: ',this.age);
    }

    //instance
    var shafi = new Employee('Shafi', 31);
    console.log('shafi:',shafi);
    shafi.printAge();

    //Object.create()
    var empPrototype = {
        printAge: function(){
            console.log(this.name + '\'s age is: ',this.age);
        }
    };

    //instance - syntax-1
    var sudheesh = Object.create(empPrototype);
    sudheesh.name = 'Sudheesh';
    sudheesh.age = 32;
    console.log('sudheesh:',sudheesh);
    sudheesh.printAge();

    //instance - syntax-2
    var vineesh = Object.create(empPrototype, {
        name: {value: 'Vineesh'},
        age: {value: 31}
    });
    console.log('vineesh:',vineesh);
    vineesh.printAge();
```

## IIFE(Immediately Invoked Function Expression) 
https://mariusschulz.com/blog/disassembling-javascripts-iife-syntax  
https://mariusschulz.com/blog/use-cases-for-javascripts-iifes  

- An Immediately-invoked Function Expression is a way to execute functions immediately, as soon as they are created. IIFEs are very useful because they don't pollute the global object, and they are a simple way to isolate variables declarations.  
**Uses cases**:  
- To achieve blocked scope in ES5  
```javascript
(function() {
  var foo = "bar";
  console.log(foo);
})();

foo; // ReferenceError: foo is not defined

{
  let foo = "bar";
  console.log(foo);
}

foo; // ReferenceError: foo is not defined
```  
- To implement module pattern
```javascript
const counter = (function() {
  let counterValue = 0;

  return {
    increment() {
      ++counterValue;
    },

    get value() {
      return counterValue;
    }
  };
})();

counter.increment();
console.log(counter.value); // 1

counter.increment();
counter.increment();
console.log(counter.value); // 3
```  
- Aliasing Variables  
```javascript
window.$ = function somethingElse() {
  // ...
};

(function($) {
  // ...
})(jQuery);
```  
- Capturing the Global Object :  for example to capture the global object in both browser(*window*) and Node environment(*global*)
```javascript
(function(global) {
  // ...
})(this);
```  
## call, apply and bind?
- call() and apply() are used for method borrowing, to invoke a method of an object on another object without duplicating it in both of the objects.  
- both *call* and *apply* takes the first argument for binding the *this*.  
- *call* takes arguments as susequent values, on the other hand *apply* takse the arguments as an array, which is the 2bd argument to *apply*, later *apply* unpack it and pass to the invoked method.
- *apply* is useful when you want to write code that doesn't (or shouldn't) know the number of arguments that the functions need, like a dispatcher.  
- bind() - create a bound funtion & preset args

```javascript
   var shafi = {
        name: 'Shafi',
        saySomething: function (greet, to) {
            console.log(this.name + ' Says ' + greet + ' to ' + to);
        }
    }
    shafi.saySomething('Good morning', 'Midhun');
    shafi.saySomething('Good morning', 'Paul');
    
    shameer = {
        name: 'Shameer',
        eatSomething: function (food) {
            console.log(this.name + ' is eating ' + food);
        }
    }
    shameer.eatSomething('chicken');

    //Method borrowing with call()
    shafi.saySomething.call(shameer, 'Good evening', 'Sandeep');

    //Method borrowing with apply()
    shafi.saySomething.apply(shameer, ['Good night', 'Chaathan']);

    //bound funtion with bind()
    var saySomethingDup = shafi.saySomething.bind(shameer);
    saySomethingDup('Good Morning', 'Vineesh');

    //preset arg with bind()
    var sayGoodNight = shafi.saySomething.bind(shameer, 'Good night');
    sayGoodNight('Shafi');
    sayGoodNight( 'Good afternoon', 'Shafi');//here 'Shafi' becomes 3rd arg
```  
- Dispatch demo, where *apply* is useful over *call*
```javascript
    var greet = function (name) {
        console.log(this.name + ' says, Hello ', name);
    }
    var conveyMsg = function (from, msg) {
        console.log(this.name + ' conveys that ' + from + ' says "' + msg +'"');
    }
    var person = {
        name : 'Shafi'
    };


    var dispatch = function (person, method, args) {
        method.apply(person, args);
    };

    dispatch(person, greet, ['Vineesh']);
    dispatch(person, conveyMsg, ['Shameer', 'Happy Birthday']);
```  
## TODO clone Objects?

