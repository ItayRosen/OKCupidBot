//Edit only the following variables
beLazy({
    messageToSend: 'Hi there :)', 
    numberOfTimes: 10
});

async function beLazy({ messageToSend, numberOfTimes }) {
    for( let i = 0; i < numberOfTimes; i++ ) {
        await enterProfile();
        if (!await alreadyLiked()) {
            await like();
            await sendIntro(messageToSend);
            goToDoubleTake();
        }
        else {
            goToDoubleTake();
            likeFromDoubleTake();
        }
        console.log('Finished profile #', i);
    }
}

function likeFromDoubleTake() {
    console.log('Like from double take');
    document.querySelector('.doubletake-like-button').click();
}

async function alreadyLiked() {
    const maxTries = 10;
    for (let i = 0; i < maxTries; i++) {
        if (document.querySelector('#like-button')) {
            console.log('Not liked');
            return false;
        }
        await delay(100);
    }
    console.log('Already liked!');
    return true;
}

async function enterProfile() {
    const query = '.cardsummary-profile-link';
    await waitForDoc(query);
    document.querySelector(query).firstElementChild.click();
}

async function like() {
    console.log('Like!');
    const query = '#like-button';
    await waitForDoc(query);
    document.querySelector(query).click();
}

async function sendIntro(messageToSend) {
    await waitForDoc('.messenger-composer');
    document.querySelector('.messenger-composer').value = messageToSend;
    document.querySelector('.messenger-composer').dispatchEvent(new Event('input', { bubbles: true }))
    document.querySelector('.messenger-toolbar-send').click();
    await delay(1000);
    document.querySelector('.connection-view-container-close-button').click();
}

function goToDoubleTake() {
    document.querySelector('.navbar-link').click();
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForDoc(query) {
    while (!document.querySelector(query)) {
        await delay(100);
        console.log('waiting for ', query);
    }
    await delay(1000);
}
