import { MusicMd } from "./musicMd.js";
import { validateId, validateMusic} from "./musicVa.js";
import { isValidUUID }  from "../utils/isValidUUID.js"
export class MusicCt{

//-----------TODO-----------------------------------------
static async getAll (req,res){
    const{artist} = req.query;
    const musics = await MusicMd.getAll
    (artist);
    musics?
    res.status(200).json(musics)
    : 
    res.status(404).json({message:"Music Not FOUND"})
}
//--------------Busqueda por ID ----------------------------
static async getById (req,res){
    const{id} = req.params
  

    const isValidateID = validateId({id})
   
    if(!isValidateID.success)
   return res.status(404).json({message:"ID no valit"})

   const musics = await MusicMd.getById(id);
    
   if(!musics.length)
    return res.status(404).json({message:"Music Not FOUND"})

    res.status(200).json(musics)
}
//-----------------Borrar -----------------------------------

static async deleOne (req,res){
    const{id} = req.params
  

    const isValidateID = validateId({id})
   
    if(!isValidateID.success)
   return res.status(404).json({message:"ID no valit"})

   const result = await MusicMd.deleOne(id);
    
   if(!result)
    return res.status(404).json({message:"Music Not FOUND"})

    res.status(200).json({message:"Music Delete"})

  
}
//------------------Agregar uno--------------------------

static async addOne(req, res) {
  const { artist, start,origin,songs ,members,poster,genres } = req.body;
  let sanitisedGenre = [];
  if (typeof genres === "string") {
    sanitisedGenre.push(genres);
  } else {
    sanitisedGenre = genres;
  }
  
  const validationResult = validateMusic({
    artist,
    start: Number(start),
    origin,
    members,
    songs: Number(songs),
    genres: sanitisedGenre,
   
    poster,
  });
  if (!validationResult.success) {
    console.log(validationResult.error);
    return res.status(422).json(validationResult.error);
  }
  try {
    await MusicMd.addOne({
      ...validationResult.data,
      poster,
    });
    res.status(201).json({ message: "Movie created" });
  } catch (error) {
    error.message.startsWith("Incorrect")
      ? res.status(400).json({ message: error.message })
      : res.status(500).json({ message: "Internal Server Error" });
  }
}

//-----------------Editar -------------------------------


static async updateOne(req, res) {
    const { id } = req.params;
    const isValidID = isValidUUID(id);
    if (!isValidID) return res.status(422).json({ message: "Not valid ID" });
    const [isMusic, _info] = await MusicMd.getById(id);

    if (!isMusic) return res.status(404).json({ message: "Movie Not Found" });
    const updatedMusic = await MusicMd.updateOne(id, req.body);

    updatedMusic 
    ? res.status(200).json({ message: "Movie updated" })
      : res.status(500).json({ message: "Internal Server Error" });
  }

}