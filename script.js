
console.log('Hello!!!');
//typesDemo();
//construtorDemo();
prototypeDemo();

function typesDemo() {
    console.log('typesDemo() starts');
    var x = 'String value';
    //x is is primitive type string
    console.log('type of x: ', typeof x);
    var y = new String('another String  value');
    console.log('type of y: ', typeof y);
    //as we know primitives do not have any properties,
    //still you can get the length of a 'x'
    console.log('length: ', x.length);
    //it is because it automatically type coerse to String Wrapper object, 
    //a temperary object, once result is returned it is destroyed.
    console.log('typesDemo() ends');
}

// constructor funtion 
function construtorDemo() {
    console.log('construtorDemo() starts');
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    var shafi = new Person("Shafi", 31);
    var sudheesh = new Person("Sudheesh", 32);
    console.log('typeof: ', typeof shafi);
    console.log('instanceof:', shafi instanceof Person);
    console.log('name:', shafi.name);
    console.log('construtorDemo() ends');
}

//prototype demo
function prototypeDemo(){
    console.log('prototypeDemo() starts');
    //without prototype
    function Person(name, age) {
        this.name = name;
        this.age = age;
        this.printAge = function(){
            console.log(this.name + '\'s age is: ',this.age);
        }

    }
    var shafi = new Person("Shafi", 31);
    shafi.printAge();
    console.log('shafi object:', shafi);

    //with prototype
    var Employee =  function (name, age) {
        this.name = name;
        this.age = age;
    }
    Employee.prototype.printAge = function(){
        console.log(this.name + '\'s age is: ',this.age);
    }

    var sudheesh = new Employee('Sudheesh', 32);
    sudheesh.printAge();
    console.log('sudheesh object:', sudheesh);

    console.log('prototypeDemo() ends');
}

