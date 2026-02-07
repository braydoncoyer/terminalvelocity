import { VirtualFileSystem } from "../filesystem/virtual-fs";

export interface CommandContext {
  fs: VirtualFileSystem;
  args: string[];
  flags: Record<string, string | boolean>;
  env: Record<string, string>;
  cwd: string;
  stdin?: string;
  history: string[];
}

export interface CommandResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

export type CommandHandler = (ctx: CommandContext) => CommandResult;

export interface CommandEntry {
  handler: CommandHandler;
  help: string;
  windowsEquivalent?: string;
}
