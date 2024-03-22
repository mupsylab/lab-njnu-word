const fs = require('fs');
const path = require('path');

const directory = 'release'; // 替换为您的release目录的路径

// 删除非exe文件和所有子目录
function cleanDirectory(dir, isRoot = true) {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const filePath = path.join(dir, file.name);
      if (file.isDirectory()) {
        // 递归删除子目录
        cleanDirectory(filePath, false);
      } else if (isRoot && path.extname(file.name).toLowerCase() === '.exe') {
        // 根目录下的exe文件保留
        console.log(`Keeping: ${filePath}`);
      } else {
        // 删除非exe文件或子目录下的文件
        fs.unlink(filePath, err => {
          if (err) throw err;
          console.log(`Deleted: ${filePath}`);
        });
      }
    });
  });
}

// 删除子目录
function deleteSubdirectories(dir) {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      if (file.isDirectory()) {
        const dirPath = path.join(dir, file.name);
        fs.rm(dirPath, { recursive: true }, err => {
          if (err) throw err;
          console.log(`Deleted directory: ${dirPath}`);
        });
      }
    });
  });
}

// 开始清理过程
cleanDirectory(directory, true);
deleteSubdirectories(directory);
