Week 5 - Lab - Weather 🌦️⛅☀️
Introduction 🌟
Let's build a weather app 📱 using React Native & Expo. Our app will help users determine what to wear 🕶🌂🧥 in their city 🏙 and other cities around the world 🌎!

pwd

Features 🎯🥇🏆
[ ] User is prompted to give permission for our app to use their location if they haven't already given us permission.
[ ] User can see a locations fahrenheit & celsius temperature, description, & windspeed.
[ ] User can see an appropriate icon depending on the weather conditions.
[ ] User can see a background appropriate for the type of weather in their current location.
[ ] User can see an icon appropriate for the type of their weather in a location.
[ ] User can see buttons which allow them to see weather of different cities.
[ ] User can see a randomly generated image of that city.
[ ] User can see their current locations weather again with a "Current Location" button.
Learning Objectives ✍️📚📝
Learn how to fetch() data from an API.
Recognize data fetching takes time.
fetch() - Used to make requests to API.
The 1st argument is the api endpoint we're fetching data from.
json() - Used to parse to JS object.
Learn what async & await are used for. Read more detailed async & await.
Recognize they're used to make asynchronous.
async - Tells JS that a function is asynchronous.
await - Tells JS that this line will take a few moments.
Learn what try & catch are used for.
Recognize they're when we need to be careful because our code may fail. An example is an api request. There are other use cases.
Tip 💡: The permissions module of Expo is buggy. You may need to do this exercise on a device using the iOS/Android clients.

Class based way
Milestone 1 🛣🏃 Set up app, styling, & some default city data
A) Use expo init command to create a new project. I'm calling mine rn-weather.

pwd

B) Add styles to App.js.

Replace the boiler plate styles with something custom.

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "black"
  },
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  weatherContainer: {
    padding: 20,
    width: "90%",
    borderWidth: 1,
    maxWidth: "90%",
    minHeight: "20%",
    marginTop: "70%",
    borderRadius: 25,
    marginBottom: "2%",
    borderColor: "white",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  text: {
    fontSize: 20,
    color: "white",
    marginLeft: 10,
    fontWeight: "bold"
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  cityContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  cityName: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  cityButton: {
    margin: 3,
    height: 40,
    padding: 3,
    width: "25%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  tempRow: {
    alignSelf: "center",
    flexDirection: "row"
  },
  locationText: {
    fontSize: 25,
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  currentLocation: {
    margin: 3,
    height: 40,
    padding: 3,
    width: "72.5%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(20,33,61,0.6)"
  }
});
C) Create a new folder in the root of your project ./utils

D) Create a file in this folder called index.js.

E) Copy the content this file into the ./utils/index.js file we just created.

This file will contain some utility functions & data for our components to use.

Milestone 2 🛣🏃 Let's work on getting some data and having that data effect our App's state
A) Change App component to Class based component

B) Import two new modules from expo we havent used yet.

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
C) Set default loading state in App's constructor.

constructor(props) {
   super(props)
   this.state = {
      loading: true
   }
}
We want to get the user's current location immediately when the app loads so we'll set the initial value to true.

D) Add componentDidMount life cycle method that call getLocationAsync method inside it body:

componentDidMount() {
  this.getLocationAsync();
}
E) Define the asynchronous function getLocationAsync we called in our componentDidMount. The reason this function is asynchronous is because we don't know how long it'll take for the user to press the Allow button. This getLocationAsync will check the LOCATION permission the user has granted us and call another function, getWeather, if allowed.

getLocationAsync = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    return;
  }

  const location = await Location.getCurrentPositionAsync();
  this.getWeather(location.coords.latitude, location.coords.longitude);
};
Tip 💡: It's ok to hardcode the current location in our getWeather request in order to use the simulator if you can't press the Allow button due to a bug.

this.getWeather(10.817141, 106.707954);
We should now see a prompt when the app loads
pwd

F) Define the function getWeather we call in the body of getLocationAsync.

getWeather = (latitude, longitude, imgUrl = "") => {
    this.setState({ loading: true }, async () => {
      const API_KEY = "3de6162d3745365b168ade2bbe4e1d66";
      const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
      try {
        const response = await fetch(api);
        const jsonData = await response.json();
        this.setState({ location: { ...jsonData, imgUrl }, loading: false})
      } catch (error) {
        this.setState({ error: true, loading: false})
      }
    })
  };
This function, getWeather, takes three arguments. It calls the Open Weather Api using fetch.

You may need to sign up for a new API key to use it
We pass it two default arguments latitude & longitude. There is a 3rd optional argument imgUrl we'll use shortly.

There's a lot going on here so let's take it one line at a time.

We set our apps state to loading.
We then define an API_KEY to request data.
We use the key and the arguments latitude & longitude to define a request url.
We wrap the following lines of code in a try & catch. If the code inside of the try fails, the code within the catch's body will execute.
We await and fetch the data.
We Parse the response to json.
We then spread the response object's data into a new object that includes imgUrl. This object is set as a location piece of state.
Lastly, we setLoading to false.
F) Add a new piece of state location

We give it a initial value of a relatively complicated object because this is the exact data we expect to receive from the API.

this.state = {
  ...,
  location: {
     name: "",
     main: { temp: "" },
     wind: { speed: "" },
     weather: [{ main: "", description: "" }]
  }
};
G) Add a console.log above the return to check what location is.

pwd

We should now see that when the app loads we successfully fetch some data, excellent
In conjunction, if we purposefully fail the request, we see that the catch executes.

Milestone 3 🛣🏃 Display Weather Data
A) Define a WeatherCard component above our App component which will render the data about the weather.

This component determine temperatureC & temperatureF based on the prop location given to it.
It will capitalizie the description of the weather description in the location prop.
It will show a Loading component if the loading prop given to it is true.
It will render an appropriate icon based on the weather conditions of the location.
**Weather Card Component

