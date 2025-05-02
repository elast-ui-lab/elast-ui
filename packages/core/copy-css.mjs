import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copyCssModules = (src, dest) => {
  const isExistDistDir = fs.existsSync(dest);

  // dist/components가 없으면 생성
  if (!isExistDistDir) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // 소스 디렉토리의 파일과 하위 디렉토리 목록을 entries로 가져옴
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // 디렉토리(폴더)인 경우 재귀적으로 copyCssModules 호출
      copyCssModules(srcPath, destPath);
    } else if (entry.name.endsWith(".module.css")) {
      // CSS 모듈 파일만 복사
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

// src/components 디렉토리의 모든 CSS 모듈 파일을 dist/components로 복사
const srcComponentsDir = path.resolve(__dirname, "src/components");
const destComponentsDir = path.resolve(__dirname, "dist/components");

copyCssModules(srcComponentsDir, destComponentsDir);

console.log("CSS module files copied successfully!");
