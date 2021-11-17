const Product = require("../models/product");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/shopping", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var products = [
  new Product({
    imagePath: "https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
    title: "Gothic",
    description:
      "The game takes place in a medieval fantasy realm in which humans are fighting a losing war against the Orcs, a humanoid race. In order to fight back, the king needs to extract magical ore from mines, which can be used to forge more powerful weapons",
    price: 10,
  }),
  new Product({
    imagePath:
      "https://upload.wikimedia.org/wikipedia/en/9/91/WoW_Box_Art1.jpg",
    title: "World of Warcraft",
    description:
      "World of Warcraft (WoW), massively multiplayer online role-playing game (MMORPG) created by the American company Blizzard Entertainment and released on November 14, 2004. ... WoW offers a rich class system of characters, allowing gamers to play as druids, priests, rogues, paladins, and other fantasy-related classes.",
    price: 20,
  }),
  new Product({
    imagePath:
      "https://upload.wikimedia.org/wikipedia/en/9/9f/Pubgbattlegrounds.png",
    title: "PUBG",
    description:
      "Gameplay. Battlegrounds is a player versus player shooter game in which up to one hundred players fight in a battle royale, a type of large-scale last man standing deathmatch where players fight to remain the last alive. Players can choose to enter the match solo, duo, or with a small team of up to four people.",
    price: 30,
  }),
  new Product({
    imagePath:
      "https://upload.wikimedia.org/wikipedia/en/2/2f/Orcs_Must_Die%21_3_logo.png",
    title: "Orcs Must Die! 3",
    description:
      "3 ushers orc-slaying mayhem to a previously unimaginable scale. New to the series, War Scenarios pit players against the largest orc armies ever assembled. ... Mountable War Machines give players the essential firepower to heave, stab, carbonize, and disarticulate the abominable intruders.",
    price: 15,
  }),
  new Product({
    imagePath:
      "https://upload.wikimedia.org/wikipedia/en/2/29/World_of_Warcraft_-_The_Burning_Crusade_coverart.jpg",
    title: "World of Warcraft: The Burning Crusade",
    description:
      "Burning Crusade Classic is a faithful recreation of the original release of World of Warcraft®: The Burning Crusade®. Enter the Twisting Nether and explore Outland—the shattered remains of the once beautiful orc homeworld, Draenor.",
    price: 39,
  }),
  new Product({
    imagePath:
      "https://upload.wikimedia.org/wikipedia/en/1/1b/Monster_Hunter_World_cover_art.jpg",
    title: "Monster Hunter: World",
    description:
      "Monster Hunter: World is an action-role-playing game and the fifth entry of the main Monster Hunter series developed and published by Capcom. The player takes the role of a Hunter traveling to the New World as a part of the Fifth Fleet.",
    price: 29,
  }),
];

var done = 0;

products.forEach((element) => {
  element.save().then(() => {
    done++;
    if (done === products.length) exit();
  });
});

const exit = () => mongoose.disconnect();
