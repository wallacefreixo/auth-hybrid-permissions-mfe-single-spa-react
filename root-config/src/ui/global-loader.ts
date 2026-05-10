import { getInitialTheme } from '../utils/theme';

let loaderEl: HTMLElement | null = null;

export function showGlobalLoader() {
  const theme = getInitialTheme();

  const bg = theme === 'dark' ? '#121212' : '#fff';

  loaderEl = document.createElement('div');
  loaderEl.id = 'global-loader';

  loaderEl.innerHTML = `
    <div style="
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${bg};
      z-index: 999999;
    ">
      <div style="
        width: 50px;
        height: 50px;
        border: 5px solid rgba(148,163,184,0.3);
        border-top-color: #1976d2;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      "></div>
    </div>

    <style>
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    </style>
  `;

  document.body.appendChild(loaderEl);
}

export function hideGlobalLoader() {
  loaderEl?.remove();
}
