window.addEventListener('load', () => {
  const windowHeight = window.innerHeight;
  const signupForm = window.document.getElementById('sign-up-form');
  signupForm.style.position = 'relative';
  signupForm.style.top = `${windowHeight * 0.03}px`;

  const checkSignUpButton = window.document.getElementById('check-signup-button');
  const signupWrap = window.document.getElementById('signup-modal-wrap');
  const signupBody = window.document.getElementById('signup-modal-body');
  const closeSignUpModal = window.document.getElementById('close-signupmodal-button');

  checkSignUpButton.addEventListener('click', (e) => {
    signupWrap.style.display = 'block';
    signupBody.style.marginTop = `${(window.innerHeight - modalBody.clientHeight) / 2}px`;
    closeSignUpModal.style.position = 'relative';
    closeSignUpModal.style.top = `${
      (signupBody.clientHeight - closeSignUpModal.clientHeight) * 0.5
    }px`;
  });

  closeSignUpModal.addEventListener('click', (e) => {
    signupWrap.style.display = 'none';
  });
});
