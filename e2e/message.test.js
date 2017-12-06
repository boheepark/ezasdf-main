import {Selector} from 'testcafe';

const randomstring = require('randomstring');

const username = randomstring.generate();
const email = `${username}@email.com`;
const password = 'greaterthanten';


const TEST_URL = process.env.TEST_URL;


fixture('/signup').page(`${TEST_URL}/signup`);


test.only(`should display flash messages correctly`, async (t) => {

    // register user
    await t
        .navigateTo(`${TEST_URL}/signup`)
        .typeText('input[name="username"]', username)
        .typeText('input[name="email"]', email)
        .typeText('input[name="password"]', password)
        .click(Selector('input[type="submit"]'))

    // assert flash messages are removed when user clicks the 'x'
    await t
        .expect(Selector('.alert-success').withText('Welcome!').exists).ok()
        .click(Selector('.alert > button'))
        .expect(Selector('.alert-success').withText('Welcome!').exists).notOk()

    // sign a user out
    await t
        .click(Selector('a').withText('Sign Out'))

    // attempt to sign in
    await t
        .navigateTo(`${TEST_URL}/signin`)
        .typeText('input[name="email"]', 'invalid@email.com')
});