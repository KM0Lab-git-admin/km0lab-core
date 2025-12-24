import { defineConfig } from 'checkly';
import { EmailAlertChannel, Frequency } from 'checkly/constructs';

const sendDefaults = {
  sendFailure: true,
  sendRecovery: true,
  sendDegraded: true,
};

// FIXME: Add your production URL
// const productionURL = 'https://demo.nextjs-boilerplate.com';

const emailChannel = new EmailAlertChannel('email-channel-1', {
  // FIXME: add your own email address, Checkly will send you an email notification if a check fails
  address: 'contact@creativedesignsguru.com',
  ...sendDefaults,
});

export const config = defineConfig({
  // FIXME: Add your own project name, logical ID, and repository URL
  projectName: 'Next.js Boilerplate',
  logicalId: 'nextjs-boilerplate',
  repoUrl: 'https://github.com/ixartz/Next-js-Boilerplate',
  checks: {
    locations: ['us-east-1', 'eu-west-1'],
    tags: ['website'],
    runtimeId: '2024.02',
    browserChecks: {
      frequency: Frequency.EVERY_24H,
      testMatch: '**/tests/e2e/**/*.check.e2e.ts',
      alertChannels: [emailChannel],
      // playwrightConfig moved to browserChecks level in newer versions
      // baseURL and extraHTTPHeaders are configured in the test files
    },
  },
  cli: {
    runLocation: 'eu-west-1',
    reporters: ['list'],
  },
});

export default config;
