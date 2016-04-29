'use strict';

// LAB: SORTING AND CAMPY SCI-FI

// Be sure to read all the comments!
// That's where the instructions are!

// All of the instructions are inline with the assignment below.
// Look for the word TODO in comments.  Each TODO will have a
// description of what is required.

//*********************************************************
// SETUP
//*********************************************************

// We're going to use this special assert method to
// test our code
function assert(expression, failureMessage) {
  if (!expression) {
    console.log('assertion failure: ', failureMessage);
  }
}

//*********************************************************
// PROBLEM 1: The Blob
//*********************************************************

/* Dowington, PA had 1000 citizens on the night the blob escaped
 its meteorite. At first, the blob could only find and consume
 Pennsylvanians at a rate of 1/hour. However, each time it digested
 someone, it became faster and stronger: adding to its consumption
 rate by 1 person/hour.

    for the...      | starting rate of | persons consumed |
                    |  consumption     |    that hour     |
--------------------|------------------|------------------|
    first hour      |    1/hour        |        1         |
    second hour     |    2/hour        |        2         |
    third hour      |    3/hour        |        3         |
    fourth hour     |    4/hour        |        4         |

 TODO: First, make a constructor function, called Blob, that makes blobs.

 TODO: Next, create an instance of Blob named blob.

 TODO: Then, use a loop to calculate how long it took the blob to finish
 with Dowington.
*/
function Blob(population) {
  this.citizensRemaining = population;
  this.consumptionRate = 1;
  this.hours = 1;
  console.log('blob created');
}

var blob = new Blob(1000);

Blob.prototype.Eat = function (){
  if (this.citizensRemaining > 0 ) {
    if (this.citizensRemaining > this.consumptionRate * this.hours) {
      this.citizensRemaining = this.citizensRemaining - this.consumptionRate * this.hours;
      // console.log('Hour: ' + this.hours + ' ate: ' + this.consumptionRate * this.hours + 'pop: ' + this.citizensRemaining);
      this.hours ++;
    } else
      {
      this.citizensRemaining = 0;
    }
  } else {
    this.hours = 0;
  }
};

Blob.prototype.myHoursCalc = function() {
  this.Eat();
  while (this.citizensRemaining > 0){
    this.Eat();
  }
  return this.hours;
};

var hoursSpentInDowington; // TODO: assign me the value of the
                           // above calculation (how long it took
                           // the blob to eat Dowington)

hoursSpentInDowington = blob.myHoursCalc();
// Now, write a method that takes a population for an arbitrary
// town, and the starting consumption rate, and returns the number
// of hours the blob needs to ooze its way through that town.

Blob.prototype.hoursToOoze = function(population, peoplePerHour) {
  // TODO: implement me based on the instructions above.
  // Be sure to then assign me to the Blob's prototype.
  this.citizensRemaining = population;
  this.consumptionRate = peoplePerHour;
  this.hours = 1;
  this.Eat();
  while (this.citizensRemaining > 0){
    this.Eat();
  }
  return this.hours;

};

assert(blob.hoursToOoze(0, 1) === 0, 'no people means no time needed.');
assert(blob.hoursToOoze(1000, 1) === hoursSpentInDowington,
  'hoursSpentInDowington should match hoursToOoze\'s result for 1000');

// TODO: write three more assertions like the two above, testing out
// the hoursToOoze method.

// assert(blob.hoursToOoze(1000,1000) === 1, ' consumption rate is same as population');
// assert(blob.hoursToOoze(1000,10000) === 1, ' consumption rate greater than population');
// assert(blob.hoursToOoze(-50,-25) === 0, 'invalid data should return 0 hours');
// assert(blob.hoursToOoze(1000,-25) === 0, 'invalid data should return 0 hours');
console.log('done with asserts');

//*********************************************************
// PROBLEM 2: Universal Translator
//*********************************************************

var hello = {
  klingon: 'nuqneH',  // home planet is Qo'noS
  romulan: 'Jolan\'tru', // home planet is Romulus
  'federation standard': 'hello' // home planet is Earth
};

