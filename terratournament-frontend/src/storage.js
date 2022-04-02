export function read() {
    const data = window.sessionStorage.getItem('session.app');
    return data === null ? [] : JSON.parse(data);
}

function write(object_session) {
    const data = JSON.stringify(object_session);
    window.sessionStorage.setItem('session.app', data);
}

export function append(object_session) {
    const curr_session = read();
    curr_session.push(object_session);
    write(curr_session);
}

export function removeSession() {
    let empty_session = [];
    write(empty_session);
}

export function sessionEstablish(object) {
    append(object);
}

// GAME OPTIONS
export function readGameOptions() {
    const data = window.sessionStorage.getItem('gameoptions.app');
    return data === null ? [] : JSON.parse(data);
}

export function writeGameOptions(options) {
    const data = JSON.stringify(options);
    window.sessionStorage.setItem('gameoptions.app', data);
}