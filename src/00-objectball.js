function gameObject () {
    return{
    home : {
        teamName:"Brooklyn Nets",
        colors: ["Black","White"],
        players: {
            "Alan Anderson":{
                number: 0,
                shoe: 16,
                points: 22,
                rebounds: 12,
                assists: 12,
                steals: 3,
                blocks: 1,
                slamDunks: 1
            },
            "Reggie Evans":{
                number: 30,
                shoe: 14,
                points: 12,
                rebounds: 12,
                assists: 12,
                steals: 12,
                blocks: 12,
                slamDunks: 7
            },
            "Brook Lopez":{
                number: 11,
                shoe: 17,
                points: 17,
                rebounds: 19,
                assists: 10,
                steals: 3,
                blocks: 1,
                slamDunks: 15
            },
            "Mason Plumlee":{
                number: 1,
                shoe: 19,
                points: 26,
                rebounds: 12,
                assists: 6,
                steals: 3,
                blocks: 8,
                slamDunks: 5
            },
            "Jason Terry":{
                number: 31,
                shoe: 15,
                points: 19,
                rebounds: 2,
                assists: 2,
                steals: 4,
                blocks: 11,
                slamDunks: 1
            },
        }

    },
    away : {
        teamName:"Charlotte Hornets",
        colors:["Turquoise","Purple"],
        players:{
            "Jeff Adrien": {
                number: 4,
                shoe: 18,
                points: 10,
                rebounds: 1,
                assists: 1,
                steals: 2,
                blocks: 7,
                slamDunks: 2
        },
            "Bismak Biyombo": {
                number: 0,
                shoe: 16,
                points: 12,
                rebounds: 4,
                assists: 7,
                steals: 7,
                blocks: 15,
                slamDunks: 10
        },
            "DeSagna Diop": {
                number: 2,
                shoe: 14,
                points: 24,
                rebounds: 12,
                assists: 12,
                steals: 4,
                blocks: 5,
                slamDunks: 5
        },
            "Ben Gordon": {
                number: 8,
                shoe: 15,
                points: 33,
                rebounds: 3,
                assists: 2,
                steals: 1,
                blocks: 1,
                slamDunks: 0
        },
            "Brendan Haywood": {
                number: 33,
                shoe: 15,
                points: 6,
                rebounds: 12,
                assists: 12,
                steals: 22,
                blocks: 5,
                slamDunks: 12
        }
        }
    }
}
}
console.log(gameObject());

function numPointsScored(playerName) {
  const game = gameObject();
  for (let side in game) {
    const players = game[side].players;
    if (players[playerName]) {
      return players[playerName].points;
    }
  }
}

function shoeSize(playerName) {
  const game = gameObject();
  for (let side in game) {
    const players = game[side].players;
    if (players[playerName]) {
      return players[playerName].shoe;
    }
  }
}

function teamColors(teamName) {
  const game = gameObject();
  for (let side in game) {
    if (game[side].teamName === teamName) {
      return game[side].colors;
    }
  }
}

function teamNames() {
  const game = gameObject();
  return Object.values(game).map(team => team.teamName);
}

function playerNumbers(teamName) {
  const game = gameObject();
  for (let side in game) {
    const team = game[side];
    if (team.teamName === teamName) {
      return Object.values(team.players).map(player => player.number);
    }
  }
}

function playerStats(playerName) {
  const game = gameObject();
  for (let side in game) {
    const players = game[side].players;
    if (players[playerName]) {
      return players[playerName];
    }
  }
}

function bigShoeRebounds() {
  const game = gameObject();
  let largestShoeSize = 0;
  let reboundsForLargest = 0;

  // Iterate both teams: home and away
  for (const teamKey in game) {
    const players = game[teamKey].players;
    // Iterate each player in the current team
    for (const playerName in players) {
      const stats = players[playerName];
      if (stats.shoe > largestShoeSize) {
        largestShoeSize = stats.shoe;
        reboundsForLargest = stats.rebounds;
      }
    }
  }

  return reboundsForLargest;
}

function mostPointsScored() {
  const game = gameObject();
  let topScorer = "";
  let highestPoints = 0;

  for (const teamKey in game) {
    const players = game[teamKey].players;
    for (const player in players) {
      const pts = players[player].points;
      if (pts > highestPoints) {
        highestPoints = pts;
        topScorer = player;
      }
    }
  }

  return topScorer;
}

function winningTeam() {
  const game = gameObject();
  let scores = {};

  for (const teamKey in game) {
    const team = game[teamKey];
    const total = Object.values(team.players)
                        .reduce((sum, p) => sum + p.points, 0);
    scores[team.teamName] = total;
  }

  return scores[game.home.teamName] > scores[game.away.teamName]
        ? game.home.teamName
        : game.away.teamName;
}

function playerWithLongestName() {
  const game = gameObject();
  let longestName = "";

  for (const teamKey in game) {
    for (const player in game[teamKey].players) {
      if (player.length > longestName.length) {
        longestName = player;
      }
    }
  }

  return longestName;
}

function doesLongNameStealATon() {
  const game = gameObject();
  
  let longestName = "";
  let topSteals = 0;

  // Find player with the longest name
  for (const teamKey in game) {
    for (const pname in game[teamKey].players) {
      if (pname.length > longestName.length) {
        longestName = pname;
      }
    }
  }

  // Find the highest steal count among all players
  for (const teamKey in game) {
    for (const pname in game[teamKey].players) {
      const steals = game[teamKey].players[pname].steals;
      if (steals > topSteals) {
        topSteals = steals;
      }
    }
  }

  // Compare the longest-name player's steals to the highest steals count
  const longNamePlayerSteals = (() => {
    for (const teamKey in game) {
      const playerObj = game[teamKey].players[longestName];
      if (playerObj) return playerObj.steals;
    }
    return 0;
  })();

  return longNamePlayerSteals === topSteals;
}
