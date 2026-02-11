window.LoginFlow = (() => {
  const userInput = document.getElementById('user-id');
  const passInput = document.getElementById('access-key');
  const enterBtn = document.getElementById('enter-btn');
  const log = document.getElementById('terminal-log');

  let state = 'IDLE';

  function typeMask(input) {
    input.addEventListener('input', () => {
      const temp = input.value;
      input.type = 'text';
      clearTimeout(input._maskTimeout);
      input._maskTimeout = setTimeout(() => {
        input.type = 'password';
      }, 280);
      const prev = input.value;
      input.value = temp;
      if (prev !== temp) {
        input.setSelectionRange(temp.length, temp.length);
      }
      if (state === 'IDLE') state = 'INPUT';
    });
  }

  typeMask(userInput);
  typeMask(passInput);

  function writeLog(text) {
    log.textContent = `> ${text}`;
  }

  async function authenticate() {
    state = 'AUTHENTICATING';
    const steps = ['HASHING KEY...', 'VERIFYING NODE...', 'DECRYPTING PAYLOAD...'];
    for (const step of steps) {
      writeLog(step);
      await new Promise((r) => setTimeout(r, 440));
    }
    for (let i = 0; i <= 20; i++) {
      const bar = `[${'#'.repeat(i)}${'.'.repeat(20 - i)}]`;
      writeLog(`AUTH ${bar}`);
      await new Promise((r) => setTimeout(r, 28));
    }
    const ok = userInput.value.trim().toLowerCase() === 'conclave' && passInput.value === 'access';
    if (ok) {
      state = 'SUCCESS';
      writeLog('ACCESS GRANTED');
      return true;
    }
    state = 'INPUT';
    writeLog('ACCESS DENIED :: RETRY');
    return false;
  }

  enterBtn.addEventListener('click', async () => {
    if (state === 'AUTHENTICATING') return;
    const success = await authenticate();
    if (success) {
      window.dispatchEvent(new CustomEvent('login:success'));
    }
  });

  [userInput, passInput].forEach((input) => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') enterBtn.click();
    });
  });

  return { getState: () => state };
})();