const WeatherCard = ({ location, error, loading }) => {
  const temperatureC = (location.main.temp - 273.15).toFixed(2);
  const temperatureF = (((location.main.temp - 273.15) * 9) / 5 + 32).toFixed(
    2
  );
  const description = location.weather[0].description;
  const windSpeed = location.wind.speed;
  const icon = location.weather[0].main;

  const capitalizedDescription =
    description && description.charAt(0).toUpperCase() + description.slice(1);

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error fetching weather!</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.weatherContainer}>
        {loading && <Loading />}
        <View style={styles.row}>
          <MaterialIcons name="location-city" size={25} color="lightgrey" />
          <Text style={styles.locationText}>{location.name}</Text>
        </View>
        <View style={[styles.row, { marginTop: 10 }]}>
          <MaterialCommunityIcons
            size={25}
            color="lightgrey"
            name="speedometer"
          />
          <Text style={styles.text}>{windSpeed}</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons
            size={25}
            color="lightgrey"
            name={getWeatherIcon(icon)}
          />
          <Text style={styles.text}>{capitalizedDescription}</Text>
        </View>

        <View style={styles.tempRow}>
          <View style={styles.row}>
            <MaterialCommunityIcons
              size={25}
              color="lightgrey"
              name="temperature-fahrenheit"
            />
            <Text style={styles.text}>{temperatureF}</Text>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons
              size={25}
              color="lightgrey"
              name="temperature-celsius"
            />
            <Text style={styles.text}>{temperatureC}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
B) Update imports to grab additional components we need in WeatherCard. We need the MaterialIcons, MaterialCommunityIcons & ActivityIndicator.

import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
C) Import some dependencies from the utils folder we created earlier.

import { CITIES, getWeatherBackgroundImage, getWeatherIcon } from "./utils";
D) Define two new functions to export from the ./utils/index.js file, getWeatherBackgroundImage & getWeatherIcon.

getWeatherBackgroundImage() will choose an appropriate background based on the location's weather summary.
getWeatherIcon() will choose an appropriate icon based on the location's weather summary.
export const getWeatherBackgroundImage = description => {
  switch (description) {
    case "Thunderstorm":
      return "https://s4827.pcdn.co/wp-content/uploads/2014/06/Great-Thunderstorm-In-City.jpg";
    case "Drizzle":
      return "https://wallpapercave.com/wp/wp2967431.jpg";
    case "Rain":
      return "http://mybestphonewallpapers.com/download/blue-rain-6651.jpg";
    case "Snow":
      return "http://www.123mobilewallpapers.com/wp-content/uploads/2014/06/snow_way_wallpaper.jpg";
    case "Atmosphere":
      return "https://i.pinimg.com/originals/fe/a4/13/fea4139613ef14a56a13eef545284a58.jpg";
    case "Clouds":
      return "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
    case "Clear":
      return "http://www.hdiphone6pluswallpaper.com/wp-content/uploads/Sky/Sky%20iPhone%206%20Plus%20Wallpaper%2037.jpg";
    default:
      return "https://i.pinimg.com/736x/49/43/da/4943da7fd8edd6af16500b2d957dbc9a.jpg";
  }
};

export const getWeatherIcon = description => {
  switch (description) {
    case "Clear":
      return "weather-sunny";
    case "Clouds":
      return "weather-cloudy";
    case "Drizzle":
    case "shower drizzle":
      return "weather-rainy";
    case "Rain":
      return "weather-pouring";
    case "Thunderstorm":
      return "weather-lightning";
    case "Snow":
      return "weather-snowy";
    default:
      return "vanish";
  }
};
E) Define the Loading component above our WeatherCard component which is used init.

const Loading = () => (
  <View style={styles.loading}>
    <ActivityIndicator />
  </View>
);
F) Render the WeatherCard component in the return of App. Pass it the props it expects.

  render() {
    return (
      <View style={styles.bg}>
        <WeatherCard error={this.state.error} loading={this.state.loading} location={this.state.location} />
      </View>
    );
  }
pwd

Key Points 🔑📝

fetch is used to request data from an api among other things.
Async functions begin with a async and have an await on lines which take a few moments.

When code can fail, it's useful to have a try & catch handle the failure.

Milestone 3 🛣🏃 Add current & city location selection
Our app isn't that interesting with one location, let's add a few more that a user can choose to select.

A) Define a new component, CitySelectionButtons, which will map over our CITIES data and render a button for each city.

const CitySelectionButtons = props => (
  <View style={styles.cityContainer}>
    <TouchableOpacity
      key="currentLocation"
      style={styles.currentLocation}
      onPress={() => props.onChooseCity("")}
    >
      <Text style={styles.cityName}>Current Location</Text>
    </TouchableOpacity>
    {CITIES.map(city => {
      return (
        <TouchableOpacity
          key={city.name}
          style={styles.cityButton}
          onPress={() => props.onChooseCity(city.name)}
        >
          <Text style={styles.cityName}>{city.name}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);
B) Define a new function in the body of App, onChooseCity, which will handle fetching data for a location.

 onChooseCity = name => {
  let randImg = "";
  if (name !== "") {
    const city = CITIES.find(city => city.name === name);
    randImg = city.imgUrl[Math.floor(Math.random() * city.imgUrl.length)];
    this.getWeather(city.latitude, city.longitude, randImg);
  } else {
    this.getLocationAsync();
  }
};
C) Define a new constant above the return of App, bgImage, which will handle selecting an appropriate background based on the user's choice.

render() {
    const bgImage = {
      uri: this.state.location.imgUrl || getWeatherBackgroundImage(this.state.location.weather[0].main)
    }

    return (
      <ImageBackground source={bgImage} style={styles.bg}>
        <WeatherCard error={this.state.error} loading={this.state.loading} location={this.state.location} />
        <CitySelectionButtons onChooseCity={this.onChooseCity} />
      </ImageBackground>
    );
  }
D) Import two new components, ImageBackground & TouchableOpacity, from React Native.

import { ImageBackground, TouchableOpacity } from "react-native";
E) Refactor our App component's return to use the ImageBackground, WeatherCard, & CitySelectionButtons components. Pass them their appropriate props.

