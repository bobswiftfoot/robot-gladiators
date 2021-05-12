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
            enemyHealth = randomNumber(40, 60);
            fight(pickedEnemyName);

            // if we're not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length - 1) 
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
                playerMoney = Math.max(0, playerMoney - 10);
                break;
            }
            else
            {
                fight();
            }
        }

        var damage = randomNumber(playerAttack - 3, playerAttack);
        //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
        enemyHealth = Math.max(0, enemyHealth - damage);
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

        damage = randomNumber(enemyAttack - 3, enemyAttack);
        // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
        playerHealth = Math.max(playerHealth - damage);
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

function shop()
{
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");
    shopOptionPrompt = shopOptionPrompt.toLocaleLowerCase();
    
    // use switch to carry out action
    switch (shopOptionPrompt) 
    {
        case "refill":
            if(playerMoney >= 7)
            {
                window.alert("Refilling player's health by 20 for 7 dollars.");

                // increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
                break;
            }
            else
            {
                window.alert("You don't have enough money!");
            }
        case "upgrade":
            if(playerMoney >= 7)
            {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                // increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
                break;
            }
            else
            {
                window.alert("You don't have enough money!");
            }
        case "leave":
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
 };

startGame();