import {DataClass, dataClass} from "data-class-copy"
import {parseString} from "tsla-util/lib/parse"
import {DartDep, DartDepParams} from "./dartDep"

export interface DartGitDepParams extends DartDepParams {
  url: string
  path: string
}

export interface DartGitDep extends DartGitDepParams, DataClass<DartGitDepParams> {

}

@dataClass
export class DartGitDep implements DartDep {
  static empty = new DartGitDep({
    url: "",
    path: "",
  })

  static parse(params: any = {}) {
    return DartGitDep.empty.copy({
      url: parseString(params.url),
      path: parseString(params.path)
    })
  }

  constructor(params: DartGitDepParams) {
    Object.assign(this, params)
  }

  get yamlValue() {
    const value = {
      url: this.url,
      path: this.path
    }
    if (!this.path.trim().length) {
      delete value.path
    }
    return {
      git: value
    }
  }
}
