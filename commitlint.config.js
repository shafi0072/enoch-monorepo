module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],

    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],

    'header-max-length': [2, 'always', 100],
    'header-case': [2, 'never', [
      'upper-case',
      'kebab-case',
      'pascal-case',
      'snake-case',
      'start-case',
    ]],

    'scope-case': [2, 'always', 'lower-case'],
    'scope-enum': [2, 'always', [
      'api', 'ui', 'global', 'css', 'devops', 'readme',
      'auth-service', 'backoffice-service', 'email-service',
      'file-service', 'price-feed-service', 'shop-service',
      'sms-service', 'web3-service'
    ]],

    'scope-empty': [2, 'never'],
    'subject-case': [
      2,
      'never',
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],

    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'test',
        'refactor',
        'maint',
        'chore',
        'ci',
        'docs',
        'perf',
        'task',
      ],
    ],
  },
};
