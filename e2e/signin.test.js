import { Selector } from 'testcafe';

const randomstring = require('randomstring');

const username = randomstring.generate();
const email = `${username}@test.com`;

const TEST_URL = process.env.TEST_URL;

// TODO should throw an error if the credentials are incorrect.
fixture('/signin').page(`${TEST_URL}/signin`);

test(`should display the sign in form`, async (t) => {
    await t
        .navigateTo(`${TEST_URL}/signin`)
        .expect(Selector('H1').withText('Signin').exists).ok()
        .expect(Selector('form').exists).ok();
});

test(`should allow a user to sign in`, async (t) => {

    // signup user
    await t
        .navigateTo(`${TEST_URL}/signup`)
        .typeText('input[name="username"]', username)
        .typeText('input[name="email"]', email)
        .typeText('input[name="password"]', 'password')
        .click(Selector('input[type="submit"]'));

    // sign a user out
    await t
        .click(Selector('a').withText('Sign Out'));

    // sign a user in
    await t
        .navigateTo(`${TEST_URL}/signin`)
        .typeText('input[name="username"]', username)
        .typeText('input[name="password"]', 'password')
        .click(Selector('input[type="submit"]'));

    // sign a user out
    await t
        .click(Selector('a').withText('Sign Out'));

    // assert '/signout' is displayed properly
    await t
        .expect(Selector('p').withText('You are now signed out').exists).ok()
        .expect(Selector('a').withText('Profile').exists).notOk()
        .expect(Selector('a').withText('Sign Out').exists).notOk()
        .expect(Selector('a').withText('Sign Up').exists).ok()
        .expect(Selector('a').withText('Sign In').exists).ok();

});