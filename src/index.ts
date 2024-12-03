#!/usr/bin/env node

import { Command } from "commander";
import init from "./main/init";

const program = new Command();

program
  .name("lilak")
  .version("1.0.0")
  .description("License acknowledgement for your dependencies");

program
  .command("init")
  .description("Initialize lilak with default configuration")
  .action(init);

program.parse(process.argv);