pwd

We should now be able to see all the behavior we were planning on implementing, amazing
Review 💻🤓🤔
Defining a large component to a few smaller components to handle some of the logic in our app makes our code easier to read and understand.
Hardcoding data for demonstration doesn't make us bad developers.
Accomplishments 🥇🏆💯
[x] User is prompted to give permission for our app to use their location if they haven't already given us permission.
[x] User can see a locations fahrenheit & celsius temperature, description, & windspeed.
[x] User can see an appropriate icon depending on the weather conditions.
[x] User can see a background appropriate for the type of weather in their current location.
[x] User can see an icon appropriate for the type of their weather in a location.
[x] User can see buttons which allow them to see weather of different cities.
[x] User can see a randomly generated image of that city.
[x] User can see their current locations weather again with a "Current Location" button.
Rockets 🚀
[ ] User will see app theme colors based on temperature of the location(blue for code, orange for warm, red for hot)
Hooked way
Week 5 - Lab - Weather 🌦️⛅☀️
Introduction 🌟
Let's build a weather app 📱 using React Native & Expo. Our app will help users determine what to wear 🕶🌂🧥 in their city 🏙 and other cities around the world 🌎!

pwd

Features 🎯🥇🏆
[ ] User is prompted to give permission for our app to use their location if they haven't already given us permission.
[ ] User can see a locations fahrenheit & celsius temperature, description, & windspeed.
[ ] User can see an appropriate icon depending on the weather conditions.
[ ] User can see a background appropriate for the type of weather in their current location.
[ ] User can see an icon appropriate for the type of their weather in a location.
[ ] User can see buttons which allow them to see weather of different cities.
[ ] User can see a randomly generated image of that city.
[ ] User can see their current locations weather again with a "Current Location" button.
Learning Objectives ✍️📚📝
Learn how to fetch() data from an API.
Recognize data fetching takes time.
fetch() - Used to make requests to API.
The 1st argument is the api endpoint we're fetching data from.
json() - Used to parse to JS object.
Learn what async & await are used for. Read more detailed async & await.
Recognize they're used to make asynchronous.
async - Tells JS that a function is asynchronous.
await - Tells JS that this line will take a few moments.
Learn what try & catch are used for.
Recognize they're when we need to be careful because our code may fail. An example is an api request. There are other use cases.
Tip 💡: The permissions module of Expo is buggy. You may need to do this exercise on a device using the iOS/Android clients.

Milestone 1 🛣🏃 Set up app, styling, & some default city data
A) Use expo init command to create a new project. I'm calling mine rn-weather.

pwd

B) Add styles to App.js.

Replace the boiler plate styles with something custom.

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "black"
  },
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  weatherContainer: {
    padding: 20,
    width: "90%",
    borderWidth: 1,
    maxWidth: "90%",
    minHeight: "20%",
    marginTop: "70%",
    borderRadius: 25,
    marginBottom: "2%",
    borderColor: "white",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  text: {
    fontSize: 20,
    color: "white",
    marginLeft: 10,
    fontWeight: "bold"
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  cityContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  cityName: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  cityButton: {
    margin: 3,
    height: 40,
    padding: 3,
    width: "25%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  tempRow: {
    alignSelf: "center",
    flexDirection: "row"
  },
  locationText: {
    fontSize: 25,
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  currentLocation: {
    margin: 3,
    height: 40,
    padding: 3,
    width: "72.5%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(20,33,61,0.6)"
  }
});
C) Create a new folder in the root of your project ./utils

D) Create a file in this folder called index.js.

E) Copy the content this file into the ./utils/index.js file we just created.

This file will contain some utility functions & data for our components to use.

Milestone 2 🛣🏃 Let's work on getting some data and having that data effect our App's state
A) Import two new modules from expo we havent used yet.

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
B) Set default loading state in App's body.

const [loading, setLoading] = useState(true);
constructor(props) {
   super(props)
   this.state = {
      loading: true
   }
}
We want to get the user's current location immediately when the app loads so we'll set the initial value to true.

D) Define the componentDidMount life cycle method of App with a function call this.getLocationAsync() in it's body.

componentDidMount() {
   this.getLocationAsync()
}
E) Define the asynchronous function getLocationAsync we called in our useEffect. The reason this function is asynchronous is because we don't know how long it'll take for the user to press the Allow button. This getLocationAsync will check the LOCATION permission the user has granted us and call another function, getWeather, if allowed.

getLocationAsync = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    return;
  }

  const location = await Location.getCurrentPositionAsync();
  this.getWeather(location.coords.latitude, location.coords.longitude);
};
Tip 💡: It's ok to hardcode the current location in our getWeather request in order to use the simulator if you can't press the Allow button due to a bug.

this.getWeather(10.817141, 106.707954);
We should now see a prompt when the app loads
pwd

F) Add new boolean state error in the constructor.

this.state = {
   loading: true,
   error: false,
}
G) Define the function getWeather we call in the body of getLocationAsync.

