import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import db from '../Config';

class SummaryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      present_students: [],
      absent_students: [],
    };
  }

  getTodaysDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = dd + '-' + mm + '-' + yyyy;
    return today;
  }
  resetDb = () => {
    console.log('Data Resetted !!');
    var restDatabase = db.ref('/').set({
      '01': {
        name: 'Demarcus',
        roll_no: 1,
      },
      '02': {
        name: 'Sarah',
        roll_no: 2,
      },
      '03': {
        name: 'Mark',
        roll_no: 3,
      }, 
      '04' : {

        name: 'Jose', 
        roll_no: 4, 

      },
      '05' : {

        name: 'Grace', 
        roll_no: 5, 

      },
      '06' : {

        name: 'Emma', 
        roll_no: 6, 

      }
    });
  };
  componentDidMount = async () => {
    var today = await this.getTodaysDate();

    var students_ref = db.ref('/').on('value', (data) => {
      var class_a = data.val();
      var present_students = [];
      var absent_students = [];
      for (var i in class_a) {
        if (class_a[i][today] === 'present') {
          present_students.push(class_a[i]);
        }
        if (class_a[i][today] === 'absent') {
          absent_students.push(class_a[i]);
        }
      }

      present_students.sort(function (a, b) {
        return a.roll_no - b.roll_no;
      });

      absent_students.sort(function (a, b) {
        return a.roll_no - b.roll_no;
      });

      this.setState({
        present_students: present_students,
        absent_students: absent_students,
      });
    });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#eeaa00' }}>
        <View style={{ flex: 0 }}></View>
        <Text style={styles.title}>Student List</Text>
        <View style={styles.presentContainer}>
         {this.state.present_students.map((student, index) => (
         <Text style={{ fontSize: 18, fontFamily: 'Comic Sans MS', color: 'green' }}>
        {student.name}
          </Text>
          ))}
        </View>

        <View style={styles.absentContainer}>
          {this.state.absent_students.map((student, index) => (
        <Text style={{ fontSize: 18, fontFamily: 'Comic Sans MS', color: '#ffffff'}}>
         {student.name}
        </Text>
          ))}
        </View>
        <View
          style={{
            marginTop: 30,
            flex: 0.1,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Text
            style={{
              fontFamily: 'Comic Sans MS',
              fontSize: 15,
              marginBottom: 50,
            }}>
            Total Students Present: {this.state.present_students.length}
          </Text>
          <Text style={{ fontFamily: 'Comic Sans MS', fontSize: 15 }}>
            Total Students Absent: {this.state.absent_students.length}
          </Text>
        </View>
        <Button
          title="REDO attendance"
          color="purple"
          style={{ width: 100, height: 100 }}
          onPress={this.resetDb}
        />

      <View >
        <Button title = "go back" 
          color="blue"
          style={{ width: 100, height: 100 }}

          onPress={() => {
            this.props.navigation.navigate('HomeScreen');
          }} >
          
        </Button>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  presentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#65F700'
  },
  absentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
    backgroundColor: '#ff0000'
  },

  title: {
    width: 350,
    height: 50,
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center', 
    marginTop: 10,
    fontFamily: 'times',

  },
});

export default SummaryScreen;
