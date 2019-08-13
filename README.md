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
( new Foo ).__proto__ === Foo.prototype;
( new Foo ).prototype === undefined;
```
![Prototype vs __proto__](https://github.com/muhdshafi-javascript/advanced-javaScript/blob/master/proto.png)
