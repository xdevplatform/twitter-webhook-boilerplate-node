var security = require('./security')

SIGNATURE_HEADER = 'Pi321ShXoGo6Gn5fuT5vlUU0uZbx1Gq/pSuUkope2Lo='

token = security.get_challenge_response_noencode('crc_token=OWY4ODQ2ZjgtNDljMC00NDY2LWJhMGQtYTE4NzQ0MTM2OGFi&nonce=MTQ4Nzk3OTc0NDI1MA', 'fccV6Z7YvZdPz0IPRUCVGzk7KDe9QfGtMdVHo3kgyIUwWCtPjW');

console.log(token);
console.log('sha256='+SIGNATURE_HEADER);