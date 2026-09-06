function downloadFile(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Download complete");
        resolve();
      }, 3000);
    });
  }
  
  downloadFile();