const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Artwork = require("./models/Artwork");
require("dotenv").config();

// connect mongodb
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

/* -------------------------
PATHS
--------------------------*/

const sourceFolder = path.join(__dirname, "../frontend/public/static");
const uploadFolder = path.join(__dirname, "uploads");

// create uploads folder if not exists
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

/* -------------------------
ARTWORK DATA
--------------------------*/
const artworks = [
  { title:"Horse",description:"Energetic charcoal sketch of a running horse symbolizing strength speed freedom dynamics",price:1800,image:"horse.jpg"},
  { title:"Buddha",description:"Peaceful charcoal portrait of Lord Buddha reflecting calmness spiritual wisdom mindfulness serenity",price:1900,image:"budha.jpg"},
  { title:"Adiyogi",description:"Divine charcoal artwork of Adiyogi capturing cosmic energy intense expression spiritual depth",price:1700,image:"adiyogi.jpg"},
  { title:"Shivaji",description:"Powerful charcoal tribute to Shivaji Maharaj expressing courage leadership pride warrior spirit",price:1800,image:"shivaji.jpg"},
  { title:"Anime",description:"Stylized anime artwork featuring expressive eyes modern shading aesthetics vibrant character design",price:1500,image:"anime.jpg"},
  { title:"Rohit",description:"Realistic charcoal portrait showcasing confidence excellence iconic cricket presence fine detailing shading",price:2000,image:"Rohit_sharma.jpg"},
  { title:"Kingkohli",description:"Dynamic charcoal artwork of cricket legend showcasing dominance passion leadership sports personality",price:2000,image:"king_kohli.jpg"},
  { title:"Rocky",description:"Strong masculine charcoal portrait capturing intensity resilience determination powerful emotional expression shading",price:1600,image:"Rocky.jpg"},
  { title:"Virat",description:"Dynamic charcoal artwork of Virat Kohli representing passion leadership cricketing excellence vividly",price:2000,image:"virat_kohli.jpg"},
  { title:"Wick",description:"Intense cinematic charcoal portrait inspired by John Wick highlighting focus action depth storytelling",price:1900,image:"john_wick.jpg"},

  { title:"Hanuman",description:"Powerful charcoal depiction of Lord Hanuman symbolizing devotion strength courage spiritual dedication",price:1700,image:"hanuman.jpg"},
  { title:"Krishna",description:"Elegant charcoal sketch of Lord Krishna playing flute radiating charm serenity peaceful aura",price:1800,image:"krishna.jpg"},
  { title:"Durga",description:"Strong charcoal artwork of Goddess Durga representing feminine power protection divine energy",price:2000,image:"durga_maa.jpg"},
  { title:"Cat",description:"Cute charcoal sketch highlighting soft fur texture expressive eyes playful charming personality",price:1200,image:"cat.jpg"},
  { title:"Dog",description:"Heartwarming charcoal portrait of loyal dog expressing trust love companionship emotional bonding",price:1400,image:"dog.jpg"},
  { title:"Dragon",description:"Fantasy charcoal artwork representing fierce dragon symbolizing fire power mystery mythical strength",price:1900,image:"dragon.jpg"},
  { title:"Girl",description:"Soft charcoal portrait highlighting feminine beauty grace expressive features smooth realistic shading",price:1500,image:"girl.jpg"},
  { title:"Guitar",description:"Creative charcoal artwork of guitar reflecting passion music rhythm artistic expression melodies",price:1300,image:"guitar.jpg"},
  { title:"Hrithik",description:"Stylish charcoal portrait capturing charm personality confidence cinematic screen presence detailed shading",price:2000,image:"hrithik.jpg"},
  { title:"Kalash",description:"Traditional charcoal artwork symbolizing purity rituals prosperity spirituality sacred cultural significance",price:1200,image:"kalash.jpg"},
  { title:"Kalyani",description:"Expressive charcoal portrait reflecting individuality emotions personality depth subtle realistic detailing",price:1400,image:"kalyani.jpg"},
  { title:"Kid",description:"Charming charcoal sketch of child capturing innocence joy curiosity playful natural expressions",price:1500,image:"kid.jpg"},
  { title:"Landscape",description:"Detailed charcoal landscape capturing peaceful environment scenic depth natural beauty atmosphere",price:1800,image:"landscape.jpg"},
  { title:"Loki",description:"Marvel inspired charcoal artwork showcasing Loki mischievous personality intelligence charm villain energy",price:1900,image:"loki.jpg"},
  { title:"Love",description:"Romantic charcoal artwork expressing deep emotional bonding affection connection human relationship storytelling",price:1400,image:"love.jpg"},
  { title:"Narayan",description:"Divine charcoal portrait symbolizing cosmic balance preservation harmony spiritual power presence Vishnu",price:2000,image:"narayan.jpg"},
  { title:"Oldman",description:"Detailed charcoal portrait reflecting wisdom life experience aging emotions deep human story",price:1700,image:"oldman.jpg"},
  { title:"Owl",description:"Sharp charcoal sketch symbolizing wisdom intelligence mystery silent observation strong eye detailing",price:1600,image:"owl.jpg"},
  { title:"Radha",description:"Divine charcoal artwork of Radha Krishna expressing eternal love devotion harmony spiritual connection",price:2000,image:"radha_krishna.jpg"},
  { title:"Rhino",description:"Wildlife charcoal sketch showing strength rugged beauty power natural dominance bold textures",price:1700,image:"rhino.jpg"},
  { title:"Taj",description:"Architectural charcoal artwork of Taj Mahal representing eternal love heritage beauty monument elegance",price:1900,image:"taj_mahal.jpg"},
  { title:"Thor",description:"Marvel themed charcoal artwork showing Thor strength heroism thunder power cinematic presence",price:1900,image:"thor.jpg"},
  { title:"Zombie",description:"Dark charcoal artwork expressing horror fear decay undead theme eerie atmosphere shading",price:1500,image:"zombie.jpg"},
  
  { title:"Arjun",description:"Mythological charcoal artwork showcasing warrior spirit bravery focus divine purpose expressive detailing",price:1800,image:"arjun.jpg"},
  { title:"Lady",description:"Elegant charcoal portrait expressing feminine grace beauty confidence subtle emotional depth shading",price:1500,image:"lady.jpg"},
  { title:"Stonechariot",description:"Detailed charcoal sketch of stone chariot representing heritage architecture craftsmanship cultural significance",price:2000,image:"stonechariot.jpg"},
  { title:"Actress",description:"Charcoal portrait capturing cinematic beauty expressions elegance strong visual storytelling shading",price:1500,image:"actress.jpg"},
  { title:"Haseena",description:"Graceful charcoal portrait highlighting charm softness beauty expressive facial emotions shading work",price:1500,image:"haseena.jpg"},
  { title:"Baby",description:"Emotional charcoal artwork capturing innocence purity softness delicate expressions peaceful sleeping infant",price:1600,image:"baby.jpg"},
  { title:"Babyleg",description:"Minimal charcoal artwork showing baby feet symbolizing new beginnings innocence tenderness emotional warmth",price:1400,image:"baby_leg.jpg"},
  { title:"Ganesh",description:"Spiritual charcoal artwork of Lord Ganesha symbolizing wisdom prosperity success removal obstacles",price:1700,image:"ganesh.jpg"},
  { title:"Ram",description:"Divine charcoal artwork representing Lord Ram symbolizing righteousness courage virtue spiritual balance",price:1700,image:"ram.jpg"},
  { title:"Skull",description:"Dark charcoal artwork showing skull symbolizing mystery mortality depth intense artistic expression",price:1400,image:"skull.jpg"},
  { title:"Professor",description:"Charcoal portrait representing intelligence knowledge authority thoughtful personality expressive features shading",price:1500,image:"professor.jpg"},
  { title:"Model",description:"Fashion inspired charcoal portrait highlighting elegance confidence modern style expressive artistic detailing",price:1600,image:"model.jpg"},
  { title:"Ghost",description:"Dark themed charcoal artwork expressing mystery fear haunting presence eerie supernatural storytelling",price:1300,image:"ghost.jpg"},
  { title:"Brain",description:"Creative charcoal artwork symbolizing intelligence thinking complexity deep human cognitive structure visualized",price:1500,image:"brain.jpg"},
  { title:"Bride",description:"Traditional charcoal portrait of bride showing cultural elegance beauty grace emotional expressions",price:2000,image:"duhlan.jpg"},
  { title:"Deer",description:"Graceful charcoal drawing of deer reflecting calm nature elegance sensitivity environmental harmony",price:1400,image:"deer.jpg"},
  { title:"Elephant",description:"Powerful charcoal artwork of elephant symbolizing strength intelligence wisdom majestic natural presence",price:1700,image:"elephant.jpg"},
  { title:"Eagle",description:"Sharp charcoal sketch of eagle representing vision power dominance wild nature detailing",price:1600,image:"eagel.jpg"},
  { title:"Crocodile",description:"Wildlife charcoal artwork showcasing strength danger survival instincts powerful reptilian presence nature",price:1700,image:"crocodile.jpg"}
];

/* -------------------------
SEED FUNCTION
--------------------------*/

const seed = async () => {

  await Artwork.deleteMany();

  const finalData = artworks.map(art => {

    const sourcePath = path.join(sourceFolder, art.image);
    const destPath = path.join(uploadFolder, art.image);

    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
    } else {
      console.log("Missing image:", art.image);
    }

    return {
      title: art.title,
      description: art.description,
      price: art.price,
      image: `/uploads/${art.image}`
    };

  });

  await Artwork.insertMany(finalData);

  console.log("✅ Images copied & artworks inserted");
  process.exit();
};

seed();