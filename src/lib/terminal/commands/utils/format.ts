export function formatPermissions(isDir: boolean): string {
  return isDir ? "drwxr-xr-x" : "-rw-r--r--";
}

export function formatSize(content: string): string {
  return String(content.length);
}

export function formatDate(): string {
  const d = new Date();
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[d.getMonth()]} ${String(d.getDate()).padStart(2, " ")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function padRight(str: string, len: number): string {
  return str + " ".repeat(Math.max(0, len - str.length));
}
