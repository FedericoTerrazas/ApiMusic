import { Router } from "express";
export const router = Router();
import {MusicCt} from "./musicCt.js";



router.get ("/",MusicCt.getAll);

router.get ("/:id",MusicCt.getById);


router.delete ("/:id",MusicCt.deleOne);

router.post ("/",MusicCt.addOne);

router.patch("/:id", MusicCt.updateOne);