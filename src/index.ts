#! /usr/bin/env node

import {Option} from "tsla-util/lib/option"
import * as minimist from "minimist"
import {container} from "./container"
import {Generate} from "./generate"
import {GenerateOptions} from "./generateOptions"

const args = minimist(process.argv.slice(2))

const commands = {
  generate: () => new Generate({
    options: GenerateOptions.parse(args),
    readFile: container.readFileToString,
    writeFile: container.writeStringToFile
  }).entry()
}

const unknownCommand = async () => {
  console.log(`command ${command} is not supported`)
}

const command = args._[0] as keyof typeof commands

async function main() {
  try {
    await Option.of(commands[command]).getOrElse(unknownCommand)()
  } catch (e) {
    console.error(e)
  }
}

main()