getWeather = async (latitude, longitude, imgUrl = "") => {
    const API_KEY = "3de6162d3745365b168ade2bbe4e1d66";
    const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    try {
      const response = await fetch(api);
      const jsonData = await response.json();
      currentLocation = { ...jsonData, imgUrl };
      this.setState({ location: currentLocation, loading: false })
    } catch (error) {
      this.setState({ error: true, loading: false });
    }
This function, getWeather, takes three arguments. It calls the Open Weather Api using fetch.

You may need to sign up for a new API key to use it
We pass it two default arguments latitude & longitude. There is a 3rd optional argument imgUrl we'll use shortly.

There's a lot going on here so let's take it one line at a time.

We then define an API_KEY to request data.
We use the key and the arguments latitude & longitude to define a request url.
We wrap the following lines of code in a try & catch. If the code inside of the try fails, the code within the catch's body will execute.
We await and fetch the data.
We Parse the response to json.
We then spread the response object's data into a new object that includes imgUrl. This object is set as a location piece of state.
Lastly, we handle the error with setting the error state to true when catch run, we setLoading to false in both case.
F) Add a new piece of state location.

We give it a initial value of a relatively complicated object because this is the exact data we expect to receive from the API.

this.state = {
   loading: true,
   error: false,
   location: {
     name: "",
     main: { temp: "" },
     wind: { speed: "" },
     weather: [{ main: "", description: "" }]
   }
}
G) Add a console.log in the render method to check what location is.

pwd

We should now see that when the app loads we successfully fetch some data, excellent
In conjunction, if we purposefully fail the request, we see that the catch executes.

Milestone 3 🛣🏃 Display Weather Data
A) Define a WeatherCard component above our App component which will render the data about the weather.

This component determine temperatureC & temperatureF based on the prop location given to it.
It will capitalizie the description of the weather description in the location prop.
It will show a Loading component if the loading prop given to it is true.
It will render an appropriate icon based on the weather conditions of the location.
Weather Card Component
B) Update imports to grab additional components we need in WeatherCard. We need the MaterialIcons, MaterialCommunityIcons & ActivityIndicator.

import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
C) Import some dependencies from the utils folder we created earlier.

import { CITIES, getWeatherBackgroundImage, getWeatherIcon } from "./utils";
D) Define two new functions to export from the ./utils/index.js file, getWeatherBackgroundImage & getWeatherIcon.

getWeatherBackgroundImage() will choose an appropriate background based on the location's weather summary.
getWeatherIcon() will choose an appropriate icon based on the location's weather summary.
export const getWeatherBackgroundImage = description => {
  switch (description) {
    case "Thunderstorm":
      return "https://s4827.pcdn.co/wp-content/uploads/2014/06/Great-Thunderstorm-In-City.jpg";
    case "Drizzle":
      return "https://wallpapercave.com/wp/wp2967431.jpg";
    case "Rain":
      return "http://mybestphonewallpapers.com/download/blue-rain-6651.jpg";
    case "Snow":
      return "http://www.123mobilewallpapers.com/wp-content/uploads/2014/06/snow_way_wallpaper.jpg";
    case "Atmosphere":
      return "https://i.pinimg.com/originals/fe/a4/13/fea4139613ef14a56a13eef545284a58.jpg";
    case "Clouds":
      return "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
    case "Clear":
      return "http://www.hdiphone6pluswallpaper.com/wp-content/uploads/Sky/Sky%20iPhone%206%20Plus%20Wallpaper%2037.jpg";
    default:
      return "https://i.pinimg.com/736x/49/43/da/4943da7fd8edd6af16500b2d957dbc9a.jpg";
  }
};

export const getWeatherIcon = description => {
  switch (description) {
    case "Clear":
      return "weather-sunny";
    case "Clouds":
      return "weather-cloudy";
    case "Drizzle":
    case "shower drizzle":
      return "weather-rainy";
    case "Rain":
      return "weather-pouring";
    case "Thunderstorm":
      return "weather-lightning";
    case "Snow":
      return "weather-snowy";
    default:
      return "vanish";
  }
};
E) Define the Loading component above our WeatherCard component which is used init.

const Loading = () => (
  <View style={styles.loading}>
    <ActivityIndicator />
  </View>
);
F) Render the WeatherCard component in the return of App. Pass it the props it expects.

render() {
    const { error, loading, location } = this.state

    return (
      <View style={styles.bg}>
        <WeatherCard error={error} loading={loading} location={location} />
      </View>
    );
  }
pwd

Key Points 🔑📝

fetch is used to request data from an api among other things.
Async functions begin with a async and have an await on lines which take a few moments.

When code can fail, it's useful to have a try & catch handle the failure.

Milestone 3 🛣🏃 Add current & city location selection
Our app isn't that interesting with one location, let's add a few more that a user can choose to select.

A) Define a new component, CitySelectionButtons, which will map over our CITIES data and render a button for each city.

const CitySelectionButtons = props => (
  <View style={styles.cityContainer}>
    <TouchableOpacity
      key="currentLocation"
      style={styles.currentLocation}
      onPress={() => props.onChooseCity("")}
    >
      <Text style={styles.cityName}>Current Location</Text>
    </TouchableOpacity>
    {CITIES.map(city => {
      return (
        <TouchableOpacity
          key={city.name}
          style={styles.cityButton}
          onPress={() => props.onChooseCity(city.name)}
        >
          <Text style={styles.cityName}>{city.name}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);
B) Define a new function in the body of App, onChooseCity, which will handle fetching data for a location.

onChooseCity = name => {
  let randImg = "";
  if (name !== "") {
    const city = CITIES.find(city => city.name === name);
    randImg = city.imgUrl[Math.floor(Math.random() * city.imgUrl.length)];
    getWeather(city.latitude, city.longitude, randImg);
  } else {
    this.getLocationAsync();
  }
};
C) get the imgUrl property from location state, which will handle selecting an appropriate background based on the user's choice.

render() {
 const { error, loading, location } = this.state
 return (
   <ImageBackground source={{ uri: location.imgUrl }} style={styles.bg}>
     <WeatherCard location={location} error={error} loading={loading} />
     <CitySelectionButtons onChooseCity={this.onChooseCity} />
   </ImageBackground>
 );
}
D) Import two new components, ImageBackground & TouchableOpacity, from React Native.

import { ImageBackground, TouchableOpacity } from "react-native";
E) Refactor our App component's return to use the ImageBackground, WeatherCard, & CitySelectionButtons components. Pass them their appropriate props.

