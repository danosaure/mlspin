export const preventDefault = (e: MouseEvent, cb: () => void) => {
  e.preventDefault();
  cb();
};
