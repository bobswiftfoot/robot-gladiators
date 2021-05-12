var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

//Main Loop
function startGame()
{
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for(var i=0; i < enemyNames.length; i++)
    {    
        if(playerHealth > 0)
        {
            window.alert("Welcome to ROBOT GLADIATORS! Round: " + (i + 1));
            var pickedEnemyName = enemyNames[i];
            enemyHealth = 50;
            fight(pickedEnemyName);
        }
        else
        {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }

    endGame();
}

function fight(enemyName)
{
    while(enemyHealth > 0 && playerHealth > 0)
    {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        if(promptFight === "skip" || promptFight === "SKIP")
        {
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            if(confirmSkip)
            {
                window.alert(playerName + " has chosen to skip the fight!");
                playerMoney -= 10;
                break;
            }
            else
            {
                fight();
            }
        }

        //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
        enemyHealth -= playerAttack;
        // Log a resulting message to the console so we know that it worked.
        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");
        if (enemyHealth <= 0) 
        {
            window.alert(enemyName + " has died!");
            break;
        }
        else 
        {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }
        // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
        playerHealth -= enemyAttack;
        // Log a resulting message to the console so we know that it worked.
        console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");
        if (playerHealth <= 0) 
        {
            window.alert(playerName + " has died!");
            break;
        }
        else 
        {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }

}

function endGame()
{
    // if player is still alive, player wins!
    if (playerHealth > 0) 
    {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
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


startGame();