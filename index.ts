import { createHash } from 'crypto';
import { get } from 'https';

/**
 * Hashes a password using SHA-1 then send the first 5 characters of that hash to the haveibeenpwned.com API
 * The API returns a range of hash suffixes with corresponding breach counts. By reconstructing the hashes
 * we can check how many breach occurences a password has been in anonymously
 *
 * More information can be found at these links
 * https://haveibeenpwned.com/API/v2#SearchingPwnedPasswordsByRange
 * https://www.troyhunt.com/ive-just-launched-pwned-passwords-version-2/
 * @param {string} password
 * @returns {Promise<number>}
 */
function checkPassword(password: string) : Promise<number> {
    const hashedPassword = createHash('sha1')
        .update(password)
        .digest('hex')
        .toUpperCase();

    const hashPrefix = hashedPassword.substr(0, 5);
    const hashSuffix = hashedPassword.substr(5, hashedPassword.length - 1);

    return new Promise((resolve, reject) => {
        get(`https://api.pwnedpasswords.com/range/${hashPrefix}`, (res) => {
            let response = '';
            res.on('data', (d) => {
                response += d;
            });
            res.on('end', () => {
                const hashes = response.split('\n')
                    .reduce((acc: {[hash: string]: number}, hashCountPair: string) => {
                        const [hashSuffix, count] = hashCountPair.split(':');
                        acc[hashPrefix + hashSuffix] = parseInt(count);
                        return acc;
                    }, {});

                const count = hashes[hashPrefix + hashSuffix];
                if(count){
                    resolve(count);
                } else {
                    resolve(0);
                }
            });
        }).on('error', reject)
    });
}

export default checkPassword;
module.exports = checkPassword;