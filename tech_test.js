function SATS2BTC(sats) {  return (sats / 100_000_000).toLocaleString(undefined, {maximumFractionDigits: 8 });  }   // SATs to BTC, formats 8 decimal places

let totalSupply = 0;   let blockHeight = 0;   let halvings = [];                 // Store data about each halving

for (let i = 0; i <= 32; i++) {                                                  // Run through each of the 32 potential halvings (BTC lifespan).
  let halvingRewardSATS = 210000 * (50 * 100000000 / Math.pow(2, i));            // Get block reward by halving (Bitcoin Monetary Policy)

  totalSupply += halvingRewardSATS;                                              // Add the current halving reward to the total supply
  blockHeight += 210000;                                                         // Increment by the blocks in one halving period

  halvings.push({
      halving: i,
      rewardSATS: halvingRewardSATS / 210000,                                    // Block reward in SATs
      halvingSupply: totalSupply,                                                // Total supply after this halving
      blockStart: blockHeight - 210000,                                          // Start block for this halving
  });
}

console.log('-'.repeat(126));   // Print separator line
console.log('|Halving| StartBlock |     Block Reward SATS/BTC     |          After halving Supply SATS/BTC          |  Mined Percentage   |'); // Table header
console.log('-'.repeat(126));

halvings.forEach(halving => {                                                   // Loop through halvings and print each halving data in a formatted table
  console.log(
    '|  ' + halving.halving.toString().padEnd(4, ' ') + ' |  ' +                                                                  // Halving number
    halving.blockStart.toString().padEnd(9, ' ') + ' |  ' +                                                                      // Block start
    halving.rewardSATS.toLocaleString().padEnd(14, ' ') + ' =  ' + SATS2BTC(halving.rewardSATS).padEnd(10, ' ') + ' | ' +        // Block reward
    halving.halvingSupply.toLocaleString().padEnd(23, ' ') + '  =  ' + SATS2BTC(halving.halvingSupply).padEnd(19, ' ') + ' |  ' +// Current Total supply
    ((halving.halvingSupply / totalSupply) * 100).toString().padEnd(18, ' ') + ' |'                                              // Calculate mined porcentage
  );
});
console.log('-'.repeat(126));