export default (e: MouseEvent, cb: () => void) => {
  e.preventDefault();
  cb();
};
