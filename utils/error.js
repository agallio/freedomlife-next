export function errorHandler(err, obj = { actionFailure: null }) {
  if (err.response) {
    if (err.response.hasOwnProperty('status')) {
      return obj.actionFailure;
    } else {
      console.log(err.response);
    }
  } else {
    console.log(err.response);
  }
}
