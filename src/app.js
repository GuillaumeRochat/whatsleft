import React from 'react';
import moment from 'moment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import { Line, Circle } from 'rc-progress';
import numeral from 'numeral';

const TITLE = 'What\'s Left';

export default class App extends React.Component {

    constructor(...args) {
        super(...args);

        this.state = {
            birthdate: null,
            life_expectancy: 90,
        };
    }

    handleChange(key, value) {
        this.setState({
            [key]: value,
        });
    }

    calculate() {
        const now = moment();
        const birth = moment(this.state.birthdate);
        const death = moment(this.state.birthdate).add(this.state.life_expectancy, 'years');
        this.setState({ now, birth, death });
    }

    showStats() {
        return (
            <div>
                <div>Seconds : {numeral(this.state.now.diff(this.state.birth, 'seconds')).format('0,0')}/{numeral(this.state.death.diff(this.state.birth, 'seconds')).format('0,0')}</div>
                <div>Hours : {numeral(this.state.now.diff(this.state.birth, 'hours')).format('0,0')}/{numeral(this.state.death.diff(this.state.birth, 'hours')).format('0,0')}</div>
                <div>Days : {numeral(this.state.now.diff(this.state.birth, 'days')).format('0,0')}/{numeral(this.state.death.diff(this.state.birth, 'days')).format('0,0')}</div>
                <div>Months : {numeral(this.state.now.diff(this.state.birth, 'months')).format('0,0')}/{numeral(this.state.death.diff(this.state.birth, 'months')).format('0,0')}</div>
                <div>Years : {this.state.now.diff(this.state.birth, 'years')}/{this.state.death.diff(this.state.birth, 'years')}</div>
                <div style={{ margin: '20px', width: '200px', textAlign: 'center' }}>
                    <Line percent={(this.state.now.diff(this.state.birth) / this.state.death.diff(this.state.birth)) * 100} trailWidth="2" strokeWidth="2" strokeColor="#2db" />
                    <Circle percent={(this.state.now.diff(this.state.birth) / this.state.death.diff(this.state.birth)) * 100} trailWidth="2" strokeWidth="2" strokeColor="#2db" />
                    <Circle percent={(this.state.now.diff(this.state.birth) / this.state.death.diff(this.state.birth)) * 100} trailWidth="2" strokeWidth="2" strokeColor="#2db" gapDegree="180" gapPosition="bottom" />
                </div>
            </div>
        );
    }

    render() {
        return (
            <MuiThemeProvider>
                <div style={{ textAlign: 'center' }}>
                    <h1>{TITLE}</h1>
                    <DatePicker floatingLabelText="Birthdate" openToYearSelection value={this.state.birthdate} onChange={(event, date) => this.handleChange('birthdate', date)} />
                    <br />
                    <TextField floatingLabelText="Life Expectancy" value={this.state.life_expectancy} onChange={e => this.handleChange('life_expectancy', e.target.value)} />
                    <br />
                    <RaisedButton label="Calculate" primary style={{ margin: '20px' }} onClick={() => this.calculate()} />
                    <br />
                    <Divider />
                    <br />
                    {this.state.birth ? this.showStats() : ''}
                </div>
            </MuiThemeProvider>
        );
    }
}
