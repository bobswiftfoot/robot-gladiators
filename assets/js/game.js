var playerInfo = 
{
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function()
    {
        // reset player stats
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function() 
    {
        if (this.money >= 7) 
        {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
          } 
          else
          {
            window.alert("You don't have enough money!");
          }
    },
    upgradeAttack: function() 
    {
        if (this.money >= 7) 
        {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
          } 
          else 
          {
            window.alert("You don't have enough money!");
          }
    }
}

var enemyInfo = 
[
    {
      name: "Roborto",
      attack: randomNumber(10, 14)
    },
    {
      name: "Amy Android",
      attack: randomNumber(10, 14)
    },
    {
      name: "Robo Trumble",
      attack: randomNumber(10, 14)
    }
 ]

 //Main Loop
function startGame()
{
    playerInfo.reset();

    for(var i=0; i < enemyInfo.length; i++)
    {    
        if(playerInfo.health > 0)
        {
            window.alert("Welcome to ROBOT GLADIATORS! Round: " + (i + 1));
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40, 60);
            fight(pickedEnemyObj);

            // if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) 
            {
                // ask if player wants to use the store before next round
                if(window.confirm("The fight is over, visit the store before the next round?"))
                {
                    shop();
                }
            }
        }
        else
        {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }

    endGame();
}

function fight(enemy)
{
    var isPlayerTurn = false;
    if (Math.random() > 0.5) 
    {
        isPlayerTurn = false;
    } 

    while(enemy.health > 0 && playerInfo.health > 0)
    {
        if(isPlayerTurn)
        {
            if(fightOrSkip())
            {
                break;
            }

            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
            enemy.health = Math.max(0, enemy.health - damage);
            // Log a resulting message to the console so we know that it worked.
            console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");
            if (enemy.health <= 0) 
            {
                window.alert(enemy.name + " has died!");
                break;
            }
            else 
            {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
        }
        else
        {
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
            playerInfo.health = Math.max(playerInfo.health - damage);
            // Log a resulting message to the console so we know that it worked.
            console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");
            if (playerInfo.health <= 0) 
            {
                window.alert(playerInfo.name + " has died!");
                break;
            }
            else 
            {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
        isPlayerTurn = !isPlayerTurn;
    }

}

function endGame()
{
    // if player is still alive, player wins!
    if (playerInfo.health > 0) 
    {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");

        var highScore = parseInt(localStorage.getItem("score"));
        if(!highScore)
        {
            highScore = 0;
        }
        if(playerInfo.money > highScore)
        {
            localStorage.setItem("score", playerInfo.money);
            localStorage.setItem("name", playerInfo.name); 
            alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
        } 
        else 
        {
            alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
        }
    } 
    else
    {
        window.alert("You've lost your robot in battle.");
    }

    // ask player if they'd like to play again
    if (window.confirm("Would you like to play again?")) 
    {
        // restart the game
        startGame();
    } 
    else 
    {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

function shop()
{
    // ask player what they'd like to do
    var shopOptionPrompt = parseInt(window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."));
    
    // use switch to carry out action
    switch (shopOptionPrompt) 
    {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");

            // do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");

            // call shop() again to force player to pick a valid option
            shop();
        break;
    }
}

// function to generate a random numeric value
function randomNumber(min, max) 
{
    var value = Math.floor(Math.random() * (max - min + 1)) + min;
  
    return value;
 }

 // function to set name
function getPlayerName()
{
    var name = "";
  
    while (name === "" || name === null) 
    {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
}

var fightOrSkip = function() 
{
    // ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
    if (!promptFight) 
    {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    promptFight = promptFight.toLowerCase();
  
    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip")
    {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    
        // if yes (true), leave fight
        if (confirmSkip) 
        {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playerMoney for skipping
            playerInfo.playerMoney = playerInfo.money - 10;

            return true;
        }
    }
    return false;
}

startGame();