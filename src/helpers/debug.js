export default function debug(...args) {
  if (process.env.NODE_ENV === 'development') {
    // console.log('[debug] ', ...args);
  }
}
