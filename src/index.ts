#!/usr/bin/env node

import init from "./cmd/init";
import main from "./cmd/main";
import { Command } from "commander";

const program = new Command();

program
  .name("lilak")
  .version("1.0.0")
  .description("License acknowledgement for your dependencies");

program
  .command("init")
  .description("Initialize lilak with default configuration")
  .action(init);

program
  .command("acknowledge")
  .description("Generate OSS acknowledgement")
  .action(main);

program.parse(process.argv);