pwd

We should now be able to see all the behavior we were planning on implementing, amazing
Hook based way
Milestone 1 🛣🏃 Set up app, styling, & some default city data
A) Use expo init command to create a new project. I'm calling mine rn-weather.

pwd

B) Add styles to App.js.

Replace the boiler plate styles with something custom.

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "black"
  },
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  weatherContainer: {
    padding: 20,
    width: "90%",
    borderWidth: 1,
    maxWidth: "90%",
    minHeight: "20%",
    marginTop: "70%",
    borderRadius: 25,
    marginBottom: "2%",
    borderColor: "white",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  text: {
    fontSize: 20,
    color: "white",
    marginLeft: 10,
    fontWeight: "bold"
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  cityContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  cityName: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  cityButton: {
    margin: 3,
    height: 40,
    padding: 3,
    width: "25%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  tempRow: {
    alignSelf: "center",
    flexDirection: "row"
  },
  locationText: {
    fontSize: 25,
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  currentLocation: {
    margin: 3,
    height: 40,
    padding: 3,
    width: "72.5%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(20,33,61,0.6)"
  }
});
C) Create a new folder in the root of your project ./utils

D) Create a file in this folder called index.js.

E) Copy the content this file into the ./utils/index.js file we just created.

This file will contain some utility functions & data for our components to use.

Milestone 2 🛣🏃 Let's work on getting some data and having that data effect our App's state
A) Import useState & useEffect from React.

import React, { useEffect, useState } from "react";
B) Import two new modules from expo we havent used yet.

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
C) Set default loading state in App's body.

const [loading, setLoading] = useState(true);
We want to get the user's current location immediately when the app loads so we'll set the initial value to true.

D) Define the useEffect method of App with a function call getLocationAsync() in it's body. The second argument means we want this effect to run once.

useEffect(() => {
  getLocationAsync();
}, []);
E) Define the asynchronous function getLocationAsync we called in our useEffect. The reason this function is asynchronous is because we don't know how long it'll take for the user to press the Allow button. This getLocationAsync will check the LOCATION permission the user has granted us and call another function, getWeather, if allowed.

getLocationAsync = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    return;
  }

  const location = await Location.getCurrentPositionAsync();
  getWeather(location.coords.latitude, location.coords.longitude);
};
Tip 💡: It's ok to hardcode the current location in our getWeather request in order to use the simulator if you can't press the Allow button due to a bug.

getWeather(10.817141, 106.707954);
We should now see a prompt when the app loads
pwd

F) Define the function getWeather we call in the body of getLocationAsync.

getWeather = async (latitude, longitude, imgUrl = "") => {
  setLoading(true);
  const API_KEY = "3de6162d3745365b168ade2bbe4e1d66";
  const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

  try {
    const response = await fetch(api);
    const jsonData = await response.json();
    setLocation({ ...jsonData, imgUrl });
  } catch (error) {
    setError(true);
  }
  setLoading(false);
};
This function, getWeather, takes three arguments. It calls the Open Weather Api using fetch.

You may need to sign up for a new API key to use it
We pass it two default arguments latitude & longitude. There is a 3rd optional argument imgUrl we'll use shortly.

There's a lot going on here so let's take it one line at a time.

We set our apps state to loading.
We then define an API_KEY to request data.
We use the key and the arguments latitude & longitude to define a request url.
We wrap the following lines of code in a try & catch. If the code inside of the try fails, the code within the catch's body will execute.
We await and fetch the data.
We Parse the response to json.
We then spread the response object's data into a new object that includes imgUrl. This object is set as a location piece of state.
Lastly, we setLoading to false.
F) Add a new piece of state location and it's setter method, setLocation in App's body.

We give it a initial value of a relatively complicated object because this is the exact data we expect to receive from the API.

const [location, setLocation] = useState({
  name: "",
  main: { temp: "" },
  wind: { speed: "" },
  weather: [{ main: "", description: "" }]
});
G) Add a console.log above the return to check what location is.

pwd

We should now see that when the app loads we successfully fetch some data, excellent
In conjunction, if we purposefully fail the request, we see that the catch executes.

Milestone 3 🛣🏃 Display Weather Data
A) Define a WeatherCard component above our App component which will render the data about the weather.

This component determine temperatureC & temperatureF based on the prop location given to it.
It will capitalizie the description of the weather description in the location prop.
It will show a Loading component if the loading prop given to it is true.
It will render an appropriate icon based on the weather conditions of the location.
**Weather Card Component

const WeatherCard = ({ location, error, loading }) => {
  const temperatureC = (location.main.temp - 273.15).toFixed(2);
  const temperatureF = (((location.main.temp - 273.15) * 9) / 5 + 32).toFixed(
    2
  );
  const description = location.weather[0].description;
  const windSpeed = location.wind.speed;
  const icon = location.weather[0].main;

  const capitalizedDescription =
    description && description.charAt(0).toUpperCase() + description.slice(1);

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error fetching weather!</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.weatherContainer}>
        {loading && <Loading />}
        <View style={styles.row}>
          <MaterialIcons name="location-city" size={25} color="lightgrey" />
          <Text style={styles.locationText}>{location.name}</Text>
        </View>
        <View style={[styles.row, { marginTop: 10 }]}>
          <MaterialCommunityIcons
            size={25}
            color="lightgrey"
            name="speedometer"
          />
          <Text style={styles.text}>{windSpeed}</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons
            size={25}
            color="lightgrey"
            name={getWeatherIcon(icon)}
          />
          <Text style={styles.text}>{capitalizedDescription}</Text>
        </View>

        <View style={styles.tempRow}>
          <View style={styles.row}>
            <MaterialCommunityIcons
              size={25}
              color="lightgrey"
              name="temperature-fahrenheit"
            />
            <Text style={styles.text}>{temperatureF}</Text>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons
              size={25}
              color="lightgrey"
              name="temperature-celsius"
            />
            <Text style={styles.text}>{temperatureC}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
