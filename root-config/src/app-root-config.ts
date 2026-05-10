import { start } from 'single-spa';
import { useBootstrapAuth } from '@app/shared-auth';
import { showGlobalLoader, hideGlobalLoader } from './ui/global-loader';
import { registerApplications } from './config/register-applications';

async function init() {
  showGlobalLoader();

  try {
    await useBootstrapAuth();

    registerApplications();
    start();
  } finally {
    hideGlobalLoader();
  }
}

init();
