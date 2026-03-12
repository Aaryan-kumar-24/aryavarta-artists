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
{title:"Buddha",description:"A calm spiritual charcoal depiction of Lord Buddha reflecting peace wisdom",price:2499,image:"budha.jpg"},
{title:"Horse",description:"An energetic charcoal sketch of running horse symbolizing strength and freedom",price:2199,image:"horse.jpg"},
{title:"Adiyogi",description:"A divine representation of Adiyogi capturing cosmic energy through bold strokes",price:2099,image:"adiyogi.jpg"},
{title:"Deer",description:"A graceful deer captured in monochrome evoking nature gentleness and elegance",price:1599,image:"deer.jpg"},
{title:"Baby",description:"A touching charcoal sketch capturing pure emotion and innocence of sleeping infant",price:2299,image:"baby.jpg"},
{title:"Baby Leg",description:"A minimalist charcoal artwork showing tiny baby feet symbolizing new life",price:1899,image:"baby_leg.jpg"},
{title:"Eagle",description:"An intense charcoal portrait of eagle reflecting vision strength and wild nature",price:1999,image:"eagel.jpg"},
{title:"Elephant",description:"A noble charcoal rendering of elephant showcasing power wisdom and natural grandeur",price:1899,image:"elephant.jpg"},
{title:"Shivaji",description:"Charcoal tribute to Shivaji Maharaj radiating courage leadership and historical pride",price:2199,image:"shivaji.jpg"},
{title:"Hanuman",description:"Powerful charcoal art of Lord Hanuman embodying loyalty strength and faith",price:1999,image:"hanuman.jpg"},
{title:"Krishna",description:"Charcoal sketch of Lord Krishna playing flute radiating charm and serenity",price:2099,image:"krishna.jpg"},
{title:"Lady",description:"A refined charcoal portrait of woman expressing beauty dignity and silent confidence",price:1899,image:"lady.jpg"},
{title:"Rocky",description:"Strong masculine portrait capturing intensity resilience and determination through bold shading",price:1800,image:"Rocky.jpg"},
{title:"Rohit Sharma",description:"Realistic charcoal portrait showcasing confidence excellence and iconic sporting presence clearly",price:2500,image:"Rohit_sharma.jpg"},
{title:"Actress",description:"Elegant portrait highlighting beauty expressions and cinematic charm using smooth shading",price:2000,image:"actress.jpg"},
{title:"Anime",description:"Stylized anime artwork with expressive eyes and modern shading aesthetics beautifully",price:1600,image:"anime.jpg"},
{title:"Arjun",description:"Mythological depiction of warrior Arjun showcasing bravery focus and divine purpose",price:2400,image:"arjun.jpg"},
{title:"Stone Chariot",description:"Detailed sketch of Hampi stone chariot reflecting heritage architecture craftsmanship and history",price:2700,image:"stonechariot.jpg"},
{title:"Durga",description:"Powerful depiction of Goddess Durga symbolizing strength protection and divine feminine energy",price:3000,image:"durga_maa.jpg"},
{title:"Cat",description:"Cute sketch highlighting fur texture expressive eyes and playful lively nature",price:1500,image:"cat.jpg"},
{title:"Dog",description:"Loyal companion portrait reflecting love trust and deeply expressive emotional connection",price:1800,image:"dog.jpg"},
{title:"Dragon",description:"Fantasy artwork representing power mystery fire and mythical legendary creature strength",price:2500,image:"dragon.jpg"},
{title:"Bride",description:"Traditional bride portrait showing cultural elegance beauty and emotional graceful expressions",price:2600,image:"duhlan.jpg"},
{title:"Girl",description:"Portrait highlighting beauty grace and expressive features with smooth charcoal shading",price:2000,image:"girl.jpg"},
{title:"Guitar",description:"Musical artwork showing passion rhythm and creativity through detailed charcoal rendering",price:1700,image:"guitar.jpg"},
{title:"Haseena",description:"Elegant feminine portrait emphasizing charm grace and soft expressive facial features",price:1900,image:"haseena.jpg"},
{title:"Hrithik",description:"Celebrity portrait capturing charm personality style and strong cinematic screen presence",price:2500,image:"hrithik.jpg"},
{title:"John Wick",description:"Action inspired portrait reflecting intensity focus and cinematic dramatic visual depth",price:2600,image:"john_wick.jpg"},
{title:"Kalash",description:"Traditional artwork symbolizing rituals prosperity purity and spiritual cultural significance",price:1500,image:"kalash.jpg"},
{title:"Kalyani",description:"Portrait highlighting individuality emotions and unique expressive personality through shading",price:1800,image:"kalyani.jpg"},
{title:"Kid",description:"Child sketch capturing innocence joy curiosity and playful natural expressions beautifully",price:1900,image:"kid.jpg"},
{title:"Virat Kohli",description:"Energetic portrait symbolizing passion dedication excellence and cricketing greatness worldwide",price:2600,image:"virat_kohli.jpg"},
{title:"Landscape",description:"Nature scene capturing peaceful surroundings environmental depth and scenic natural beauty",price:2400,image:"landscape.jpg"},
{title:"Loki",description:"Marvel inspired artwork showcasing mischief intelligence power and charismatic villain energy",price:2500,image:"loki.jpg"},
{title:"Love",description:"Romantic artwork expressing deep emotional connection affection and heartfelt human bonding",price:1800,image:"love.jpg"},
{title:"Narayan",description:"Divine portrait symbolizing cosmic balance preservation harmony and spiritual power presence",price:3000,image:"narayan.jpg"},
{title:"Old Man",description:"Portrait reflecting wisdom experience age life journey and emotional depth clearly",price:2100,image:"oldman.jpg"},
{title:"Owl",description:"Detailed sketch symbolizing wisdom mystery intelligence and quiet night observation skills",price:2000,image:"owl.jpg"},
{title:"Radha Krishna",description:"Divine couple artwork expressing eternal love harmony devotion and spiritual union beautifully",price:3000,image:"radha_krishna.jpg"},
{title:"Rhino",description:"Wildlife sketch showing power strength rugged beauty and strong natural presence",price:2200,image:"rhino.jpg"},
{title:"Shiva",description:"Divine artwork symbolizing transformation destruction creation and powerful cosmic spiritual energy",price:3000,image:"shiv.jpg"},
{title:"Taj Mahal",description:"Architectural artwork representing love heritage beauty and timeless historical monument elegance",price:2800,image:"taj_mahal.jpg"},
{title:"Thor",description:"Marvel artwork showing power heroism strength and cinematic thunder god energy",price:2600,image:"thor.jpg"},
{title:"Zombie",description:"Horror artwork expressing darkness decay fear and undead eerie visual effects",price:1900,image:"zombie.jpg"}
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