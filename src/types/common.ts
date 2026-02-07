export interface OutputLine {
  id: string;
  type: "stdin" | "stdout" | "stderr" | "system";
  content: string;
}
