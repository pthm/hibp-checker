const checkPassword = require( '../index' );

process.stdin.setEncoding( 'utf8' );

process.stdout.write( 'Enter password to check: ' );

let password = '';
process.stdin.setRawMode( true );
process.stdin.on( 'readable', () => {
    const chunk = process.stdin.read();
    if ( chunk === null ) {
        return;
    }

    if ( chunk === '\n' || chunk === '\r' || chunk === '\u0004' ) {
        process.stdin.setRawMode( false );
        process.stdout.write( '\n' );
        process.stdin.emit( 'end' );
        return;
    }

    password += chunk;
    process.stdout.write( '*' );
} );

process.stdin.on( 'end', async () => {
    const seen = await checkPassword( password );
    console.log( `Password frequency: ${ seen }` );
    process.exit( 0 );
} );