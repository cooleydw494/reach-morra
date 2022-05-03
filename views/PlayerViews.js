import React from 'react';

const exports = {};

// Player views must be extended.
// It does not have its own Wrapper view.

exports.GetHand = class extends React.Component {
    render() {
        const { parent, playable, hand } = this.props;
        return (
            <div>
                {hand ? 'Nobody won! Time to play again. (Don\'t forget your funds are still locked in the contract!' : ''}
                <br />
                {!playable ? 'Please wait...' : ''}
                <br />
                <button
                    disabled={!playable}
                    onClick={() => parent.playHand(0)}
                >0</button>
                <button
                    disabled={!playable}
                    onClick={() => parent.playHand(1)}
                >1</button>
                <button
                    disabled={!playable}
                    onClick={() => parent.playHand(2)}
                >2</button>
                <button
                    disabled={!playable}
                    onClick={() => parent.playHand(3)}
                >3</button>
                <button
                    disabled={!playable}
                    onClick={() => parent.playHand(4)}
                >4</button>
                <button
                    disabled={!playable}
                    onClick={() => parent.playHand(5)}
                >5</button>
            </div>
        );
    }
}

exports.GetHand = class extends React.Component {
    render() {
        const { parent, playable, hand } = this.props;
        return (
            <div>
                <br />
                {!playable ? 'Please wait...' : ''}
                <br />
                <button
                    disabled={!playable}
                    onClick={() => parent.sendGuess(0)}
                >0</button>
                <button
                    disabled={!playable}
                    onClick={() => parent.sendGuess(1)}
                >1</button>
                <button
                    disabled={!playable}
                    onClick={() => parent.sendGuess(2)}
                >2</button>
                <button
                    disabled={!playable}
                    onClick={() => parent.sendGuess(3)}
                >3</button>
                <button
                    disabled={!playable}
                    onClick={() => parent.sendGuess(4)}
                >4</button>
                <button
                    disabled={!playable}
                    onClick={() => parent.sendGuess(5)}
                >5</button>
                <button
                    disabled={!playable}
                    onClick={() => parent.sendGuess(6)}
                >6</button>
                <button
                    disabled={!playable}
                    onClick={() => parent.sendGuess(7)}
                >7</button>
                <button
                    disabled={!playable}
                    onClick={() => parent.sendGuess(8)}
                >8</button>
                <button
                    disabled={!playable}
                    onClick={() => parent.sendGuess(9)}
                >9</button>
                <button
                    disabled={!playable}
                    onClick={() => parent.sendGuess(10)}
                >10</button>
            </div>
        );
    }
}

exports.WaitingForResults = class extends React.Component {
    render() {
        return (
            <div>
                Waiting for results...
            </div>
        );
    }
}

exports.Done = class extends React.Component {
    render() {
        const { outcome } = this.props;
        return (
            <div>
                Thank you for playing. The outcome of this game was:
                <br />{outcome || 'Unknown'}
            </div>
        );
    }
}

exports.Timeout = class extends React.Component {
    render() {
        return (
            <div>
                There's been a timeout. (Someone took too long.)
            </div>
        );
    }
}

export default exports;