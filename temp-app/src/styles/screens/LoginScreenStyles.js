import { StyleSheet } from 'react-native';

const LoginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  quickLoginButton: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#4CAF50',
  },
  divider: {
    marginVertical: 15,
  },
  orText: {
    textAlign: 'center',
    color: '#757575',
    marginVertical: -25,
    backgroundColor: '#fff',
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  form: {
    width: '100%',
    marginTop: 10,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    paddingVertical: 6,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
});

export default LoginScreenStyles; 