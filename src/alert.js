export default function showAlert(message) {
  const div = document.createElement('div');
  div.className = 'alert alert-danger';
  div.appendChild(document.createTextNode(message));
  const alertDiv = document.querySelector('.alert-div');
  alertDiv.appendChild(div);
  setTimeout(() => document.querySelector('.alert').remove(), 3000);
}