B) Update imports to grab additional components we need in WeatherCard. We need the MaterialIcons, MaterialCommunityIcons & ActivityIndicator.

import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
C) Import some dependencies from the utils folder we created earlier.

import { CITIES, getWeatherBackgroundImage, getWeatherIcon } from "./utils";
D) Define two new functions to export from the ./utils/index.js file, getWeatherBackgroundImage & getWeatherIcon.

getWeatherBackgroundImage() will choose an appropriate background based on the location's weather summary.
getWeatherIcon() will choose an appropriate icon based on the location's weather summary.
export const getWeatherBackgroundImage = description => {
  switch (description) {
    case "Thunderstorm":
      return "https://s4827.pcdn.co/wp-content/uploads/2014/06/Great-Thunderstorm-In-City.jpg";
    case "Drizzle":
      return "https://wallpapercave.com/wp/wp2967431.jpg";
    case "Rain":
      return "http://mybestphonewallpapers.com/download/blue-rain-6651.jpg";
    case "Snow":
      return "http://www.123mobilewallpapers.com/wp-content/uploads/2014/06/snow_way_wallpaper.jpg";
    case "Atmosphere":
      return "https://i.pinimg.com/originals/fe/a4/13/fea4139613ef14a56a13eef545284a58.jpg";
    case "Clouds":
      return "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
    case "Clear":
      return "http://www.hdiphone6pluswallpaper.com/wp-content/uploads/Sky/Sky%20iPhone%206%20Plus%20Wallpaper%2037.jpg";
    default:
      return "https://i.pinimg.com/736x/49/43/da/4943da7fd8edd6af16500b2d957dbc9a.jpg";
  }
};

export const getWeatherIcon = description => {
  switch (description) {
    case "Clear":
      return "weather-sunny";
    case "Clouds":
      return "weather-cloudy";
    case "Drizzle":
    case "shower drizzle":
      return "weather-rainy";
    case "Rain":
      return "weather-pouring";
    case "Thunderstorm":
      return "weather-lightning";
    case "Snow":
      return "weather-snowy";
    default:
      return "vanish";
  }
};
E) Define the Loading component above our WeatherCard component which is used init.

const Loading = () => (
  <View style={styles.loading}>
    <ActivityIndicator />
  </View>
);
F) Render the WeatherCard component in the return of App. Pass it the props it expects.

<View style={styles.bg}>
  <WeatherCard error={error} loading={loading} location={location} />
</View>
pwd

Key Points 🔑📝

fetch is used to request data from an api among other things.
Async functions begin with a async and have an await on lines which take a few moments.

When code can fail, it's useful to have a try & catch handle the failure.

Milestone 3 🛣🏃 Add current & city location selection
Our app isn't that interesting with one location, let's add a few more that a user can choose to select.

A) Define a new component, CitySelectionButtons, which will map over our CITIES data and render a button for each city.

const CitySelectionButtons = props => (
  <View style={styles.cityContainer}>
    <TouchableOpacity
      key="currentLocation"
      style={styles.currentLocation}
      onPress={() => props.onChooseCity("")}
    >
      <Text style={styles.cityName}>Current Location</Text>
    </TouchableOpacity>
    {CITIES.map(city => {
      return (
        <TouchableOpacity
          key={city.name}
          style={styles.cityButton}
          onPress={() => props.onChooseCity(city.name)}
        >
          <Text style={styles.cityName}>{city.name}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);
B) Define a new function in the body of App, onChooseCity, which will handle fetching data for a location.

onChooseCity = name => {
  let randImg = "";
  if (name !== "") {
    const city = CITIES.find(city => city.name === name);
    randImg = city.imgUrl[Math.floor(Math.random() * city.imgUrl.length)];
    getWeather(city.latitude, city.longitude, randImg);
  } else {
    getLocationAsync();
  }
};
C) Define a new constant above the return of App, bgImage, which will handle selecting an appropriate background based on the user's choice.

<ImageBackground source={bgImage} style={styles.bg}>
  <WeatherCard location={location} error={error} loading={loading} />
  <CitySelectionButtons onChooseCity={onChooseCity} />
</ImageBackground>
D) Import two new components, ImageBackground & TouchableOpacity, from React Native.

import { ImageBackground, TouchableOpacity } from "react-native";
E) Refactor our App component's return to use the ImageBackground, WeatherCard, & CitySelectionButtons components. Pass them their appropriate props.

pwd

We should now be able to see all the behavior we were planning on implementing, amazing
Review 💻🤓🤔
Defining a large component to a few smaller components to handle some of the logic in our app makes our code easier to read and understand.
Hardcoding data for demonstration doesn't make us bad developers.
Accomplishments 🥇🏆💯
[x] User is prompted to give permission for our app to use their location if they haven't already given us permission.
[x] User can see a locations fahrenheit & celsius temperature, description, & windspeed.
[x] User can see an appropriate icon depending on the weather conditions.
[x] User can see a background appropriate for the type of weather in their current location.
[x] User can see an icon appropriate for the type of their weather in a location.
[x] User can see buttons which allow them to see weather of different cities.
[x] User can see a randomly generated image of that city.
[x] User can see their current locations weather again with a "Current Location" button.
Rockets 🚀
[ ] User will see app theme colors based on temperature of the location(blue for code, orange for warm, red for hot)
Week 5 - Lab - Weather 🌦️⛅☀️
Introduction 🌟
Let's build a weather app 📱 using React Native & Expo. Our app will help users determine what to wear 🕶🌂🧥 in their city 🏙 and other cities around the world 🌎!

