import {DataClass, dataClass} from "data-class-copy"
import {DartDep} from "./dart-dep"
import mapValues = require("lodash/mapValues")

export type PackageName = string
export type EnvName = string
export type EnvConfig = Record<EnvName, DartDep>

export interface ConfigParams {
  packages: Record<PackageName, EnvConfig>
}

export interface Config extends ConfigParams, DataClass<ConfigParams> {

}

@dataClass
export class Config {
  static empty = new Config({
    packages: {}
  })

  static parse(params: any = {}) {
    return Config.empty.copy({
      packages: mapValues(
        params.packages || {},
        envConfig => mapValues(envConfig, DartDep.parse)
      )
    })
  }

  constructor(params: ConfigParams) {
    Object.assign(this, params)
  }
}
