import {DataClass, dataClass} from "data-class-copy"
import {DartFileDep} from "./dartFileDep"
import {DartGitDep} from "./dartGitDep"
import {DartPubDep} from "./dartPubDep"

export interface DartDepParams {

}

export interface DartDep extends DartDepParams {
  readonly yamlValue: any;
}

export abstract class DartDep {
  static parse(params: any = {}) {
    if (typeof params === "string") {
      return DartPubDep.parse(params)
    }
    const {git, path} = params
    if (git != null) {
      return DartGitDep.parse(params.git)
    }
    if (typeof path === "string") {
      return DartFileDep.parse(params.path)
    }
    throw new Error(`Couldn't resolve dart dependency type of: ${JSON.stringify(params)}`)
  }
}