pwd

Features 🎯🥇🏆
[ ] User is prompted to give permission for our app to use their location if they haven't already given us permission.
[ ] User can see a locations fahrenheit & celsius temperature, description, & windspeed.
[ ] User can see an appropriate icon depending on the weather conditions.
[ ] User can see a background appropriate for the type of weather in their current location.
[ ] User can see an icon appropriate for the type of their weather in a location.
[ ] User can see buttons which allow them to see weather of different cities.
[ ] User can see a randomly generated image of that city.
[ ] User can see their current locations weather again with a "Current Location" button.
Learning Objectives ✍️📚📝
Learn how to fetch() data from an API.
Recognize data fetching takes time.
fetch() - Used to make requests to API.
The 1st argument is the api endpoint we're fetching data from.
json() - Used to parse to JS object.
Learn what async & await are used for. Read more detailed async & await.
Recognize they're used to make asynchronous.
async - Tells JS that a function is asynchronous.
await - Tells JS that this line will take a few moments.
Learn what try & catch are used for.
Recognize they're when we need to be careful because our code may fail. An example is an api request. There are other use cases.
Tip 💡: The permissions module of Expo is buggy. You may need to do this exercise on a device using the iOS/Android clients.

Milestone 1 🛣🏃 Set up app, styling, & some default city data
A) Use expo init command to create a new project. I'm calling mine rn-weather.

pwd

B) Add styles to App.js.

Replace the boiler plate styles with something custom.

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "black"
  },
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  weatherContainer: {
    padding: 20,
    width: "90%",
    borderWidth: 1,
    maxWidth: "90%",
    minHeight: "20%",
    marginTop: "70%",
    borderRadius: 25,
    marginBottom: "2%",
    borderColor: "white",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  text: {
    fontSize: 20,
    color: "white",
    marginLeft: 10,
    fontWeight: "bold"
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  cityContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  cityName: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  cityButton: {
    margin: 3,
    height: 40,
    padding: 3,
    width: "25%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  tempRow: {
    alignSelf: "center",
    flexDirection: "row"
  },
  locationText: {
    fontSize: 25,
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  currentLocation: {
    margin: 3,
    height: 40,
    padding: 3,
    width: "72.5%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(20,33,61,0.6)"
  }
});
C) Create a new folder in the root of your project ./utils

D) Create a file in this folder called index.js.

E) Copy the content this file into the ./utils/index.js file we just created.

This file will contain some utility functions & data for our components to use.

Milestone 2 🛣🏃 Let's work on getting some data and having that data effect our App's state
A) Import two new modules from expo we havent used yet.

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
B) Set default loading state in App's body.

const [loading, setLoading] = useState(true);
constructor(props) {
   super(props)
   this.state = {
      loading: true
   }
}
We want to get the user's current location immediately when the app loads so we'll set the initial value to true.

D) Define the componentDidMount life cycle method of App with a function call this.getLocationAsync() in it's body.

componentDidMount() {
   this.getLocationAsync()
}
E) Define the asynchronous function getLocationAsync we called in our useEffect. The reason this function is asynchronous is because we don't know how long it'll take for the user to press the Allow button. This getLocationAsync will check the LOCATION permission the user has granted us and call another function, getWeather, if allowed.

getLocationAsync = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    return;
  }

  const location = await Location.getCurrentPositionAsync();
  this.getWeather(location.coords.latitude, location.coords.longitude);
};
Tip 💡: It's ok to hardcode the current location in our getWeather request in order to use the simulator if you can't press the Allow button due to a bug.

this.getWeather(10.817141, 106.707954);
We should now see a prompt when the app loads
pwd

F) Add new boolean state error in the constructor.

this.state = {
   loading: true,
   error: false,
}
G) Define the function getWeather we call in the body of getLocationAsync.

getWeather = async (latitude, longitude, imgUrl = "") => {
    const API_KEY = "3de6162d3745365b168ade2bbe4e1d66";
    const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    try {
      const response = await fetch(api);
      const jsonData = await response.json();
      currentLocation = { ...jsonData, imgUrl };
      this.setState({ location: currentLocation, loading: false })
    } catch (error) {
      this.setState({ error: true, loading: false });
    }
This function, getWeather, takes three arguments. It calls the Open Weather Api using fetch.

You may need to sign up for a new API key to use it
We pass it two default arguments latitude & longitude. There is a 3rd optional argument imgUrl we'll use shortly.

There's a lot going on here so let's take it one line at a time.

We then define an API_KEY to request data.
We use the key and the arguments latitude & longitude to define a request url.
We wrap the following lines of code in a try & catch. If the code inside of the try fails, the code within the catch's body will execute.
We await and fetch the data.
We Parse the response to json.
We then spread the response object's data into a new object that includes imgUrl. This object is set as a location piece of state.
Lastly, we handle the error with setting the error state to true when catch run, we setLoading to false in both case.
F) Add a new piece of state location.

We give it a initial value of a relatively complicated object because this is the exact data we expect to receive from the API.

this.state = {
   loading: true,
   error: false,
   location: {
     name: "",
     main: { temp: "" },
     wind: { speed: "" },
     weather: [{ main: "", description: "" }]
   }
}
G) Add a console.log in the render method to check what location is.

pwd

We should now see that when the app loads we successfully fetch some data, excellent
In conjunction, if we purposefully fail the request, we see that the catch executes.

Milestone 3 🛣🏃 Display Weather Data
A) Define a WeatherCard component above our App component which will render the data about the weather.

