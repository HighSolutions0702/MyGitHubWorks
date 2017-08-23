const config = {
  development: {
    API_HOST: 'http://localhost:3005/graphql',
    // API_HOST: 'http://api.staging-imoto.jetru.by/graphql',
    CLIENT_HOST: 'http://localhost:3001',
    STORAGE_NAMESPACE: '@_imoto_@',
    RECAPTCHA_SITE_KEY: '6LeUpAsUAAAAAGc8882lRt6wthQKqkPyr5qFK8J0',
    GOOGLE_KEY_API: 'AIzaSyCrGHVgwV_YwjfFPUYlppLvCE2zSLNFvXg',
    GOOGLE_OAUTH_KEY: '1051819807572-s9lro4or33thajrhn71jh959jnn5fuko.apps.googleusercontent.com',
    EWARP_API_HOST: process.env.EWARP_API_HOST || 'dev.m2.esoftsystems.com',
    EWARP_API_USER: process.env.EWARP_API_USER || 'test',
    EWARP_API_PASS: process.env.EWARP_API_PASS || 'test'
  },
  production: {
    API_HOST: process.env.API_URL || 'http://imoto-dev.wiredqa.com/api/graphql',
    CLIENT_HOST: process.env.CLIENT_URL || 'http://imoto-dev.wiredqa.com', // same domain
    STORAGE_NAMESPACE: '@_imoto_@',
    RECAPTCHA_SITE_KEY: '6LeUpAsUAAAAAGc8882lRt6wthQKqkPyr5qFK8J0',
    GOOGLE_KEY_API: 'AIzaSyALQkavbrPfREmnou3QQhdqL0vC4O7sOvs',
    GOOGLE_OAUTH_KEY: '611296597938-2sb1oe7s2sjrga2mjrl3jqh0o8b73ltm.apps.googleusercontent.com',
    EWARP_API_HOST: process.env.EWARP_API_HOST || 'dev.m2.esoftsystems.com',
    EWARP_API_USER: process.env.EWARP_API_USER || 'test',
    EWARP_API_PASS: process.env.EWARP_API_PASS || 'test'
  }
}

export default config[process.env.APP_ENV]
