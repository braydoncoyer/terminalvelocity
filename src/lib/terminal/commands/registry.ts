import { CommandEntry, CommandHandler } from "./types";

const commands = new Map<string, CommandEntry>();

export function registerCommand(
  name: string,
  handler: CommandHandler,
  help: string,
  windowsEquivalent?: string
): void {
  commands.set(name, { handler, help, windowsEquivalent });
}

export function getCommand(name: string): CommandEntry | undefined {
  return commands.get(name);
}

export function getCommandNames(): string[] {
  return [...commands.keys()].sort();
}

export function getWindowsEquivalent(name: string): string | undefined {
  return commands.get(name)?.windowsEquivalent;
}
