import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Alert,
  Keyboard,
} from 'react-native';

const API_KEY = 'be7a52b6e16192505783673c8cee4d16';

interface WeatherData {
  temperature: number;
  condition: string;
  description: string;
  city: string;
  humidity: number;
  feelsLike: number;
}

const getBackgroundUrl = (weather: string): string => {
  const seed = Math.floor(Math.random() * 100); 
  
  switch (weather.toLowerCase()) {
    case 'clear':
      return `https://picsum.photos/seed/sunny${seed}/1080/1920`;
    case 'clouds':
      return `https://picsum.photos/seed/cloudy${seed}/1080/1920`;
    case 'rain':
    case 'drizzle':
      return `https://picsum.photos/seed/rainy${seed}/1080/1920`;
    case 'snow':
      return `https://picsum.photos/seed/snowy${seed}/1080/1920`;
    case 'thunderstorm':
      return `https://picsum.photos/seed/storm${seed}/1080/1920`;
    case 'mist':
    case 'fog':
      return `https://picsum.photos/seed/foggy${seed}/1080/1920`;
    default:
      return `https://picsum.photos/seed/nature${seed}/1080/1920`;
  }
};

const getWeatherEmoji = (weather: string): string => {
  switch (weather.toLowerCase()) {
    case 'clear':
      return '☀️';
    case 'clouds':
      return '☁️';
    case 'rain':
      return '🌧️';
    case 'drizzle':
      return '🌦️';
    case 'snow':
      return '❄️';
    case 'thunderstorm':
      return '⛈️';
    case 'mist':
    case 'fog':
      return '🌫️';
    default:
      return '🌈';
  }
};

export default function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [background, setBackground] = useState(
    'https://picsum.photos/seed/default/1080/1920'
  );

  const fetchWeather = async () => {
    if (!city.trim()) {
      Alert.alert('Error', 'Please enter a city name');
      return;
    }

    try {
      setLoading(true);
      Keyboard.dismiss(); 

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          'City Not Found',
          `Could not find weather data for "${city}". Please try another city.`
        );
        setLoading(false);
        return;
      }

      const weatherData: WeatherData = {
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main,
        description: data.weather[0].description,
        city: data.name,
        humidity: data.main.humidity,
        feelsLike: Math.round(data.main.feels_like),
      };

      setWeather(weatherData);
      setBackground(getBackgroundUrl(weatherData.condition));
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch weather data. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = () => {
    fetchWeather();
  };

  return (
    <ImageBackground
      source={{ uri: background }}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          
          <View style={styles.header}>
            <Text style={styles.title}>Weather App</Text>
            <Text style={styles.subtitle}>Powered by OpenWeather</Text>
          </View>

          
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Enter city name..."
              placeholderTextColor="#cbd5e1"
              style={styles.input}
              value={city}
              onChangeText={setCity}
              onSubmitEditing={handleKeyPress}
              returnKeyType="search"
              autoCapitalize="words"
            />

            <TouchableOpacity
              style={styles.button}
              onPress={fetchWeather}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>
                {loading ? '...' : 'Search'}
              </Text>
            </TouchableOpacity>
          </View>

          
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loadingText}>Fetching weather...</Text>
            </View>
          )}

          
          {!loading && weather && (
            <View style={styles.weatherContainer}>
              
              <Text style={styles.cityName}>{weather.city}</Text>

              
              <View style={styles.mainWeather}>
                <Text style={styles.weatherEmoji}>
                  {getWeatherEmoji(weather.condition)}
                </Text>
                <Text style={styles.temperature}>{weather.temperature}°C</Text>
              </View>

              
              <Text style={styles.condition}>{weather.condition}</Text>
              <Text style={styles.description}>{weather.description}</Text>

             
              <View style={styles.detailsContainer}>
                <View style={styles.detailBox}>
                  <Text style={styles.detailLabel}>Feels Like</Text>
                  <Text style={styles.detailValue}>{weather.feelsLike}°C</Text>
                </View>
                <View style={styles.detailDivider} />
                <View style={styles.detailBox}>
                  <Text style={styles.detailLabel}>Humidity</Text>
                  <Text style={styles.detailValue}>{weather.humidity}%</Text>
                </View>
              </View>
            </View>
          )}

          
          {!loading && !weather && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                Search for a city to see the weather
              </Text>
              <Text style={styles.emptySubtext}>
                Try: Hanoi, Tokyo, London, New York
              </Text>
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  searchContainer: {
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#1e293b',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  weatherContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityName: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  mainWeather: {
    alignItems: 'center',
    marginBottom: 20,
  },
  weatherEmoji: {
    fontSize: 80,
    marginBottom: 10,
  },
  temperature: {
    fontSize: 72,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  condition: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  description: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textTransform: 'capitalize',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  detailBox: {
    flex: 1,
    alignItems: 'center',
  },
  detailDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 20,
  },
  detailLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  detailValue: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});