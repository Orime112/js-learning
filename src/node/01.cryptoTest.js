const crypto = require('crypto')

const secret = 'abcdef'
const hash = crypto.createHmac('sha256', secret).update('I love cupcakes').digest('hex')

console.log(hash);

const cert = require('crypto').Certificate();
const spkac = getSpkacSomehow();
console.log(cert.verifySpkac(Buffer.from(spkac)));