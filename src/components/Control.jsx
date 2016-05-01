import React, { Component } from 'react';
import { connect } from 'react-redux';
import Settings from './Control.json';
import { mapStateToProps, mapDispatchToProps } from 'App.jsx';
import Slider from 'material-ui/lib/slider';

class Control extends Component {
    styles = {
        base: {
            position: "absolute",
            width: "100%",
            textAlign: "center"
        },
        middle: {
            top: "50%",
            transform: "translateY(-50%)"
        },
        bottom: {
            bottom: 0
        },
        slider: {
            position: "absolute",
            width: "80%",
            left: "50%",
            transform: "translateX(-50%)",
            marginTop: 0
        }
    }

    sendCommand(command) {
        return () => {
            $.ajax({
                url: HOST_URL + "/command.html",
                method: "POST",
                data: "wm_command=" + command
            });
        }
    }

    sendChange(opt) {
        return (evt, value) => {
            $.ajax({
                url: HOST_URL + "/command.html",
                method: "POST",
                data: "wm_command=-2&" + opt.name + "=" + this.parsePercent(opt.min, opt.max, value)
            });
        }
    }

    render() {
        return (
            <div>
                {_.map(Settings.layout, (arr, name) => (
                    <div key={name} style={{...this.styles.base, ...this.styles[name]}}>
                        {_.map(arr, (arr, idx) => (
                            <div key={idx}>
                                {_.map(arr, this.createPlaybackElement.bind(this))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }

    createPlaybackElement(opt, idx) {
        var elState = this.props.playbackState[opt.name];
        var clickHandler = this.sendCommand(opt.command);
        var changeHandler = this.sendChange(opt);
        if (elState === undefined || elState) {
            return opt.type == "icon" ? <i key={idx} className="playback material-icons" onClick={clickHandler}>{opt.icon || opt.name}</i>
                : opt.type == "slider" ? <Slider key={idx} style={this.styles.slider} onChange={changeHandler} value={this.formatPercent(opt.min, opt.max, this.props.playbackStatus[opt.name])} />
                : <span key={idx}>{this.props.playbackStatus[opt.name] || opt.text || ""}</span>
        } else {
            return null;
        }
    }

    parsePercent(min, max, percent) {
        return min + (percent * (max - min));
    }

    formatPercent(min, max, value) {
        return (value - min) / (max - min);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Control);