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
- The **this** variable is not pointing to the global object but to the new empty objecthas been created by invoking the **new**.
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
