import React, {Component} from 'react';
import { View, Text, TextInput } from 'react-native';
import request from 'superagent';

export default class Landing extends Component {
	constructor() {
		super();
		this.state = {
			data: null,
			city: ''
		};
	}

	onChangeText(text) {
		if (text.length) {
			this.setState({city: text});
		} else {
			this.setState({data: null, city: text});
		}
	}

	requestCity(city) {
		request
			.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=68239341aad8ab678837d460a8cac124`)
			.end((err, res) => {
				if (err) throw err;
				this.setState({data: res, lastCity: city});
			});
	}

	render() {
		const {data, city, lastCity} = this.state;
		const curTempString = data ? `The current temperature in ${lastCity} is ${Math.ceil(data.body.main.temp - 273.15)} degrees celcius` : null;
		return (
			<View>
				<TextInput
					style={{minWidth: 200, padding: 10}}
					value={city}
					placeholder={'Enter a city name'}
					onChangeText={(text) => this.onChangeText(text)}
					onBlur={() => this.requestCity(city)} />
				<Text>{curTempString}</Text>
			</View>
		);
	}
}