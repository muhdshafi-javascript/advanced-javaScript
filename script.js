
console.log('Hello!!!');
//typesDemo();
//construtorDemo();
//prototypeDemo();
//createVsNewDemo();
//iifeDemo();
//call_apply_bindDemo();
dispatch_with_apply();

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
function prototypeDemo() {
    console.log('prototypeDemo() starts');
    //without prototype
    function Person(name, age) {
        this.name = name;
        this.age = age;
        this.printAge = function () {
            console.log(this.name + '\'s age is: ', this.age);
        }

    }
    var shafi = new Person("Shafi", 31);
    shafi.printAge();
    console.log('shafi object:', shafi);

    //with prototype
    var Employee = function (name, age) {
        this.name = name;
        this.age = age;
    }
    Employee.prototype.printAge = function () {
        console.log(this.name + '\'s age is: ', this.age);
    }

    var sudheesh = new Employee('Sudheesh', 32);
    sudheesh.printAge();
    console.log('sudheesh object:', sudheesh);


    console.log('Employee.prototype: ', Employee.prototype);
    console.log('sudheesh.prototype: ', sudheesh.prototype);
    var o = {}
    var obj = new Object();
    var f = new Function();
    console.log('o.prototype', o.prototype);
    console.log('obj.prototype', obj.prototype);
    console.log('f.prototype', f.prototype);
    console.log('Object.prototype', Object.prototype);
    console.log('Function.prototype', Function.prototype);

    console.log('prototypeDemo() ends');
}

function createVsNewDemo() {
    console.log('createVsNewDemo() starts');
    //new()
    var Employee = function (name, age) {
        this.name = name;
        this.age = age;
    }
    Employee.prototype.printAge = function () {
        console.log(this.name + '\'s age is: ', this.age);
    }

    //instace
    var shafi = new Employee('Shafi', 31);
    console.log('shafi:', shafi);
    shafi.printAge();

    //Object.create()
    var empPrototype = {
        printAge: function () {
            console.log(this.name + '\'s age is: ', this.age);
        }
    };

    //instance - syntax-1
    var sudheesh = Object.create(empPrototype);
    sudheesh.name = 'Sudheesh';
    sudheesh.age = 32;
    console.log('sudheesh:', sudheesh);
    sudheesh.printAge();

    //instance - syntax-2
    var vineesh = Object.create(empPrototype, {
        name: { value: 'Vineesh' },
        age: { value: 31 }
    });
    console.log('vineesh:', vineesh);
    vineesh.printAge();
    console.log('\ncreateVsNewDemo() ends');
}

function iifeDemo() {
    console.log('iifeDemo() starts');
    //without iife
    function doSomething(num) {
        console.log('result is:', num * 100);
    }
    doSomething(12);

    //IIFE
    (function (num) {
        console.log('result is:', num * 100);
    })(12);

    console.log('iifeDemo() ends');
}

function call_apply_bindDemo() {
    console.log('call_apply_bindDemo() starts');

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
    sayGoodNight('Good afternoon', 'Shafi');//here 'Shafi' becomes 3rd arg

    console.log('call_apply_bindDemo() ends');
}

function dispatch_with_apply() {

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
}

