import { join } from "node:path";
import { URL } from "node:url";

function fixPath(path: string): string {
  if (isURL(path)) {
    return path;
  }

  if (path.startsWith(import.meta.env.BASE_URL)) {
    return path;
  }

  return join(import.meta.env.BASE_URL, path);
}

function isURL(input: string): boolean {
  try {
    new URL(input);
    return true;
  } catch (error) {
    return false;
  }
}

export default fixPath;
