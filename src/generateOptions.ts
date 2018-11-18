import {DataClass, dataClass} from "data-class-copy"
import {parseString} from "tsla-util/lib/parse"

export interface GenerateOptionsParams {
  env: string
  config: string
  pubspecSource: string
  pubspecTarget: string
}

export interface GenerateOptions extends GenerateOptionsParams, DataClass<GenerateOptions> {

}

@dataClass
export class GenerateOptions {
  static empty = new GenerateOptions({
    env: "",
    config: "",
    pubspecSource: "",
    pubspecTarget: ""
  })

  static parse(params: any = {}) {
    return GenerateOptions.empty.copy({
      env: parseString(params.env) || "local",
      config: parseString(params.config) || "config/multi-package/config.json",
      pubspecSource: parseString(params.pubspecSource) || "pubspec-template.yaml",
      pubspecTarget: parseString(params.pubspecTarget) || "pubspec.yaml",
    })
  }

  constructor(params: GenerateOptionsParams) {
    Object.assign(this, params)
  }
}