This component determine temperatureC & temperatureF based on the prop location given to it.
It will capitalizie the description of the weather description in the location prop.
It will show a Loading component if the loading prop given to it is true.
It will render an appropriate icon based on the weather conditions of the location.
Weather Card Component
B) Update imports to grab additional components we need in WeatherCard. We need the MaterialIcons, MaterialCommunityIcons & ActivityIndicator.

import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
C) Import some dependencies from the utils folder we created earlier.

import { CITIES, getWeatherBackgroundImage, getWeatherIcon } from "./utils";
D) Define two new functions to export from the ./utils/index.js file, getWeatherBackgroundImage & getWeatherIcon.

getWeatherBackgroundImage() will choose an appropriate background based on the location's weather summary.
getWeatherIcon() will choose an appropriate icon based on the location's weather summary.
export const getWeatherBackgroundImage = description => {
  switch (description) {
    case "Thunderstorm":
      return "https://s4827.pcdn.co/wp-content/uploads/2014/06/Great-Thunderstorm-In-City.jpg";
    case "Drizzle":
      return "https://wallpapercave.com/wp/wp2967431.jpg";
    case "Rain":
      return "http://mybestphonewallpapers.com/download/blue-rain-6651.jpg";
    case "Snow":
      return "http://www.123mobilewallpapers.com/wp-content/uploads/2014/06/snow_way_wallpaper.jpg";
    case "Atmosphere":
      return "https://i.pinimg.com/originals/fe/a4/13/fea4139613ef14a56a13eef545284a58.jpg";
    case "Clouds":
      return "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
    case "Clear":
      return "http://www.hdiphone6pluswallpaper.com/wp-content/uploads/Sky/Sky%20iPhone%206%20Plus%20Wallpaper%2037.jpg";
    default:
      return "https://i.pinimg.com/736x/49/43/da/4943da7fd8edd6af16500b2d957dbc9a.jpg";
  }
};

export const getWeatherIcon = description => {
  switch (description) {
    case "Clear":
      return "weather-sunny";
    case "Clouds":
      return "weather-cloudy";
    case "Drizzle":
    case "shower drizzle":
      return "weather-rainy";
    case "Rain":
      return "weather-pouring";
    case "Thunderstorm":
      return "weather-lightning";
    case "Snow":
      return "weather-snowy";
    default:
      return "vanish";
  }
};
E) Define the Loading component above our WeatherCard component which is used init.

const Loading = () => (
  <View style={styles.loading}>
    <ActivityIndicator />
  </View>
);
F) Render the WeatherCard component in the return of App. Pass it the props it expects.

render() {
    const { error, loading, location } = this.state

    return (
      <View style={styles.bg}>
        <WeatherCard error={error} loading={loading} location={location} />
      </View>
    );
  }
pwd

Key Points 🔑📝

fetch is used to request data from an api among other things.
Async functions begin with a async and have an await on lines which take a few moments.

When code can fail, it's useful to have a try & catch handle the failure.

Milestone 3 🛣🏃 Add current & city location selection
Our app isn't that interesting with one location, let's add a few more that a user can choose to select.

A) Define a new component, CitySelectionButtons, which will map over our CITIES data and render a button for each city.

const CitySelectionButtons = props => (
  <View style={styles.cityContainer}>
    <TouchableOpacity
      key="currentLocation"
      style={styles.currentLocation}
      onPress={() => props.onChooseCity("")}
    >
      <Text style={styles.cityName}>Current Location</Text>
    </TouchableOpacity>
    {CITIES.map(city => {
      return (
        <TouchableOpacity
          key={city.name}
          style={styles.cityButton}
          onPress={() => props.onChooseCity(city.name)}
        >
          <Text style={styles.cityName}>{city.name}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);
B) Define a new function in the body of App, onChooseCity, which will handle fetching data for a location.

onChooseCity = name => {
  let randImg = "";
  if (name !== "") {
    const city = CITIES.find(city => city.name === name);
    randImg = city.imgUrl[Math.floor(Math.random() * city.imgUrl.length)];
    getWeather(city.latitude, city.longitude, randImg);
  } else {
    this.getLocationAsync();
  }
};
C) get the imgUrl property from location state, which will handle selecting an appropriate background based on the user's choice.

render() {
 const { error, loading, location } = this.state
 return (
   <ImageBackground source={{ uri: location.imgUrl }} style={styles.bg}>
     <WeatherCard location={location} error={error} loading={loading} />
     <CitySelectionButtons onChooseCity={this.onChooseCity} />
   </ImageBackground>
 );
}
D) Import two new components, ImageBackground & TouchableOpacity, from React Native.

import { ImageBackground, TouchableOpacity } from "react-native";
E) Refactor our App component's return to use the ImageBackground, WeatherCard, & CitySelectionButtons components. Pass them their appropriate props.

pwd

We should now be able to see all the behavior we were planning on implementing, amazing
Review 💻🤓🤔
Defining a large component to a few smaller components to handle some of the logic in our app makes our code easier to read and understand.
Hardcoding data for demonstration doesn't make us bad developers.
Accomplishments 🥇🏆💯
[x] User is prompted to give permission for our app to use their location if they haven't already given us permission.
[x] User can see a locations fahrenheit & celsius temperature, description, & windspeed.
[x] User can see an appropriate icon depending on the weather conditions.
[x] User can see a background appropriate for the type of weather in their current location.
[x] User can see an icon appropriate for the type of their weather in a location.
[x] User can see buttons which allow them to see weather of different cities.
[x] User can see a randomly generated image of that city.
[x] User can see their current locations weather again with a "Current Location" button.
Rockets 🚀
[ ] User will see app theme colors based on temperature of the location(blue for cold, orange for warm, red for hot)
