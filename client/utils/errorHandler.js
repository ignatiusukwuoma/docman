import toastr from 'toastr';
import { ajaxCallError } from '../actions/ajaxStatusActions';

export default function handleError(error, dispatch) {
  if (dispatch) {
    dispatch(ajaxCallError());
  }
  if (error.response) {
    return toastr.error(error.response.data.message);
  }
  return toastr.error('Something went wrong');
}
