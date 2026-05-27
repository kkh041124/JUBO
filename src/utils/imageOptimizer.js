/**
 * 클라이언트 사이드에서 이미지 크기를 조절하고 압축하는 유틸리티
 * @param {File} file - 업로드된 이미지 파일
 * @param {number} maxWidth - 이미지 최대 가로 너비 (기본값: 1024)
 * @param {number} maxHeight - 이미지 최대 세로 높이 (기본값: 1024)
 * @param {number} quality - JPEG 압축 품질 (0.1 ~ 1.0, 기본값: 0.7)
 * @returns {Promise<string>} - 압축 완료된 base64 이미지 주소
 */
export const compressImage = (file, maxWidth = 1024, maxHeight = 1024, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("이미지 파일이 아닙니다."));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // 크기 계산
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // JPEG 0.7 품질로 압축
        const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedBase64);
      };
      img.onerror = (err) => reject(err);
      img.src = e.target.result;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};
