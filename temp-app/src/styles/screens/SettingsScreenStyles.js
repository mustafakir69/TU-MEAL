import { StyleSheet } from 'react-native';

const SettingsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cancelButton: {
    marginRight: 8,
    flex: 1,
  },
  saveButton: {
    flex: 1,
  },
  editButton: {
    margin: 16,
  },
  sectionButton: {
    margin: 16,
  },
  deleteButton: {
    margin: 16,
    backgroundColor: '#f44336',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  modalCancelButton: {
    marginRight: 10,
  },
});

export default SettingsScreenStyles; 