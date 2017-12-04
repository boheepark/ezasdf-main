import { Selector } from 'testcafe';

const TEST_URL = process.env.TEST_URL;

const randomstring = require('randomstring');

const username = randomstring.generate();
const email = `${username}@test.com`;

// TODO should throw an error if the username is taken
// TODO should throw an error if the email is taken
fixture('/signup').page(`${TEST_URL}/signup`);

test(`should display the signup form`, async (t) => {
    await t
        .navigateTo(`${TEST_URL}/signup`)
        .expect(Selector('H1').withText('Sign Up').exists).ok()
        .expect(Selector('form').exists).ok()
});

test(`should allow a user to sign up`, async (t) => {

    // signup user
    await t
        .navigateTo(`${TEST_URL}/signup`)
        .typeText('input[name="username"]', username)
        .typeText('input[name="email"]', email)
        .typeText('input[name="password"]', 'password')
        .click(Selector('input[type="submit"]'))

    // assert user is redirected to '/'
    // assert '/' is displayed properly
    const tableRow = Selector('td').withText(username).parent();
    await t
        .expect(Selector('H1').withText('All Users').exists).ok()
        .expect(tableRow.child().withText(username).exists).ok()
        .expect(tableRow.child().withText(email).exists).ok()
        .expect(Selector('a').withText('Profile').exists).ok()
        .expect(Selector('a').withText('Sign Out').exists).ok()
        .expect(Selector('a').withText('Sign Up').exists).notOk()
        .expect(Selector('a').withText('Sign In').exists).notOk()

});