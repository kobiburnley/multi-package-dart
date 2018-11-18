import * as fs from "fs"
import {promisify} from "util"
import * as mkdirp from "mkdirp"

class Container {
  prom = {
    writeFile: promisify(fs.writeFile),
    readFile: promisify(fs.readFile),
    readdir: promisify(fs.readdir),
    symlink: promisify(fs.symlink),
    stat: promisify(fs.stat),
    mkdirp: promisify(mkdirp),
  }

  readFileToString = async (path: string) => {
    const buffer = await this.prom.readFile(path)
    return buffer.toString()
  }

  writeStringToFile = async (path: string, text: string) => {
    await this.prom.writeFile(path, text)
  }
}

export const container = new Container()
