import { Selector } from 'testcafe';

const randomstring = require('randomstring');

const username = randomstring.generate();
const email = `${username}@test.com`;
const currentDate = new Date();

const TEST_URL = process.env.TEST_URL;

fixture('/profile').page(`${TEST_URL}/profile`);

test(`should display the page if user is not signed in`, async (t) => {
    await t
        .navigateTo(`${TEST_URL}/profile`)
        .expect(Selector('p').withText('You must be signed in to view this page.').exists).ok()
        .expect(Selector('a').withText('Profile').exists).notOk()
        .expect(Selector('a').withText('Sign Out').exists).notOk()
        .expect(Selector('a').withText('Sign Up').exists).ok()
        .expect(Selector('a').withText('Sign In').exists).ok();
});

test(`should display user info if user is signed in`, async (t) => {

    // signup user
    await t
        .navigateTo(`${TEST_URL}/signup`)
        .typeText('input[name="username"]', username)
        .typeText('input[name="email"]', email)
        .typeText('input[name="password"]', 'password')
        .click(Selector('input[type="submit"]'));

    // assert '/profile' is displayed properly
    await t
        .navigateTo(`${TEST_URL}/profile`)
        .expect(Selector('li > strong').withText('User ID:').exists).ok()
        .expect(Selector('li > strong').withText('Email:').exists).ok()
        .expect(Selector('li').withText(email).exists).ok()
        .expect(Selector('li > strong').withText('Username:').exists).ok()
        .expect(Selector('li').withText(username).exists).ok()
        .expect(Selector('a').withText('Profile').exists).ok()
        .expect(Selector('a').withText('Sign Out').exists).ok()
        .expect(Selector('a').withText('Sign Up').exists).notOk()
        .expect(Selector('a').withText('Sign In').exists).notOk();

});