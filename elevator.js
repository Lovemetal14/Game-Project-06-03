// //js
// class Elevator {
        
//     constructor() {
//         this.floor = 0;
//         this.MAXFLOOR = 10;  //
//         this.direction = "";  //
//         this.requests = [];   //
//         this.waitingList = []; //
//         this.passengers = [];  //
//     }



//   //module.exports = Elevator; ¿?¿?¿?¿?¿?¿?¿

//  start() { () => setInterval(() => { this.update(); }, 1000); }
    
//  stop() { clearInterval(setInterval(() => { this.update(); }, 1000)); }

//  update() { this.log(this.floor, this.direction); }
                
//  _passengersEnter() { //peter
//     if (this.waitingList.length !== 0) {
//       let personEntering = this.waitingList.filter(
//         passenger => passenger.originFloor === this.floor
//       );
//       for (let i = 0; i < personEntering.length; i++) {
//         console.log(`${personEntering[i].name} has enter the elevator`);
//         this.passengers.push(personEntering[i]);
//         this.requests.push(personEntering[i].destinationFloor);
//       }
//       this.waitingList = this.waitingList.filter(
//         passenger => passenger.originFloor !== this.floor
//       );
//     }
//   }
//   _passengersLeave() {
//     let personLeaving = this.passengers.filter(
//       passenger => passenger.destinationFloor === this.floor
//     );
//     for (let i = 0; i < personLeaving.length; i++) {
//       console.log(personLeaving[i]);
//     }
//     this.passengers = this.passengers.filter(
//       passenger => passenger.destinationFloor !== this.floor
//     );
// }
  
//   floorUp() {
//     if (this.floor < this.MAXFLOOR) {
//       this.floor++;
//       this.direction = "up";
//     } else {
//       console.log(undefined);
//     }
//   }
//   floorDown() {
//     if (this.floor > 0) {
//       this.floor--;
//       this.direction = "down";
//     } else {
//       console.log(undefined);
//     }
//   }
//   call(person) {
//     this.waitingList.push(person);
//     this.requests.push(person.originFloor);
//   }
//   log() {
//     console.log(`Direction:${this.direction}|Floor:${this.floor}`);
//   }

   
 

//  module.exports = Person;


//  ////////////////////// IIIIIINDEEEEEXXXXXXXX

//  const Elevator = require('./elevator.js');

//  let elevator = new Elevator();

//  //const Person = require("./person.js");
//  elevator.floorUp();
//  //elevator.floorUp();
//  //let person1 = new Person("john", 2, 3);
//  // let person2 = new Person("janny", 2, 4);
//  // let person3 = new Person("jany", 0, 6);
//  // elevator.call(person1);
//  // elevator.call(person2);
//  // elevator.call(person3);
//  elevator._passengersEnter();                     //Peter enter
//  //console.log(elevator.waitingList);
//  elevator.floorUp();

//  // elevator._passengersLeave();
//  // console.log(elevator.passengers);


//  //CLASS PERSON

//  class Person {
//     constructor(name, originFloor, destinationFloor) {

//     this.name = name;
//     this.originFloor = originFloor;
//     this.destinationFloor = destinationFloor;
//     }
//  }

//   module.exports = Person;

// }


