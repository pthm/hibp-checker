# hibp-checker

Anonymously query the haveibeenpwned.com API to fetch the number of times a
password has appeard in breached data sets using [K-anonymity](https://en.wikipedia.org/wiki/K-anonymity)

## Installation
```bash
npm install --save hibp-checker
```

## Usage

### API

```javascript

const checkPassword = require('hibp-checker');
const breachCount = await checkPassword('hunter2');
console.log(`Breached ${breachCount} times`);
```

### Command Line

```
> hibp-checker
Enter password to check: *********
Password frequency: 123
```

## Reading
- [HaveIBeenPwned API Docs](https://haveibeenpwned.com/API/v2#SearchingPwnedPasswordsByRange)
- [Troy Hunt's Blog Post](https://www.troyhunt.com/ive-just-launched-pwned-passwords-version-2/)