import {DataClass, dataClass} from "data-class-copy"
import {parseString} from "tsla-util/lib/parse"
import {DartDep} from "./dartDep"

export interface DartPubDepParams {
  version: string
}

export interface DartPubDep extends DartPubDepParams, DataClass<DartPubDepParams> {

}

@dataClass
export class DartPubDep implements DartDep {
  static empty = new DartPubDep({
    version: ""
  })

  static parse(params: any = {}) {
    return DartPubDep.empty.copy({
      version: parseString(params.version)
    })
  }

  constructor(params: DartPubDepParams) {
    Object.assign(this, params)
  }

  get yamlValue() {
    return this.version
  }
}
