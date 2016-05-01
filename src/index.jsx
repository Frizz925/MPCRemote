import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App.jsx';
import FastClick from 'fastclick';
import 'normalize.css';
import './index.css';

var store = createStore((state, action) => {
    switch (action.type) {
        case "UPDATE_STATE":
            return action.state;
        default:
            state[action.name] = action.value;
            break;
    }
    return {...state};
}, {
    playbackState: {
        play: true,
        pause: false,
        mute: true,
        unmute: false
    },
    playbackStatus: {}
});

render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById("app"));

window.OnStatus = function() {
    var arr = arguments;
    displayStatus({
        title: arr[0],
        state: arr[1],
        time: Number(arr[2]),
        timeText: arr[3],
        duration: Number(arr[4]),
        durationText: arr[5],
        mute: arr[6] == "1",
        volume: Number(arr[7]),
        filename: arr[8]
    });
    setTimeout(updateStatus, 500);
};

function displayStatus(status) {
    store.dispatch({
        type: "UPDATE_STATE",
        state: {
            playbackStatus: {
                ...status,
                percent: status.time / status.duration * 100
            },
            playbackState: {
                play: status.state !== "Playing",
                pause: status.state !== "Paused",
                mute: status.mute,
                unmute: !status.mute
            }
        }
    });
}

function updateStatus() {
    $.ajax({
        url: HOST_URL + "/status.html",
        method: "GET",
        dataType: "jsonp"
    });
}

updateStatus();

FastClick.attach(document.body);
