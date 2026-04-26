import { test } from '@playwright/test';

// Update the page class path as per the folder 
// eg: import { LoginPage } from '../pages/LoginPage';

import { SamplePage } from '../../templates/page/SamplePage' 

test('Sample Test Flow', async ({ page }) => {

  const samplePage = new SamplePage(page);

  // Navigate to page
  await samplePage.navigateTo('/sample');

  // Perform actions
  await samplePage.performSampleFlow('Test Data');

  // Validation
  await samplePage.verifySuccessMessage();

});