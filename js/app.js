new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false, //check if a game is running or  not, initionally false
        turns: [], //To manage the logs, store the seperate turns there and then log them, if we attack then push 
        // a new turn in this array
    },
    methods: {
        startGame: function(){
            this.gameIsRunning = true;
            this.playerHealth = 100; //if a game is already running and the health is not 100 at that point.
            this.monsterHealth = 100; //same as above
            this.turns = [];
        },
        attack: function(){
            // var max = 10;
            // var min = 3;
            //Math.random() generates random values b/w 0 and 1 and then need floor e.g 9.999 = 9
            // var maxNum = Math.floor(Math.random() * max) + 1;
            // var damage = Math.max (Math.floor(Math.random() * max) + 1, min); //num between 3 and 10
            var damage = this.calculateDamage(3,10); //here this points to the Vue instance and make calculateDamage the
            //method of vue instance
            // console.log(this);
            this.monsterHealth -= damage;
            this.turns.unshift({ //push in array to 1st elem and shif the other elems
                isPlayer: true,
                text: `Player hits the monster for ${damage}`
            }); 
            //Check if we are losing or not
            // if(this.monsterHealth <=0){  //we won
            //     alert('You won!');
            //     this.gameIsRunning = false;
            //     return; //exit out of function if we won.
            // }
            
            if(this.checkWin()){
                return; //if it  is true , exit this function
            }

            //Monster also damage us and he has more power.
            // max = 12;
            // min = 5;
            // var damage = Math.max (Math.floor(Math.random() * max) + 1, min); //num between 5 and 12
            //Check if we are losing or not
            // if(this.playerHealth <=0){  //we lose
            //     alert('You lost!');
            //     this.gameIsRunning = false;
            // }

            // var damage = this.calculateDamage(5,12);
            // this.playerHealth -= damage;
            // this.checkWin();

            this.monsterAttacks();
        },
        specialAttack: function(){
            var damage = this.calculateDamage(10,20);  //Our damage is higher.
            this.monsterHealth -= damage;

            this.turns.unshift({ //push in array to 1st elem and shif the other elems
                isPlayer: true,
                text: `Player hits the monster hard for ${damage}`
            });

            if(this.checkWin()){
                return; 
            }
            
            // var damage = this.calculateDamage(5,12);
            // this.playerHealth -= damage;
            // if(this.checkWin());
            //monster attack do the same damage so refactor that code.
            this.monsterAttacks();
        },
        heal: function(){
            if(this.playerHealth < 90){  //make sure heal is not greater than 100
                this.playerHealth +=10;
            }
            else{
                this.playerHealth = 100;
            }
            this.turns.unshift({ //push in array to 1st elem and shif the other elems
                isPlayer: true,
                text: `Player heals by 10`
            });
            this.monsterAttacks(); //as monster is also attacking 
        },
        giveUp: function(){
            this.gameIsRunning = false;
        },

        //this is refactering the code
        monsterAttacks: function(){
            var damage = this.calculateDamage(5,12);
            this.playerHealth -= damage;
            this.checkWin();

            this.turns.unshift({ //push in array to 1st elem and shif the other elems
                isPlayer: false,
                text: `Monster hits the player for ${damage}`
            });
        },
        calculateDamage : function(min,max){
            return Math.max (Math.floor(Math.random() * max) + 1, min);
        },
        checkWin : function(){
            if(this.monsterHealth <=0){  //we won
                if(confirm('You won! New Game')){ //confirm() is builtin JS , giving us yes or no, if user click yes.
                    this.startGame();
                } 
                else{
                    this.gameIsRunning = false;
                }
                // alert('You won!');
                // this.gameIsRunning = false;
                // return; //exit out of function if we won. 
                return true;
            }
            else if(this.playerHealth <=0){
                if(confirm('You lost! New Game')){ //confirm() is builtin JS , giving us yes or no, if user click yes.
                    this.startGame();
                } 
                else{
                    this.gameIsRunning = false;
                }
                // alert('You won!');
                // this.gameIsRunning = false;
                // return; //exit out of function if we won. 
                return false; 
            }
        }
    }
});