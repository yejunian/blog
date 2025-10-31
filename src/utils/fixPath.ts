import { join } from "node:path";
import { URL } from "node:url";

function fixPath(path: string): string {
  if (isURL(path)) {
    return path;
  }

  let fixed = path;

  if (!fixed.startsWith(import.meta.env.BASE_URL)) {
    fixed = join(import.meta.env.BASE_URL, fixed);
  }

  if (!fixed.endsWith("/")) {
    fixed += "/";
  }

  return fixed;
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
