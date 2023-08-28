import {writeFile, unlink} from 'fs/promises'
import path from "path";

export const processImage = async (image) =>{
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const filepPath = path.join(process.cwd(), 'public', image.name)
    await writeFile(filepPath, buffer)
    return filepPath
}