// TODO: define a constructor that creates objects to represent
// sentient beings. They have a home planet, a language that they
// speak, and method (that you'll place on the prototype) called
// sayHello.

function SentientBeing(homeplanet, language) {
  this.homePlanet = homeplanet;
  this.homeLanguage = language;
  function sayHello(){
    console.log('Hello from ' + this.homePlanet + ' = ' + hello(language));
  }
}

  // TODO: specify a home planet and a language
  // you'll need to add parameters to this constructor

// sb is a SentientBeing object
//TODO: put this on the SentientBeing prototype
SentientBeing.prototype.sayHello = function (sb) {
    // TODO: say hello prints out (console.log's) hello in the
    // language of the speaker, but returns it in the language
    // of the listener (the sb parameter above).
    // use the 'hello' object at the beginning of this exercise
    // to do the translating
  // console.log('home greeting: ' + hello[this.homeLanguage] + ' Listeners language: ' + sb.homeLanguage);
  console.log(hello[this.homeLanguage] );

  return(hello[sb.homeLanguage]);

};

// TODO: create three subclasses of SentientBeing, one for each
// species above (Klingon, Human, Romulan).
function Klingon() {
  return new SentientBeing('Qo\'noS', 'klingon');
}

function Human() {
  return new SentientBeing('Earth', 'federation standard');
}

function Romulan() {
  return new SentientBeing('Romulus', 'romulan');
}
assert((new Human()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');
  // TODO: write five more assertions, to complete all the possible
  // greetings between the three types of sentient beings you created above.

assert((new Human()).sayHello(new Romulan()) === 'Jolan\'tru',
    'the romulan should hear Jolan\'tru');
assert((new Human()).sayHello(new Human()) === 'hello',
      'the human should hear Hello');

assert((new Klingon()).sayHello(new Romulan()) === 'Jolan\'tru',
    'the romulan should hear Jolan\'tru');
assert((new Klingon()).sayHello(new Human()) === 'hello',
      'the human should hear hello');

assert((new Romulan()).sayHello(new Klingon()) === 'nuqneH',
          'the klingon should hear nuqneH');
assert((new Romulan()).sayHello(new Human()) === 'hello',
                    'the Human should hear Hello');

//*********************************************************
// PROBLEM 3: Sorting
//
// Implement the following functions. Write at least 2
// assertions for each one (the assertions are how you
// will test your code)
//*********************************************************

function lastLetterSort(stringArray) {
  function byLastLetter(a, b) {
    return a[a.length - 1].localeCompare(b[b.length - 1]);
  };
    //TODO: Sort the strings in alphabetical
    // order using their last letter
    // Read this about how the sort function works:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // this byLastLetter function is a "compare function"
    // And check out the "comparing strings" section  here:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

  stringArray.sort(byLastLetter);
  return stringArray;
}
assert( lastLetterSort(['monkey','apple','zebra']).toString() === ['zebra', 'apple', 'monkey'].toString(), 'correct sort.');
assert( lastLetterSort(['zebra', 'apple', 'monkey']).toString() === ['zebra', 'apple', 'monkey'].toString(), ' should not change');

function sumArray(numberArray) {
  var sum = 0;
  // TODO: implement me using forEach
  numberArray.forEach(function(arrayElement, index, array){ sum += arrayElement; });
  return sum;
}

assert(sumArray([1,2,3,4]) === 10, 'incorrect sum of [1,2,3,4]');
assert(sumArray([0,0,0,0]) === 0, 'sum of zero should be zero');

function sumSort(arrayOfArrays) {
  arrayOfArrays.sort(function(a,b) {
    // console.log(sumArray(a) - sumArray(b));
    // TODO: implement me using sumArray
    //  order the arrays based on the sum of the numbers
    //  inside each array
    return sumArray(a) - sumArray(b);
  });
  return arrayOfArrays;
}

assert(sumSort([[1,2,3,4,5,6],[1,2,3],[1],[5,10,20,30]])[0] - 1 === 0, 'incorrect array sum');
assert (sumSort([[7],[5],[3],[1],[45],[2]])[1] - 2 === 0, 'second array should be 2');
