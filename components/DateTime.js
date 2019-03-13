import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';


/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({});


/* DateTime
============================================================================= */

class DateTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
    };
  }

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: !this.state.isDateTimePickerVisible });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = (date) => {
    // this.setState({ date.getTime() } });
    console.log('handle date', date, date.getTime());

    const { onChange } = this.props;
    onChange(date.getTime());
    this.hideDateTimePicker();
  }

  render() {
    const { date } = this.props;
    const { isDateTimePickerVisible } = this.state;

    const dateObj = new Date(date);
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const weekDay = weekdays[dateObj.getDay()];
    const month = months[dateObj.getMonth()];
    const dateString = `${weekDay}, ${dateObj.getDate()} ${month}, ${dateObj.getFullYear()}`;
    const minutes = (`0${dateObj.getMinutes()}`).slice(-2);
    const timeString = `${dateObj.getHours()}:${minutes}`;

    return (
      <View>
        <TouchableOpacity onPress={this.showDateTimePicker}>
          <Text>Date : {dateString} - {timeString}</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          date={dateObj}
          is24Hour
          mode="datetime"
          onCancel={this.hideDateTimePicker}
        />
      </View>
    );
  }
}

export default DateTime;
