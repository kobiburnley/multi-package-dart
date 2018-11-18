import {DataClass, dataClass} from "data-class-copy"
import {parseString} from "tsla-util/lib/parse"
import {DartDep} from "./dartDep"

export interface DartFileDepParams {
  path: string
}

export interface DartFileDep extends DartFileDepParams, DataClass<DartFileDepParams> {

}

@dataClass
export class DartFileDep implements DartDep {
  static empty = new DartFileDep({
    path: ""
  })

  static parse(params: any = {}) {
    return DartFileDep.empty.copy({
      path: parseString(params)
    })
  }

  constructor(params: DartFileDepParams) {
    Object.assign(this, params)
  }

  get yamlValue() {
    return {
      path: this.path
    }
  }
}
