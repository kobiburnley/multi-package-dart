import * as path from "path"
import {Config} from "./config"
import {GenerateOptions} from "./generateOptions"
import * as yaml from "js-yaml"
import {Pubspec} from "./pubspec"
import forEach = require("lodash/forEach")

export interface GenerateParams {
  options: GenerateOptions
  readFile: (path: string) => Promise<string>
  writeFile: (path: string, text: string) => Promise<any>
}

export interface Generate extends GenerateParams {

}

export class Generate {
  constructor(params: GenerateParams) {
    Object.assign(this, params)
  }

  async entry() {
    const {options} = this
    const configPath = path.resolve(options.config)
    const pubspecSourcePath = path.resolve(options.pubspecSource)
    const pubspecTargetPath = path.resolve(options.pubspecTarget)
    const config = Config.parse(JSON.parse(await this.readFile(configPath)))

    const pubspec: Pubspec = yaml.load(await this.readFile(pubspecSourcePath))

    forEach(config.packages, (envs, packageName) => {
      pubspec.dependencies[packageName] = envs[options.env].yamlValue
    })

    await this.writeFile(pubspecTargetPath, yaml.dump(pubspec))
  }
}
