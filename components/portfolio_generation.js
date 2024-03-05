const FIXED_COINS = [ "bitcoin",  "ethereum" ];
const LOW_RISK_COINS = [ "binancecoin",  "solana",  "ripple",  "cardano"];
const MEDIUM_RISK_COINS =  [ "avalanche-2",  "polkadot", "matic-network", "tron", "chainlink", "uniswap", "theta-token", "gala", "the-sandbox", "decentraland", "stellar", "filecoin"];
const HIGH_RISK_COINS = [ "shiba-inu", "dogecoin", "pepe", "floki", "corgiai", "memecoin-2", "bonk"];
// Fisher-Yates Shuffle Algorithm
function shuffle(array){
    let newArray = [...array];
    for(let i=newArray.length-1;i>0;i--)
    {
        let j = Math.floor(Math.random()*i);
        let temp = newArray[j];
        newArray[j] = newArray[i];
        newArray[i] = temp;
    }
    // console.log(newArray);
    return newArray;
}

// Percentage Data:
/* 
1. LOW RISK
low risk coins - 60%
medium risk coins - 30%
high risk coins - 10%

2. MEDIUM RISK
low risk coins - 55%
medium risk coins - 25%
high risk coins - 20%

3. HIGH RISK
low risk coins - 50%
medium risk coins - 25%
high risk coins - 25%
*/
function getAmount(TOTAL, percentage)
{
    const val = (percentage/100*TOTAL).toFixed(2);
    return val;
}
function generatePortfolio(TOTAL, risk_level)
{
    var shuffled_low_risk_coins_array = shuffle(LOW_RISK_COINS);
    var shuffled_medium_risk_coins_array = shuffle(MEDIUM_RISK_COINS);
    var shuffled_high_risk_coins_array = shuffle(HIGH_RISK_COINS);
    const portfolio = new Map();
    let percentages = [];
    switch(risk_level)
    {
        case "LOW":
            console.log("Low");
            // Adding FIXED coins - 30%
            portfolio.set(FIXED_COINS[0],{percentage: 16, amount: getAmount(TOTAL, 16)});
            portfolio.set(FIXED_COINS[1],{percentage: 14, amount: getAmount(TOTAL, 14)});
            console.log(shuffled_low_risk_coins_array);
            // Adding LOW risk coins - 30%
            for(let i=0;i<=2;i++)
            {
                portfolio.set(shuffled_low_risk_coins_array[i], {percentage: 10, amount: getAmount(TOTAL, 10)});
            }
            // Adding MEDIUM risk coins - 30%
            percentages = [12, 9, 11];
            for(let i=0;i<=2;i++)
            {
                portfolio.set(shuffled_medium_risk_coins_array[i], {percentage: percentages[i], amount: getAmount(TOTAL, percentages[i])});
            }
            // Adding HIGH risk coins - 10%
            percentages = [4, 3, 3];
            for(let i=0;i<=2;i++)
            {
                portfolio.set(shuffled_high_risk_coins_array[i], {percentage: percentages[i], amount: getAmount(TOTAL, percentages[i])});
            }
            break;
        case "MEDIUM":
            console.log("Medium");
            // Adding FIXED coins - 30%
            portfolio.set(FIXED_COINS[0],{percentage: 16, amount: getAmount(TOTAL, 16)});
            portfolio.set(FIXED_COINS[1],{percentage: 14, amount: getAmount(TOTAL, 14)});
            // Adding LOW risk coins - 25%
            percentages = [ 12, 5, 8 ];
            for(let i=0;i<=2;i++)
            {
                portfolio.set(shuffled_low_risk_coins_array[i], {percentage: percentages[i], amount: getAmount(TOTAL, percentages[i])});
            }
            // Adding MEDIUM risk coins - 25%
            percentages = [10, 8, 7];
            for(let i=0;i<=2;i++)
            {
                portfolio.set(shuffled_medium_risk_coins_array[i], {percentage: percentages[i], amount: getAmount(TOTAL, percentages[i])});
            }
            // Adding HIGH risk coins - 20%
            percentages = [5, 8, 7];
            for(let i=0;i<=2;i++)
            {
                portfolio.set(shuffled_high_risk_coins_array[i], {percentage: percentages[i], amount: getAmount(TOTAL, percentages[i])});
            }
            break;
        case "HIGH":
            console.log("High");
            // Adding FIXED coins - 30%
            portfolio.set(FIXED_COINS[0],{percentage: 16, amount: getAmount(TOTAL, 16)});
            portfolio.set(FIXED_COINS[1],{percentage: 14, amount: getAmount(TOTAL, 14)});
            // Adding LOW risk coins - 20%
            percentages = [ 7, 5, 8 ];
            for(let i=0;i<=2;i++)
            {
                portfolio.set(shuffled_low_risk_coins_array[i], {percentage: percentages[i], amount: getAmount(TOTAL, percentages[i])});
            }
            // Adding MEDIUM risk coins - 25%
            percentages = [ 11, 6, 8 ];
            for(let i=0;i<=2;i++)
            {
                portfolio.set(shuffled_medium_risk_coins_array[i], {percentage: percentages[i], amount: getAmount(TOTAL, percentages[i])});
            }
            // Adding HIGH risk coins - 25%
            percentages = [ 7, 8, 6, 4 ];
            for(let i=0;i<=3;i++)
            {
                portfolio.set(shuffled_high_risk_coins_array[i], {percentage: percentages[i], amount: getAmount(TOTAL, percentages[i])});
            }
            break;
    }
    console.log(portfolio);
    return portfolio;
}
// let amount = 10000;
// let risk_level = "LOW";

// generatePortfolio(amount, risk_level);
export { generatePortfolio };