const ANDROID_PACKAGE_NAME = 'com.eve';

const CONST = {
  ANDROID_PACKAGE_NAME,
  DATE: {
    MOMENT_FORMAT_STRING: 'YYYY-MM-DD',
  },
  PLATFORM: {
    IOS: 'ios',
    ANDROID: 'android',
    TABLET: 'tablet',
  },
  SPINNER_TIMEOUT: 15 * 1000,
  ENVIRONMENT: {
    DEV: 'development',
    STAGING: 'staging',
    PRODUCTION: 'production',
  },
  NETWORK: {
    METHOD: {
      POST: 'post',
    },
    MAX_REQUEST_RETRIES: 10,
    PROCESS_REQUEST_DELAY_MS: 1000,
    MAX_PENDING_TIME_MS: 10 * 1000,
  },
  APP_STATE: {
    ACTIVE: 'active',
    BACKGROUND: 'background',
    INACTIVE: 'inactive',
  },
  KEYBOARD_TYPE: {
    PHONE_PAD: 'phone-pad',
    NUMBER_PAD: 'number-pad',
    DECIMAL_PAD: 'decimal-pad',
    VISIBLE_PASSWORD: 'visible-password',
    EMAIL_ADDRESS: 'email-address',
  },
  BASIC_DIMENSION: {
    WIDTH: 1780,
    HEIGHT: 1087,
  },
};

export default CONST;
