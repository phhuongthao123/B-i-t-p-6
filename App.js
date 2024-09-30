import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  // Hàm kiểm tra tính hợp lệ của số điện thoại
  const validatePhoneNumber = () => {
    const phoneRegex = /^[0-9]{10}$/; // Định dạng số điện thoại gồm 10 chữ số
    if (!phoneRegex.test(phoneNumber)) {
      setError('Số điện thoại không hợp lệ. Vui lòng nhập lại.');
      return false;
    }
    setError('');
    return true;
  };

  // Hàm xử lý khi click nút "Tiếp tục"
  const handleContinue = () => {
    if (validatePhoneNumber()) {
      Alert.alert('Thông báo', 'Số điện thoại hợp lệ!');
      // Thực hiện các hành động tiếp theo, như gửi số điện thoại lên server
    }
  };

  // Hàm xử lý nhập liệu và format lại số điện thoại
  const handlePhoneInputChange = (text) => {
    // Xóa các ký tự không phải là số
    const formattedText = text.replace(/[^\d]/g, '');

    // Format lại số theo định dạng: 123-456-7890
    const formattedPhone = formattedText.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

    setPhoneNumber(formattedPhone);
    setError(''); // Xóa thông báo lỗi nếu đang nhập
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      
      <Card style={styles.card}>
        <Text style={styles.label}>Nhập số điện thoại</Text>
        <Text style={styles.description}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
        </Text>

        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={handlePhoneInputChange}
          maxLength={12} // Giới hạn độ dài nhập cho đúng định dạng có gạch ngang
        />
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 20,
    width: '90%',
    borderRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#7e7e7e',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
